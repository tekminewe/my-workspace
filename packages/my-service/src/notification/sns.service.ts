import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import * as AWSXRay from 'aws-xray-sdk';

@Injectable()
export class SNSService {
  private readonly snsClient = AWSXRay.captureAWSv3Client(new SNSClient());

  async publishMessage({
    message,
    subject,
    topicArn,
  }: {
    message: string | object;
    subject: string;
    topicArn: string;
  }) {
    const messageString =
      typeof message === 'string' ? message : JSON.stringify(message);

    try {
      const result = await this.snsClient.send(
        new PublishCommand({
          TopicArn: topicArn,
          Subject: subject,
          Message: messageString,
        }),
      );

      return result;
    } catch (error) {
      console.error('Error publishing to SNS:', error);
      throw error;
    }
  }
}
