# API for onsentalent.com

## Installation

```bash
# Install dependencies
$ pnpm install

# Copy the zenstack schema
$ ./scripts/copy-schema.sh
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

```bash
# Update .env file with the correct values

# Deploy to ECR
$ pnpm deploy:image

# Setup bastion host in AWS
# Connect to bastion host to deploy database
$ ssh -i ~/Documents/mintdealmy.my.pem -f -N -L 5432:terraform-20250501082925438600000001.cbqkw2oe484i.ap-southeast-5.rds.amazonaws.com:5432 ec2-user@43.216.5.9 -v

# Deploy database
$ npx prisma migrate deploy

# Update EKR tag in onsen-talent-terraform and deploy
```

## Seed

```bash
# Seed database
$ npx ts-node seed/common.ts
$ npx ts-node seed/mintdealmy.ts
$ npx ts-node scripts/upload-to-s3.ts --bucket mintdealmy-media-ap-southeast-5-production --region ap-southeast-5 --path ./s3
```

## Tunneling for development

```bash
ngrok http --url=exciting-glider-hopelessly.ngrok-free.app 3020
```