import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
import { OkResponseDto, PaginatedOkResponse } from './app.dto';

export function ApiDefinition({
  description,
  responseType,
  operationId,
  dataType = 'object',
  badRequestErrorCodes,
}: {
  description: string;
  responseType?: any;
  operationId: string;
  dataType?: 'object' | 'array';
  badRequestErrorCodes?: Record<string, string>;
}) {
  return applyDecorators(
    ApiExtraModels(responseType),
    ApiExtraModels(OkResponseDto),
    ApiOperation({ operationId }),
    ApiOkResponse({
      description: description,
      schema:
        responseType !== null
          ? {
              allOf: [
                {
                  $ref:
                    dataType === 'array'
                      ? getSchemaPath(PaginatedOkResponse)
                      : getSchemaPath(OkResponseDto),
                },
                {
                  required: ['data'],
                  properties: {
                    data:
                      dataType === 'array'
                        ? {
                            type: 'array',
                            items: {
                              $ref: getSchemaPath(responseType),
                            },
                          }
                        : {
                            $ref: getSchemaPath(responseType),
                          },
                  },
                },
              ],
            }
          : null,
    }),
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                enum: badRequestErrorCodes
                  ? Object.values(badRequestErrorCodes)
                  : ['unknownError'],
              },
            },
            required: ['message'],
          },
        },
        required: ['error'],
      },
    }),
  );
}
