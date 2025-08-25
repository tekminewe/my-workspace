import { Injectable } from '@nestjs/common';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { FetchAdvertiserOutput } from './fetch-advertiser.output';

@Injectable()
export class AdvertiserLambdaService {
  private readonly lambdaClient: LambdaClient;
  private readonly lambdaFunctionName: string;

  constructor() {
    this.lambdaClient = new LambdaClient({
      region: process.env.AWS_REGION || 'ap-southeast-1',
    });

    this.lambdaFunctionName =
      process.env.FETCH_ADVERTISER_LAMBDA_FUNCTION || '';

    if (!this.lambdaFunctionName) {
      console.warn(
        'FETCH_ADVERTISER_LAMBDA_FUNCTION is not defined in environment variables',
      );
    }
  }

  async triggerFetchAdvertiser(name: string): Promise<FetchAdvertiserOutput> {
    try {
      if (!this.lambdaFunctionName) {
        throw new Error(
          'Lambda function for fetch advertiser is not configured',
        );
      }

      const payload = {
        advertiserName: name,
      };

      const command = new InvokeCommand({
        FunctionName: this.lambdaFunctionName,
        Payload: Buffer.from(JSON.stringify(payload)),
        InvocationType: 'Event', // Asynchronous invocation
      });

      const response = await this.lambdaClient.send(command);

      // Check if the invocation was successful
      if (response.StatusCode !== 202 && response.StatusCode !== 200) {
        throw new Error(
          `Lambda invocation failed with status code: ${response.StatusCode}`,
        );
      }

      return {
        success: true,
        advertiserName: name,
        message: `Successfully triggered Lambda function to fetch advertiser "${name}"`,
      };
    } catch (error) {
      console.error('Error triggering fetch advertiser Lambda:', error);
      return {
        success: false,
        advertiserName: name,
        message: `Failed to trigger fetch for advertiser: ${error.message}`,
      };
    }
  }
}
