# Adam Affiliate Connector

## Run locally

```bash
$ sam build

$ sam local invoke --profile mintdealmy FetchAdvertisersFunction --env-vars env.json
$ sam local invoke --profile mintdealmy FetchAdvertisersFunction --env-vars env.json --event events/fetch-advertiser.json

$ sam local invoke --profile mintdealmy PostbackFunction --env-vars env.json --event events/postback.json

$ sam local invoke --profile mintdealmy SESFeedbackFunction --env-vars env.json --event events/email-bounce.json
$ sam local invoke --profile mintdealmy SESFeedbackFunction --env-vars env.json --event events/email-soft-bounce.json
$ sam local invoke --profile mintdealmy SESFeedbackFunction --env-vars env.json --event events/email-complaint.json
$ sam local invoke --profile mintdealmy SESFeedbackFunction --env-vars env.json --event events/email-delivery.json

$ sam local invoke --profile mintdealmy PostGeneratorFunction --env-vars env.json --event events/trending-products-post.json
$ sam local invoke --profile mintdealmy PostGeneratorFunction --env-vars env.json --event events/advertiser-campaign-post.json

$ sam local invoke --profile mintdealmy FetchAdvertiserCampaignsFunction --env-vars env.json

```

## Testing with InvolveAsia Postback Url

Use the following queries to test the API Gateway:

```
advSub=312155518032090&advSub2=312155518032090&advSub3=Tools%20%26%20Home%20Improvement&advSub4=2001820991_MY-7963340068&advSub5=app&affSub=cmeokes0k000bn2lm8a48nlse&affSub2=&affSub3=&affSub4=&affSub5=&conversionCurrency=MYR&conversionId=2&datetimeConversion=2021-11-18%2003%3A58%3A00&myrPayout=0.35&myrSaleAmount=8.93&offerId=2281&offerName=Lazada%20%28MY%29&orderId=312155518032090&payoutLocal=0.35&saleAmountLocal=8.93&usdPayout=0.08&usdSaleAmount=2.14&status=approved&offerStatus=active
```

## Update API Client

```bash
$ npx swagger-typescript-api@13.0.23 -p http://localhost:3020/swagger-json --disable-throw-on-error -o ./functions/advertisers-pull/src/utils -n api.ts

$ npx swagger-typescript-api -p http://localhost:3020/swagger-json --disable-throw-on-error -o ./functions/auth/src/utils -n api.ts

$ npx swagger-typescript-api -p http://localhost:3020/swagger-json --disable-throw-on-error -o ./functions/email-feedback/src/services -n api.ts
```
