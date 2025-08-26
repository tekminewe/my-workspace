import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as AWSXRay from 'aws-xray-sdk';

@Injectable()
export class XRayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const segment = AWSXRay.getSegment();
    if (!segment) return next();

    const subsegment = segment.addNewSubsegment(`${req.method} ${req.path}`);
    res.on('finish', () => {
      subsegment.close();
    });
    res.on('error', (error) => {
      subsegment.addError(error);
      subsegment.close();
    });

    next();
  }
}
