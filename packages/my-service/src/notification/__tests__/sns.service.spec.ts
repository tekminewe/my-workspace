import { Test, TestingModule } from '@nestjs/testing';
import { SNSService } from '../sns.service';
import { PublishCommand } from '@aws-sdk/client-sns';

// Mock AWS-XRay-SDK
jest.mock('aws-xray-sdk', () => ({
  captureAWSv3Client: jest.fn((client) => client),
}));

// Mock AWS SDK
jest.mock('@aws-sdk/client-sns', () => {
  return {
    SNSClient: jest.fn().mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({ MessageId: 'test-message-id' }),
    })),
    PublishCommand: jest.fn().mockImplementation((input) => ({ input })),
  };
});

describe('SNSService', () => {
  let service: SNSService;
  let mockSnsClient;

  const originalEnv = process.env;

  beforeEach(async () => {
    // Setup environment variables
    process.env = {
      ...originalEnv,
      ALERT_SNS_TOPIC_ARN: 'arn:aws:sns:us-east-1:123456789012:test-topic',
    };

    // Reset mocks
    jest.clearAllMocks();

    // Create module
    const module: TestingModule = await Test.createTestingModule({
      providers: [SNSService],
    }).compile();

    service = module.get<SNSService>(SNSService);
    mockSnsClient = (service as any).snsClient;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should publish a string message to SNS', async () => {
    const result = await service.publishMessage({
      message: 'Test message',
      subject: 'Test subject',
      topicArn: 'arn:aws:sns:us-east-1:123456789012:test-topic',
    });

    expect(PublishCommand).toHaveBeenCalledWith({
      TopicArn: 'arn:aws:sns:us-east-1:123456789012:test-topic',
      Subject: 'Test subject',
      Message: 'Test message',
    });

    expect(mockSnsClient.send).toHaveBeenCalled();
    expect(result).toEqual({ MessageId: 'test-message-id' });
  });

  it('should publish an object message to SNS as JSON string', async () => {
    const messageObject = {
      id: '123',
      name: 'Test Advertiser',
      previousStatus: 'Inactive',
      newStatus: 'Active',
    };

    await service.publishMessage({
      message: messageObject,
      subject: 'Status Change',
      topicArn: 'arn:aws:sns:us-east-1:123456789012:test-topic',
    });

    expect(PublishCommand).toHaveBeenCalledWith({
      TopicArn: 'arn:aws:sns:us-east-1:123456789012:test-topic',
      Subject: 'Status Change',
      Message: JSON.stringify(messageObject),
    });
  });

  it('should use custom topic ARN if provided', async () => {
    const customTopicArn = 'arn:aws:sns:us-east-1:123456789012:custom-topic';

    await service.publishMessage({
      message: 'Test message',
      subject: 'Test subject',
      topicArn: customTopicArn,
    });

    expect(PublishCommand).toHaveBeenCalledWith(
      expect.objectContaining({
        TopicArn: customTopicArn,
      }),
    );
  });

  it('should handle errors when publishing to SNS', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('SNS Publish Error');
    mockSnsClient.send.mockRejectedValueOnce(error);

    await expect(
      service.publishMessage({
        message: 'Test message',
        subject: 'Test subject',
        topicArn: 'arn:aws:sns:us-east-1:123456789012:test-topic',
      }),
    ).rejects.toThrow('SNS Publish Error');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error publishing to SNS:',
      error,
    );
    consoleErrorSpy.mockRestore();
  });
});
