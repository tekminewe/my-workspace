import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import imageType from "image-type";

const client = new S3Client();

export const downloadImageFromUrl = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image from ${url}`);
  }
  return Buffer.from(await response.arrayBuffer());
};

export const updateImageToS3 = async (url: string) => {
  const buffer = await downloadImageFromUrl(url);
  const type = await imageType(buffer);

  if (!type) {
    throw new Error("Could not determine the image type");
  }

  const key = `${Date.now()}_${url.split("/").pop()}`;
  const input = {
    Bucket: process.env.MEDIA_S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: type.mime,
  };

  const command = new PutObjectCommand(input);
  await client.send(command);

  return {
    filePath: key,
    mimeType: type.mime,
  };
};

export const downloadImageBase64FromUrl = async (url: string) => {
  const buffer = await downloadImageFromUrl(url);
  const type = await imageType(buffer);

  if (!type) {
    throw new Error("Could not determine the image type");
  }
  return {
    fileBase64: buffer.toString("base64"),
    mimeType: type.mime,
  };
};
