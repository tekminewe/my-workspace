import { SNSEvent, SNSHandler } from "aws-lambda";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { Api } from "./utils/api";

const Client = new Api({
  baseUrl: process.env.API_BASE_URL,
});
const s3Client = new S3Client();

const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });

export const handler: SNSHandler = async (event: SNSEvent) => {
  console.log(event);
  try {
    for (const record of event.Records) {
      const s3Event = JSON.parse(record.Sns.Message);

      // Check if this is a test event
      if (s3Event.Event === "s3:TestEvent") {
        console.log("Received S3 test event, skipping processing");
        continue;
      }

      // Ensure the Records array exists before processing
      if (!s3Event.Records || !Array.isArray(s3Event.Records)) {
        console.warn("No valid Records array found in S3 event", s3Event);
        continue;
      }

      for (const s3Record of s3Event.Records) {
        const bucket = s3Record.s3.bucket.name;
        const key = s3Record.s3.object.key;
        const versionId = s3Record.s3.object.versionId;

        const params = {
          Bucket: bucket,
          Key: key,
          VersionId: versionId,
        };

        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const body = JSON.parse(
          await streamToString(data.Body as Readable)
        ).body;

        const res = await Client.s2S.processUserCashback({
          advertiserOrderId: body.orderId,
          providerReferenceId: body.conversionId,
          amount: +body.payoutLocal,
          status: body.status,
          date: body.datetimeConversion,
          userClickId: body.affSub,
          currencyId: body.conversionCurrency,
        });

        if (!res.ok) {
          throw res.error;
        }
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
