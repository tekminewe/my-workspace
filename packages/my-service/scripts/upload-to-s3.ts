import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

// TypeScript interfaces
interface UploadParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
}

// Promisified fs functions
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

// Parse command line arguments
const args: string[] = process.argv.slice(2);
let argBucketName: string | undefined;
let argRegion: string | undefined;
let argLocalPath: string | undefined;

// Simple command line argument parsing
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--bucket' && args[i + 1]) {
    argBucketName = args[i + 1];
    i++;
  } else if (args[i] === '--region' && args[i + 1]) {
    argRegion = args[i + 1];
    i++;
  } else if (args[i] === '--path' && args[i + 1]) {
    argLocalPath = args[i + 1];
    i++;
  }
}

// --- Configuration ---
// Use command line args first, then fall back to environment variables or defaults
const BUCKET_NAME: string | undefined =
  argBucketName || process.env.S3_BUCKET_NAME;
const S3_REGION: string | undefined = argRegion || process.env.AWS_REGION;
// Use provided path or default to the 's3' folder in project root
const LOCAL_S3_FOLDER: string = argLocalPath
  ? path.resolve(argLocalPath)
  : path.resolve(__dirname, '..', 's3');

// --- Validation ---
if (!BUCKET_NAME) {
  console.error(
    'Error: S3 bucket name is not provided. Use --bucket argument or S3_BUCKET_NAME environment variable.',
  );
  console.error(
    'Usage: ts-node upload-to-s3.ts --bucket BUCKET_NAME [--region REGION] [--path LOCAL_PATH]',
  );
  process.exit(1);
}
if (!S3_REGION) {
  console.error(
    'Error: AWS region is not provided. Use --region argument or AWS_REGION environment variable.',
  );
  console.error(
    'Usage: ts-node upload-to-s3.ts --bucket BUCKET_NAME [--region REGION] [--path LOCAL_PATH]',
  );
  process.exit(1);
}
if (!fs.existsSync(LOCAL_S3_FOLDER)) {
  console.error(`Error: Local folder ${LOCAL_S3_FOLDER} does not exist.`);
  console.error(
    'Usage: ts-node upload-to-s3.ts --bucket BUCKET_NAME [--region REGION] [--path LOCAL_PATH]',
  );
  process.exit(1);
}

// --- AWS S3 Client Initialization ---
// The SDK automatically attempts to find credentials in the following order:
// 1. Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN)
// 2. Shared credential file (~/.aws/credentials)
// 3. AWS config file (~/.aws/config)
// 4. IAM role attached to an EC2 instance or ECS task.
const s3Client = new S3Client({ region: S3_REGION });

/**
 * Recursively gets all file paths within a directory.
 * @param dirPath - The directory path to scan.
 * @param arrayOfFiles - Accumulator for file paths.
 * @returns A promise that resolves with an array of full file paths.
 */
async function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
): Promise<string[]> {
  const files = await readdir(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    try {
      const fileStat = await stat(fullPath);
      if (fileStat.isDirectory()) {
        await getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    } catch (err) {
      const error = err as Error;
      console.error(`Error processing ${fullPath}: ${error.message}`);
      // Decide if you want to skip this file or stop the process
    }
  }

  return arrayOfFiles;
}

/**
 * Uploads the contents of a local directory to an S3 bucket, preserving structure.
 * @param localDirPath - The absolute path to the local directory to upload.
 * @param bucketName - The name of the S3 bucket.
 */
async function uploadDirectoryToS3(
  localDirPath: string,
  bucketName: string,
): Promise<void> {
  console.log(
    `Starting upload from "${localDirPath}" to bucket "${bucketName}" in region "${S3_REGION}"...`,
  );

  try {
    const allFiles = await getAllFiles(localDirPath);

    if (allFiles.length === 0) {
      console.log(`No files found in "${localDirPath}". Nothing to upload.`);
      return;
    }

    console.log(`Found ${allFiles.length} files to upload.`);

    const uploadPromises = allFiles.map(async (filePath) => {
      // Determine the S3 key by making the path relative to the source directory
      // and ensuring forward slashes are used (S3 standard).
      const relativePath = path.relative(localDirPath, filePath);
      const s3Key = relativePath.split(path.sep).join('/');

      console.log(`Uploading: ${filePath}  =>  s3://${bucketName}/${s3Key}`);

      try {
        const fileContent = await readFile(filePath);

        const params: UploadParams = {
          Bucket: bucketName,
          Key: s3Key,
          Body: fileContent,
          // Consider adding ContentType based on file extension for proper browser handling
          // ContentType: '...',
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        // console.log(`Successfully uploaded ${s3Key}`); // Optional: reduce log noise
      } catch (uploadError) {
        const error = uploadError as Error;
        console.error(
          `Failed to upload ${filePath} to ${s3Key}:`,
          error.message || uploadError,
        );
        // Optionally re-throw to stop the entire process on first error
        // throw uploadError;
      }
    });

    // Wait for all uploads to complete or fail
    await Promise.all(uploadPromises);
    console.log('Upload process finished.');
  } catch (error) {
    console.error('An error occurred during the upload process:', error);
    process.exit(1); // Exit with error status
  }
}

// --- Execute the Upload ---
uploadDirectoryToS3(LOCAL_S3_FOLDER, BUCKET_NAME)
  .then(() => {
    console.log('Script completed successfully.');
    process.exit(0); // Exit with success status
  })
  .catch(() => {
    // Error already logged in the function, just ensure non-zero exit code
    process.exit(1);
  });
