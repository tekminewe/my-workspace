import { Injectable, Inject } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; // ES Modules import
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs';
import { PrismaService } from 'src/prisma/prisma.service';
import * as AWSXRay from 'aws-xray-sdk';
import { MediaDto } from './media.dto';
import { UploadMediaInput } from './media.input';

@Injectable()
export class MediaService {
  constructor(@Inject(ENHANCED_PRISMA) private readonly db: PrismaService) {}

  async getMediaById(id: string): Promise<MediaDto | null> {
    const media = await this.db.media.findUnique({
      where: { id },
    });

    return media ? new MediaDto(media) : null;
  }

  async uploadFile({
    file,
    companyId,
    customFilename,
  }: {
    file: Express.Multer.File;
    companyId?: string;
    customFilename?: string;
  }) {
    const client = AWSXRay.captureAWSv3Client(new S3Client());

    // Determine the file key to use
    let key: string;
    if (customFilename) {
      // Extract file extension from original filename
      const extension = file.originalname.includes('.')
        ? file.originalname.split('.').pop()
        : 'bin';
      key = `${customFilename}.${extension}`;
    } else {
      // Use timestamp + original filename for regular uploads
      key = `${Date.now()}_${file.originalname}`;
    }

    const input = {
      Bucket: process.env.MEDIA_S3_BUCKET,
      Key: key,
      Body: file.buffer,
    };
    const command = new PutObjectCommand(input);
    await client.send(command);

    const result = await this.db.media.create({
      data: {
        filePath: `${key}`,
        mimeType: file.mimetype,
        companyId,
      },
    });

    return result;
  }

  async uploadBase64File({
    fileBase64,
    filename,
    mimeType,
    caption,
    customFilename,
  }: UploadMediaInput) {
    const client = AWSXRay.captureAWSv3Client(new S3Client());

    // Convert base64 string to buffer
    const base64Data = fileBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Determine the file key to use
    let key: string;
    if (customFilename) {
      // Extract file extension from original filename or mimeType
      const extension = filename.includes('.')
        ? filename.split('.').pop()
        : mimeType.split('/').pop();
      key = `${customFilename}.${extension}`;
    } else {
      // Use timestamp + original filename for regular uploads
      key = `${Date.now()}_${filename}`;
    }

    const input = {
      Bucket: process.env.MEDIA_S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(input);
    await client.send(command);

    const result = await this.db.media.create({
      data: {
        filePath: key,
        mimeType,
        caption,
      },
    });

    return result;
  }
}
