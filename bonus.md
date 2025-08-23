# Bonus Engine Technical Implementation Plan

## Overview
This document provides a detailed technical implementation plan for the Generic Bonus Engine, implementing the "2× First Cashback" bonus with full localization support using Option B for image management (language-specific Media records).

## Database Schema Implementation

### 1. Core Bonus Models (Zenstack)

#### BonusType
```zmodel
enum BonusTypeCodeEnum {
  FirstCashbackMultiplier   // "2x-first-cashback"
  SpendingThreshold        // For future bonuses like "spend $100 get $10"
  ReferralBonus           // For future referral bonuses
  SeasonalBonus          // For future seasonal/holiday bonuses
}

enum BonusTypeStatusEnum {
  Draft
  Active
  Archived
}

model BonusType {
  id               String                 @id @default(cuid())
  codeId           BonusTypeCodeEnum      // Enum instead of string
  version          Int                    @default(1)
  priority         Int                    @default(100)
  expiryDays       Int?                   // null = no expiry
  maxUsagePerUser  Int                    @default(1)
  ruleConfig       Json                   // Flexible rule configuration
  statusId         BonusTypeStatusEnum    @default(Draft)
  status           BonusTypeStatus        @relation(fields: [statusId], references: [id])
  effectiveFrom    DateTime               @default(now())
  effectiveTo      DateTime?
  
  // Relations
  metadatas        BonusTypeMetadata[]
  eligibilities    BonusEligibility[]
  transactions     BonusTransaction[]
  
  // Audit fields
  createdAt        DateTime               @default(now())
  updatedAt        DateTime               @updatedAt
  createdBy        String?
  updatedBy        String?

  @@unique([codeId, version])
  @@index([statusId])
  @@index([effectiveFrom, effectiveTo])
  @@index([codeId])
  
  @@allow('read', auth() != null)
  @@allow('create,update', auth().roles?[permissions?[name == ManageBonuses]])
}

model BonusTypeStatus {
  id          BonusTypeStatusEnum       @id
  description String?
  metadatas   BonusTypeStatusMetadata[]
  bonusTypes  BonusType[]

  @@allow('read', auth() != null)
}

model BonusTypeStatusMetadata {
  statusId   BonusTypeStatusEnum
  status     BonusTypeStatus     @relation(fields: [statusId], references: [id], onDelete: Cascade)
  languageId LanguageEnum
  name       String

  @@id([statusId, languageId])
  @@allow('read', auth() != null)
}

model BonusTypeMetadata {
  bonusTypeId         String
  bonusType           BonusType        @relation(fields: [bonusTypeId], references: [id], onDelete: Cascade)
  languageId          LanguageEnum
  language            Language         @relation(fields: [languageId], references: [id])
  title               String
  description         String           // Rich text content
  termsAndConditions  String           // Separate T&Cs field
  
  // Option B: Language-specific images
  featuredImageId     String?
  logoId              String?
  featuredImage       Media?           @relation("BonusMetadataFeaturedImage", fields: [featuredImageId], references: [id])
  logo                Media?           @relation("BonusMetadataLogo", fields: [logoId], references: [id])
  
  @@id([bonusTypeId, languageId])
  @@index([bonusTypeId])
  @@index([languageId])
  
  @@allow('read', auth() != null)
  @@allow('create,update', auth().roles?[permissions?[name == ManageBonuses]])
}
```

#### BonusEligibility
```zmodel
enum BonusEligibilityStatusEnum {
  Available
  Used
  Expired
  Ineligible
}

model BonusEligibility {
  id                   String                      @id @default(cuid())
  userId               String
  user                 User                        @relation(fields: [userId], references: [id])
  bonusTypeId          String
  bonusType            BonusType                   @relation(fields: [bonusTypeId], references: [id])
  bonusVersion         Int                         // Track enrolled version
  statusId             BonusEligibilityStatusEnum  @default(Available)
  status               BonusEligibilityStatus      @relation(fields: [statusId], references: [id])
  
  // Timing
  availableAt          DateTime                    @default(now())
  expiresAt            DateTime?                   // Calculated based on bonusType.expiryDays
  usedAt               DateTime?
  
  // Metadata
  eligibilityMetadata  Json?                       // Context for eligibility decisions
  
  // Relations
  transactions         BonusTransaction[]
  
  // Audit
  createdAt            DateTime                    @default(now())
  updatedAt            DateTime                    @updatedAt

  @@unique([userId, bonusTypeId, bonusVersion])
  @@index([userId])
  @@index([bonusTypeId])
  @@index([statusId])
  @@index([availableAt])
  @@index([expiresAt])
  
  @@allow('read', 
    auth() != null && auth().id == userId
    ||
    auth() != null && auth().roles?[permissions?[name == ViewBonuses]]
  )
  @@allow('create,update', auth().roles?[permissions?[name == ManageBonuses]])
}

model BonusEligibilityStatus {
  id            BonusEligibilityStatusEnum       @id
  description   String?
  metadatas     BonusEligibilityStatusMetadata[]
  eligibilities BonusEligibility[]

  @@allow('read', auth() != null)
}

model BonusEligibilityStatusMetadata {
  statusId   BonusEligibilityStatusEnum
  status     BonusEligibilityStatus     @relation(fields: [statusId], references: [id], onDelete: Cascade)
  languageId LanguageEnum
  name       String

  @@id([statusId, languageId])
  @@allow('read', auth() != null)
}
```

#### BonusTransaction
```zmodel
model BonusTransaction {
  id                    String            @id @default(cuid())
  userId                String
  user                  User              @relation(fields: [userId], references: [id])
  bonusEligibilityId    String
  bonusEligibility      BonusEligibility  @relation(fields: [bonusEligibilityId], references: [id])
  bonusVersion          Int               // Version applied
  
  // Financial details
  amount                Float
  currencyId            CurrencyEnum
  currency              Currency          @relation(fields: [currencyId], references: [id])
  
  // Source tracking
  sourceTransactionId   String?           // References UserCashback.id
  sourceCashback        UserCashback?     @relation("BonusSourceCashback", fields: [sourceTransactionId], references: [id])
  merchantCallbackId    String?           // For callback correlation
  
  // Processing
  processedAt           DateTime          @default(now())
  walletTransactionId   String?           // Reference to actual wallet credit
  
  // Metadata
  processingMetadata    Json?             // Additional context
  
  // Audit
  createdAt             DateTime          @default(now())
  updatedAt             DateTime          @updatedAt

  @@index([userId])
  @@index([bonusEligibilityId])
  @@index([sourceTransactionId])
  @@index([processedAt])
  @@index([userId, processedAt])
  
  @@allow('read',
    auth() != null && auth().id == userId
    ||
    auth() != null && auth().roles?[permissions?[name == ViewBonuses]]
  )
  @@allow('create,update', auth().roles?[permissions?[name == ManageBonuses]])
}
```

### 2. Media Model Updates
```zmodel
model Media {
  // ...existing fields...
  
  // Bonus relations (Option B)
  bonusMetadataFeatured BonusTypeMetadata[] @relation("BonusMetadataFeaturedImage")
  bonusMetadataLogo     BonusTypeMetadata[] @relation("BonusMetadataLogo")
}
```

### 3. UserCashback Model Updates
```zmodel
model UserCashback {
  // ...existing fields...
  
  // Bonus relations
  bonusTransactions BonusTransaction[] @relation("BonusSourceCashback")
}
```

### 4. User Model Updates
```zmodel
model User {
  // ...existing fields...
  
  // Bonus relations
  bonusEligibilities BonusEligibility[]
  bonusTransactions  BonusTransaction[]
}
```

## Key Architecture Changes

### Updated Implementation Flow

```
Advertiser Callback → my-functions (unchanged) → /s2s/affiliate/cashback API (enhanced)
                                                          ↓
                                                    Cashback Processing
                                                          ↓
                                                    Bonus Evaluation (new)
                                                          ↓
                                                    Wallet Credit + Email
```

### Benefits of This Approach

1. **Zero Impact on my-functions**: Existing callback handlers continue to work unchanged
2. **Centralized Logic**: All bonus processing happens within the proven S2S service
3. **Atomic Transactions**: Cashback and bonus processing in single database transaction
4. **Error Isolation**: Bonus processing failures don't affect cashback processing
5. **Simplified Architecture**: No additional queues, Lambda functions, or complex orchestration
6. **Consistent Pattern**: Follows existing S2S service patterns for reliability

### Updated Phase Summary

The implementation now consists of **6 phases** with **19 detailed tasks**:

1. **Phase 1: Backend Foundation** (5 tasks) - Database schema and core services
2. **Phase 2: S2S API Enhancement** (3 tasks) - Enhance existing cashback API with bonus logic
3. **Phase 3: Email Enhancement** (1 task) - Enhanced email templates with bonus information
4. **Phase 4: Admin Interface** (4 tasks) - Admin bonus management
5. **Phase 5: User Interface** (3 tasks) - User bonus discovery and wallet integration
6. **Phase 6: Testing & QA** (3 tasks) - Comprehensive testing
**Priority:** High  
**Estimated Time:** 2-3 days  
**Dependencies:** None

**Subtasks:**
1. **Create bonus.zmodel file**
   - Define all bonus-related models and enums
   - Add proper RBAC permissions
   - Include audit fields and indexes

2. **Update existing models**
   - Add bonus relations to User, UserCashback, Media models
   - Update imports in main schema files

3. **Add permission enums**
   - Add `ManageBonuses`, `ViewBonuses` to PermissionEnum
   - Update role assignments in seed data

4. **Generate and run migrations**
   - Run `pnpm gen:prisma` to generate client
   - Create migration files
   - Test migration on development database

#### Task 1.2: GraphQL Models and DTOs
**Priority:** High  
**Estimated Time:** 1-2 days  
**Dependencies:** Task 1.1

**Subtasks:**
1. **Create GraphQL models**
   ```typescript
   // src/bonus/models/bonus-type.model.ts
   @ObjectType()
   export class BonusType {
     @Field() id: string;
     @Field(() => BonusTypeCodeEnum) codeId: BonusTypeCodeEnum;
     @Field() version: number;
     @Field() priority: number;
     @Field(() => Int, { nullable: true }) expiryDays?: number;
     @Field() maxUsagePerUser: number;
     @Field(() => GraphQLJSON) ruleConfig: any;
     @Field(() => BonusTypeStatusEnum) statusId: BonusTypeStatusEnum;
     @Field() effectiveFrom: Date;
     @Field({ nullable: true }) effectiveTo?: Date;
     @Field(() => [BonusTypeMetadata]) metadatas: BonusTypeMetadata[];
   }
   ```

2. **Create Input DTOs**
   ```typescript
   // src/bonus/dto/create-bonus-type.input.ts
   @InputType()
   export class CreateBonusTypeInput {
     @Field(() => BonusTypeCodeEnum) codeId: BonusTypeCodeEnum;
     @Field({ nullable: true }) expiryDays?: number;
     @Field() maxUsagePerUser: number;
     @Field(() => GraphQLJSON) ruleConfig: any;
     @Field(() => [CreateBonusTypeMetadataInput]) metadatas: CreateBonusTypeMetadataInput[];
   }
   ```

3. **Create Args classes**
   ```typescript
   // src/bonus/dto/bonus-type.args.ts
   @ArgsType()
   export class GetBonusTypesArgs {
     @Field(() => BonusTypeStatusEnum, { nullable: true }) status?: BonusTypeStatusEnum;
     @Field({ nullable: true }) effectiveOnly?: boolean;
   }
   ```

#### Task 1.3: Bonus Service Layer
**Priority:** High  
**Estimated Time:** 3-4 days  
**Dependencies:** Task 1.2

**Subtasks:**
1. **BonusTypeService**
   ```typescript
   @Injectable()
   export class BonusTypeService {
     async createBonusType(input: CreateBonusTypeInput): Promise<BonusType>
     async updateBonusType(id: string, input: UpdateBonusTypeInput): Promise<BonusType>
     async getBonusTypes(args: GetBonusTypesArgs): Promise<BonusType[]>
     async createNewVersion(id: string, input: CreateVersionInput): Promise<BonusType>
     async getActiveVersion(codeId: BonusTypeCodeEnum): Promise<BonusType | null>
   }
   ```

2. **BonusEligibilityService**
   ```typescript
   @Injectable()
   export class BonusEligibilityService {
     async createEligibilityForUser(userId: string, bonusTypeId: string): Promise<BonusEligibility>
     async getUserEligibilities(userId: string): Promise<BonusEligibility[]>
     async checkEligibility(userId: string, bonusTypeCode: BonusTypeCodeEnum): Promise<boolean>
     async markAsUsed(eligibilityId: string): Promise<BonusEligibility>
     async migrateUserToNewVersion(userId: string, bonusTypeId: string, newVersion: number): Promise<BonusEligibility>
   }
   ```

3. **BonusTransactionService**
   ```typescript
   @Injectable()
   export class BonusTransactionService {
     async createBonusTransaction(input: CreateBonusTransactionInput): Promise<BonusTransaction>
     async getUserBonusTransactions(userId: string): Promise<BonusTransaction[]>
     async processBonus(userId: string, sourceTransactionId: string): Promise<BonusTransaction | null>
   }
   ```

4. **BonusRuleEngine**
   ```typescript
   interface BonusRule {
     type: string;
     version: number;
     evaluate(user: User, context: BonusContext): Promise<BonusResult>;
   }

   @Injectable()
   export class BonusRuleEngine {
     private rules: Map<string, BonusRule> = new Map();
     
     async evaluateBonus(userId: string, bonusTypeCode: BonusTypeCodeEnum, context: BonusContext): Promise<BonusResult>
     registerRule(rule: BonusRule): void
   }

   // Implement FirstCashbackMultiplierRule
   export class FirstCashbackMultiplierRule implements BonusRule {
     type = 'FIRST_CASHBACK_MULTIPLIER';
     version = 1;
     
     async evaluate(user: User, context: BonusContext): Promise<BonusResult> {
       // Check if this is user's first confirmed cashback
       // Calculate bonus amount (same as cashback amount)
       // Return bonus calculation result
     }
   }
   ```

#### Task 1.4: GraphQL Resolvers
**Priority:** High  
**Estimated Time:** 2-3 days  
**Dependencies:** Task 1.3

**Subtasks:**
1. **BonusTypeResolver (Admin)**
   ```typescript
   @Resolver(() => BonusType)
   export class BonusTypeResolver {
     @Query(() => [BonusType])
     @Permission(PermissionEnum.ViewBonuses)
     async bonusTypes(@Args() args: GetBonusTypesArgs): Promise<BonusType[]>

     @Mutation(() => BonusType)
     @Permission(PermissionEnum.ManageBonuses)
     async createBonusType(@Args('input') input: CreateBonusTypeInput): Promise<BonusType>

     @Mutation(() => BonusType)
     @Permission(PermissionEnum.ManageBonuses)
     async updateBonusType(@Args('id') id: string, @Args('input') input: UpdateBonusTypeInput): Promise<BonusType>

     @Mutation(() => BonusType)
     @Permission(PermissionEnum.ManageBonuses)
     async createBonusTypeVersion(@Args('id') id: string, @Args('input') input: CreateVersionInput): Promise<BonusType>

     @ResolveField(() => [BonusTypeMetadata])
     async metadatas(@Parent() bonusType: BonusType): Promise<BonusTypeMetadata[]>
   }
   ```

2. **UserBonusResolver (User-facing)**
   ```typescript
   @Resolver(() => BonusEligibility)
   export class UserBonusResolver {
     @Query(() => [BonusEligibility])
     async myBonuses(): Promise<BonusEligibility[]>

     @Query(() => [BonusTransaction])
     async myBonusTransactions(): Promise<BonusTransaction[]>

     @Query(() => BonusEligibility, { nullable: true })
     async bonusEligibility(@Args('bonusTypeCode') code: string): Promise<BonusEligibility | null>

     @ResolveField(() => BonusType)
     async bonusType(@Parent() eligibility: BonusEligibility): Promise<BonusType>

     @ResolveField(() => [BonusTypeMetadata])
     async localizedContent(@Parent() eligibility: BonusEligibility): Promise<BonusTypeMetadata[]>
   }
   ```

3. **Field Resolvers for Localized Content**
   ```typescript
   @ResolveField(() => BonusTypeMetadata, { nullable: true })
   async currentLanguageMetadata(
     @Parent() bonusType: BonusType,
     @Context() context: any
   ): Promise<BonusTypeMetadata | null> {
     const language = this.authService.getAcceptLanguage();
     return this.bonusTypeService.getMetadataByLanguage(bonusType.id, language);
   }
   ```

#### Task 1.5: User Registration Hook
**Priority:** Medium  
**Estimated Time:** 1 day  
**Dependencies:** Task 1.3

**Subtasks:**
1. **Update UserService**
   ```typescript
   // In existing UserService.createUser method
   async createUser(input: CreateUserInput): Promise<User> {
     const user = await this.prisma.user.create({ data: input });
     
     // Create bonus eligibilities for new user
     await this.bonusEligibilityService.createEligibilitiesForNewUser(user.id);
     
     return user;
   }
   ```

2. **New User Bonus Setup**
   ```typescript
   async createEligibilitiesForNewUser(userId: string): Promise<void> {
     const activeBonusTypes = await this.bonusTypeService.getActiveBonusTypes();
     
     for (const bonusType of activeBonusTypes) {
       await this.bonusEligibilityService.createEligibilityForUser(userId, bonusType.id);
     }
   }
   ```

### Phase 2: Backend S2S API Enhancement (my-service)

#### Task 2.1: Enhanced UserCashbackS2SService
**Priority:** High  
**Estimated Time:** 2-3 days  
**Dependencies:** Task 1.4

**Subtasks:**
1. **Update processUserCashback method to include bonus processing**
   ```typescript
   // In src/affiliate/user-cashback.s2s.service.ts
   async processUserCashback(dto: ProcessUserCashbackDto) {
     // ... existing logic for cashback processing ...

     if (status.toLowerCase() === 'approved') {
       // ... existing wallet credit logic ...

       // NEW: Trigger bonus evaluation after wallet credit
       await this.processBonusEligibility(
         existingCashback.userId,
         existingCashback.id,
         existingCashback.netAmount,
         existingCashback.currencyId
       );
     }

     // ... rest of existing logic ...
   }
   ```

2. **Add bonus processing method**
   ```typescript
   // Add to UserCashbackS2SService class
   private async processBonusEligibility(
     userId: string,
     cashbackId: string,
     amount: number,
     currency: string
   ) {
     try {
       // Check if user has available bonus eligibilities
       const eligibilities = await this.db.bonusEligibility.findMany({
         where: {
           userId,
           statusId: 'Available',
           OR: [
             { expiresAt: null }, // No expiry
             { expiresAt: { gte: new Date() } } // Not expired
           ]
         },
         include: {
           bonusType: {
             where: {
               statusId: 'Active'
             }
           }
         }
       });

       // Process each eligible bonus
       for (const eligibility of eligibilities) {
         await this.evaluateAndProcessBonus(eligibility, userId, cashbackId, amount, currency);
       }
     } catch (error) {
       // Log error but don't fail the main cashback process
       console.error('Bonus processing failed:', error);
       await this.sendBonusAlert('BONUS_PROCESSING_ERROR', error, userId);
     }
   }
   ```

3. **Add bonus rule evaluation**
   ```typescript
   // Add to UserCashbackS2SService class
   private async evaluateAndProcessBonus(
     eligibility: any,
     userId: string,
     cashbackId: string,
     amount: number,
     currency: string
   ) {
     const { bonusType } = eligibility;
     
     // Rule evaluation based on bonus type
     switch (bonusType.codeId) {
       case BonusTypeCodeEnum.FirstCashbackMultiplier:
         await this.processFirstCashbackBonus(eligibility, userId, cashbackId, amount, currency);
         break;
       // Add more bonus types here in the future
       default:
         console.log(`Unknown bonus type: ${bonusType.codeId}`);
     }
   }
   ```

4. **Implement first cashback bonus logic**
   ```typescript
   // Add to UserCashbackS2SService class
   private async processFirstCashbackBonus(
     eligibility: any,
     userId: string,
     cashbackId: string,
     amount: number,
     currency: string
   ) {
     // Check if this is the user's first confirmed cashback
     const isFirstCashback = await this.isUserFirstCashback(userId, cashbackId);
     
     if (!isFirstCashback) {
       return; // Not eligible for first cashback bonus
     }

     // Process bonus transaction
     await this.db.$transaction(async (tx) => {
       // Create bonus transaction
       const bonusTransaction = await tx.bonusTransaction.create({
         data: {
           userId,
           bonusEligibilityId: eligibility.id,
           bonusVersion: eligibility.bonusVersion,
           amount: amount, // Same amount as cashback
           currencyId: currency,
           sourceTransactionId: cashbackId,
           processedAt: new Date(),
           processingMetadata: {
             rule: BonusTypeCodeEnum.FirstCashbackMultiplier,
             originalCashbackAmount: amount,
             bonusMultiplier: 1
           }
         }
       });

       // Credit user wallet with bonus
       await this.creditBonusToWallet(tx, userId, amount, currency, bonusTransaction.id);

       // Mark eligibility as used
       await tx.bonusEligibility.update({
         where: { id: eligibility.id },
         data: { 
           statusId: 'Used',
           usedAt: new Date()
         }
       });
     });
   }
   ```

5. **Add helper methods**
   ```typescript
   // Add to UserCashbackS2SService class
   private async isUserFirstCashback(userId: string, currentCashbackId: string): Promise<boolean> {
     const approvedCashbacks = await this.db.userCashback.count({
       where: {
         userId,
         statusId: UserCashbackStatusEnum.Approved,
         id: { not: currentCashbackId } // Exclude current cashback
       }
     });
     
     return approvedCashbacks === 0;
   }

   private async creditBonusToWallet(
     tx: any,
     userId: string,
     amount: number,
     currency: string,
     bonusTransactionId: string
   ) {
     let wallet = await tx.userWallet.findFirst({
       where: { userId, currencyId: currency }
     });

     if (!wallet) {
       wallet = await tx.userWallet.create({
         data: {
           userId,
           currencyId: currency,
           statusId: UserWalletStatusEnum.Active,
           balance: 0
         }
       });
     }

     const balanceAfter = wallet.balance + amount;

     await tx.userWalletTransactionLog.create({
       data: {
         walletId: wallet.id,
         currencyId: currency,
         balanceBefore: wallet.balance,
         balanceAfter: balanceAfter,
         amount: amount,
         typeId: UserWalletTransactionTypeEnum.BonusCredit, // New transaction type
         reference: bonusTransactionId,
         statusId: UserWalletTransactionStatusEnum.Completed
       }
     });

     await tx.userWallet.update({
       where: { id: wallet.id },
       data: { balance: balanceAfter }
     });
   }

   private async sendBonusAlert(alertType: string, error: any, userId?: string) {
     // Implement SNS alert sending
     const message = {
       alertType,
       severity: 'HIGH',
       error: error.message,
       userId,
       timestamp: new Date().toISOString(),
       service: 'user-cashback-s2s'
     };
     
     // Send to SNS topic (implement based on existing pattern)
     console.error('Bonus Alert:', message);
   }
   ```

#### Task 2.2: Update Wallet Transaction Types
**Priority:** Medium  
**Estimated Time:** 1 day  
**Dependencies:** Task 2.1

**Subtasks:**
1. **Add new wallet transaction type enum**
   ```typescript
   // Update UserWalletTransactionTypeEnum in Prisma schema
   enum UserWalletTransactionTypeEnum {
     // ... existing types ...
     BonusCredit
   }
   ```

2. **Update wallet transaction metadata**
   ```typescript
   // Add localized names for bonus transactions
   model UserWalletTransactionTypeMetadata {
     // ... existing fields ...
     // Add "Bonus Credit" translations
   }
   ```

#### Task 2.3: Integration Testing
**Priority:** Medium  
**Estimated Time:** 1 day  
**Dependencies:** Task 2.2

**Subtasks:**
1. **Test existing callback flow with bonus processing**
   ```typescript
   // Test that existing /s2s/affiliate/cashback endpoint
   // now includes bonus processing without breaking changes
   describe('UserCashbackS2SService.processUserCashback', () => {
     it('should process cashback and bonus for first-time user', async () => {
       // Mock first-time user with available bonus eligibility
       // Call processUserCashback with approved status
       // Verify both cashback and bonus transactions created
     });

     it('should process cashback without bonus for repeat users', async () => {
       // Mock user with previous cashbacks
       // Call processUserCashback with approved status
       // Verify only cashback transaction created
     });

     it('should handle bonus processing errors gracefully', async () => {
       // Mock bonus processing failure
       // Verify cashback still processes successfully
       // Verify error alert is sent
     });
   });
   ```

2. **Integration with my-functions**
   ```typescript
   // Verify existing my-functions callbacks work unchanged
   // The generic callback handler in my-functions should continue
   // calling /s2s/affiliate/cashback API without modification
   // Bonus processing happens automatically within the API
   ```

#### Task 3.1: Enhanced Email Templates for Bonus
**Priority:** Medium  
**Estimated Time:** 1-2 days  
**Dependencies:** Task 2.1

**Subtasks:**
1. **Update cashback confirmation email to include bonus information**
   ```typescript
   // In UserCashbackS2SService.processUserCashback method
   // When status is 'approved' and bonus is processed
   
   // Enhanced email template
   const hasBonus = bonusTransaction !== null;
   const bonusAmount = hasBonus ? bonusTransaction.amount.toLocaleString(...) : null;
   
   await this.emailService.sendEmail({
     userId: userClick.userId,
     subject: hasBonus 
       ? 'Congratulations! Your Cashback + Bonus is confirmed 🎉🎁' 
       : 'Congratulations! Your Cashback is confirmed 🎉',
     htmlContent: this.generateEnhancedConfirmationEmail({
       userName,
       merchantName,
       cashbackAmount,
       bonusAmount,
       hasBonus,
       orderId,
       siteName,
       siteLogo,
       ctaDestination
     })
   });
   ```

2. **Create enhanced email template method**
   ```typescript
   // Add to UserCashbackS2SService class
   private generateEnhancedConfirmationEmail(params: EmailTemplateParams): string {
     const { userName, merchantName, cashbackAmount, bonusAmount, hasBonus, orderId, siteName, siteLogo, ctaDestination } = params;
     
     return `<!doctype html>
       <html>
         <head>
           <!-- existing styles -->
           <style>
             .bonus-section {
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
               color: white;
               padding: 20px;
               border-radius: 8px;
               margin: 20px 0;
               text-align: center;
             }
             .bonus-amount {
               font-size: 28px;
               font-weight: bold;
               margin: 10px 0;
             }
           </style>
         </head>
         <body>
           <div class="container">
             <div class="logo">
               <img src="${siteLogo}" alt="${siteName}" />
             </div>
             
             <div class="header">
               🎉 ${hasBonus ? 'Cashback + Bonus Confirmed!' : 'Cashback Confirmed!'} 🎉
             </div>
             
             <div class="content">
               <p>Dear <strong>${userName}</strong>,</p>
               <p>
                 Your cashback for your recent purchase at <strong>${merchantName}</strong>
                 has been successfully confirmed and is now available in your account.
               </p>
               
               ${hasBonus ? `
                 <div class="bonus-section">
                   <h3>🎁 BONUS REWARD! 🎁</h3>
                   <p>As a special bonus, you've earned an additional:</p>
                   <div class="bonus-amount">${bonusAmount}</div>
                   <p>This is our welcome gift for your first confirmed cashback!</p>
                 </div>
               ` : ''}
               
               <p><strong>Transaction Details:</strong></p>
               <div class="transaction-details">
                 <p><strong>Order ID:</strong> ${orderId}</p>
                 <p><strong>Merchant:</strong> ${merchantName}</p>
                 <p><strong>Cashback Amount:</strong> ${cashbackAmount}</p>
                 ${hasBonus ? `<p><strong>Bonus Amount:</strong> ${bonusAmount}</p>` : ''}
                 ${hasBonus ? `<p><strong>Total Credit:</strong> ${(parseFloat(cashbackAmount.replace(/[^0-9.-]+/g,"")) + parseFloat(bonusAmount.replace(/[^0-9.-]+/g,""))).toLocaleString('en-MY', {style: 'currency', currency: 'MYR'})}</p>` : ''}
               </div>
               
               <p>
                 You can now withdraw your ${hasBonus ? 'cashback and bonus' : 'cashback'} to
                 your preferred payment method.
               </p>
               
               <a href="${ctaDestination}" class="cta-button">View Balance</a>
             </div>
             
             <div class="footer">
               <p>&copy; 2025 <strong>${siteName}</strong>. All Rights Reserved.</p>
             </div>
           </div>
         </body>
       </html>`;
   }
   ```

### Phase 4: Admin Interface (my-web)

#### Task 4.1: Admin Bonus Management Pages
**Priority:** High  
**Estimated Time:** 4-5 days  
**Dependencies:** Task 1.4

**Subtasks:**
1. **Bonus list page (`/admin/bonuses`)**
   ```tsx
   // src/app/[lang]/admin/bonuses/page.tsx
   export default async function BonusesPage({ params }: { params: { lang: string } }) {
     const dictionary = await getDictionary(params.lang);
     
     return (
       <AdminLayout>
         <AdminContent>
           <BonusesTable dictionary={dictionary} />
         </AdminContent>
       </AdminLayout>
     );
   }
   ```

2. **Bonus creation form (`/admin/bonuses/create`)**
   ```tsx
   // src/app/[lang]/admin/bonuses/create/page.tsx
   export default async function CreateBonusPage({ params }: { params: { lang: string } }) {
     const dictionary = await getDictionary(params.lang);
     
     return (
       <AdminLayout>
         <AdminContent>
           <BonusForm mode="create" dictionary={dictionary} />
         </AdminContent>
       </AdminLayout>
     );
   }
   ```

3. **Bonus edit form (`/admin/bonuses/[id]/page.tsx`)**
   ```tsx
   export default async function EditBonusPage({ 
     params 
   }: { 
     params: { lang: string; id: string } 
   }) {
     const dictionary = await getDictionary(params.lang);
     const bonusType = await getBonusType(params.id);
     
     return (
       <AdminLayout>
         <AdminContent>
           <BonusForm mode="edit" bonusType={bonusType} dictionary={dictionary} />
         </AdminContent>
       </AdminLayout>
     );
   }
   ```

#### Task 4.2: Bonus Form Components
**Priority:** High  
**Estimated Time:** 3-4 days  
**Dependencies:** Task 4.1

**Subtasks:**
1. **Main bonus form component**
   ```tsx
   // src/components/admin/bonus/bonus-form.tsx
   interface BonusFormProps {
     mode: 'create' | 'edit';
     bonusType?: BonusType;
     dictionary: Dictionary;
   }
   
   export function BonusForm({ mode, bonusType, dictionary }: BonusFormProps) {
     const form = useForm<BonusFormData>({
       defaultValues: bonusType ? mapToFormData(bonusType) : getDefaultValues()
     });
     
     return (
       <form onSubmit={form.handleSubmit(onSubmit)}>
         <BonusBasicFields form={form} dictionary={dictionary} />
         <BonusLocalizationTabs form={form} dictionary={dictionary} />
         <BonusRuleConfiguration form={form} dictionary={dictionary} />
         <BonusFormActions mode={mode} />
       </form>
     );
   }
   ```

2. **Localization tabs component**
   ```tsx
   // src/components/admin/bonus/bonus-localization-tabs.tsx
   export function BonusLocalizationTabs({ form, dictionary }: Props) {
     const [activeLanguage, setActiveLanguage] = useState<LanguageEnum>('English');
     
     return (
       <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
         <TabsList>
           {SUPPORTED_LANGUAGES.map(lang => (
             <TabsTrigger key={lang} value={lang}>
               {dictionary.languages[lang]}
             </TabsTrigger>
           ))}
         </TabsList>
         
         {SUPPORTED_LANGUAGES.map(lang => (
           <TabsContent key={lang} value={lang}>
             <BonusLanguageFields 
               language={lang} 
               form={form} 
               dictionary={dictionary} 
             />
           </TabsContent>
         ))}
       </Tabs>
     );
   }
   ```

3. **Language-specific fields**
   ```tsx
   // src/components/admin/bonus/bonus-language-fields.tsx
   import { RichTextEditor } from '@tekmine/mint-ui';
   
   export function BonusLanguageFields({ language, form, dictionary }: Props) {
     return (
       <div className="space-y-6">
         <FormField
           control={form.control}
           name={`metadatas.${language}.title`}
           render={({ field }) => (
             <FormItem>
               <FormLabel>{dictionary.bonus.title}</FormLabel>
               <TextInput {...field} />
             </FormItem>
           )}
         />
         
         <FormField
           control={form.control}
           name={`metadatas.${language}.description`}
           render={({ field }) => (
             <FormItem>
               <FormLabel>{dictionary.bonus.description}</FormLabel>
               <RichTextEditor 
                 {...field}
                 placeholder={dictionary.bonus.descriptionPlaceholder}
               />
             </FormItem>
           )}
         />
         
         <FormField
           control={form.control}
           name={`metadatas.${language}.termsAndConditions`}
           render={({ field }) => (
             <FormItem>
               <FormLabel>{dictionary.bonus.termsAndConditions}</FormLabel>
               <RichTextEditor 
                 {...field}
                 placeholder={dictionary.bonus.termsPlaceholder}
               />
             </FormItem>
           )}
         />
         
         <BonusImageUpload 
           language={language}
           form={form}
           dictionary={dictionary}
         />
       </div>
     );
   }
   ```

#### Task 4.3: Image Upload Integration
**Priority:** Medium  
**Estimated Time:** 2 days  
**Dependencies:** Task 4.2

**Subtasks:**
1. **Bonus image upload component**
   ```tsx
   // src/components/admin/bonus/bonus-image-upload.tsx
   export function BonusImageUpload({ language, form, dictionary }: Props) {
     const { uploadImage } = useMediaUpload();
     
     const handleFeaturedImageUpload = async (file: File) => {
       const media = await uploadImage(file, {
         folder: 'bonus-images',
         tags: ['bonus', 'featured-image', language]
       });
       
       form.setValue(`metadatas.${language}.featuredImageId`, media.id);
     };
     
     const handleLogoUpload = async (file: File) => {
       const media = await uploadImage(file, {
         folder: 'bonus-logos',
         tags: ['bonus', 'logo', language]
       });
       
       form.setValue(`metadatas.${language}.logoId`, media.id);
     };
     
     return (
       <div className="grid grid-cols-2 gap-6">
         <ImageUploadField
           label={dictionary.bonus.featuredImage}
           onUpload={handleFeaturedImageUpload}
           currentImageId={form.watch(`metadatas.${language}.featuredImageId`)}
         />
         
         <ImageUploadField
           label={dictionary.bonus.logo}
           onUpload={handleLogoUpload}
           currentImageId={form.watch(`metadatas.${language}.logoId`)}
         />
       </div>
     );
   }
   ```

#### Task 4.4: Version Management Interface
**Priority:** Medium  
**Estimated Time:** 2-3 days  
**Dependencies:** Task 4.2

**Subtasks:**
1. **Version history component**
   ```tsx
   // src/components/admin/bonus/bonus-version-history.tsx
   export function BonusVersionHistory({ bonusTypeCode }: Props) {
     const { data: versions } = useQuery(GET_BONUS_VERSIONS, {
       variables: { code: bonusTypeCode }
     });
     
     return (
       <div className="space-y-4">
         {versions?.bonusTypeVersions.map(version => (
           <Card key={version.id}>
             <CardHeader>
               <div className="flex justify-between">
                 <h3>Version {version.version}</h3>
                 <Badge variant={version.statusId === 'Active' ? 'default' : 'secondary'}>
                   {version.status.name}
                 </Badge>
               </div>
             </CardHeader>
             <CardContent>
               <BonusVersionDetails version={version} />
               <BonusVersionActions version={version} />
             </CardContent>
           </Card>
         ))}
       </div>
     );
   }
   ```

2. **User migration tools**
   ```tsx
   // src/components/admin/bonus/user-migration-dialog.tsx
   export function UserMigrationDialog({ bonusType, newVersion }: Props) {
     const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
     const { mutate: migrateUsers } = useMutation(MIGRATE_USERS_TO_VERSION);
     
     return (
       <Dialog>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Migrate Users to Version {newVersion}</DialogTitle>
           </DialogHeader>
           
           <UserSelectionTable
             bonusTypeId={bonusType.id}
             currentVersion={bonusType.version}
             onSelectionChange={setSelectedUsers}
           />
           
           <DialogFooter>
             <Button 
               onClick={() => migrateUsers({ userIds: selectedUsers, newVersion })}
             >
               Migrate Selected Users
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
     );
   }
   ```

### Phase 5: User Interface (my-web)

#### Task 5.1: Bonus Discovery Page
**Priority:** High  
**Estimated Time:** 2-3 days  
**Dependencies:** Task 1.4

**Subtasks:**
1. **Main bonus page**
   ```tsx
   // src/app/[lang]/bonus/page.tsx
   export default async function BonusPage({ params }: { params: { lang: string } }) {
     const dictionary = await getDictionary(params.lang);
     
     return (
       <main className="container mx-auto py-8">
         <BonusPageHeader dictionary={dictionary} />
         <BonusFilters dictionary={dictionary} />
         <BonusGrid dictionary={dictionary} />
       </main>
     );
   }
   ```

2. **Bonus grid component**
   ```tsx
   // src/components/user/bonus/bonus-grid.tsx
   export function BonusGrid({ dictionary }: Props) {
     const { data: eligibilities, loading } = useQuery(GET_USER_BONUS_ELIGIBILITIES, {
       context: {
         headers: {
           'Accept-Language': dictionary.lang,
           'Authorization': `Bearer ${session?.accessToken}`
         }
       }
     });
     
     if (loading) return <BonusGridSkeleton />;
     
     return (
       <Grid cols={3} gap={6}>
         {eligibilities?.myBonuses.map(eligibility => (
           <BonusCard 
             key={eligibility.id} 
             eligibility={eligibility}
             dictionary={dictionary}
           />
         ))}
       </Grid>
     );
   }
   ```

3. **Bonus card component**
   ```tsx
   // src/components/user/bonus/bonus-card.tsx
   import { RichTextPreview } from '@tekmine/mint-ui';
   
   export function BonusCard({ eligibility, dictionary }: Props) {
     const metadata = eligibility.bonusType.currentLanguageMetadata;
     
     return (
       <Card className="cursor-pointer hover:shadow-lg transition-shadow">
         <CardHeader>
           <div className="flex items-center gap-3">
             {metadata?.logo && (
               <Image
                 src={metadata.logo.url}
                 alt={metadata.title}
                 width={40}
                 height={40}
                 className="rounded"
               />
             )}
             <div>
               <h3 className="font-semibold">{metadata?.title}</h3>
               <BonusStatusBadge status={eligibility.statusId} />
             </div>
           </div>
         </CardHeader>
         
         <CardContent>
           {metadata?.featuredImage && (
             <Image
               src={metadata.featuredImage.url}
               alt={metadata.title}
               width={300}
               height={150}
               className="w-full h-32 object-cover rounded mb-4"
             />
           )}
           
           <p className="text-sm text-muted-foreground mb-4">
             <RichTextPreview 
               content={metadata?.description}
               maxLength={100}
               showReadMore={false}
             />
           </p>
           
           <BonusProgress eligibility={eligibility} />
         </CardContent>
         
         <CardFooter>
           <Button 
             onClick={() => openBonusDetail(eligibility)}
             className="w-full"
           >
             {dictionary.bonus.viewDetails}
           </Button>
         </CardFooter>
       </Card>
     );
   }
   ```

#### Task 5.2: Bonus Detail Dialog
**Priority:** Medium  
**Estimated Time:** 2 days  
**Dependencies:** Task 5.1

**Subtasks:**
1. **Bonus detail dialog**
   ```tsx
   // src/components/user/bonus/bonus-detail-dialog.tsx
   import { RichTextPreview } from '@tekmine/mint-ui';
   
   export function BonusDetailDialog({ eligibility, isOpen, onClose, dictionary }: Props) {
     const metadata = eligibility.bonusType.currentLanguageMetadata;
     
     return (
       <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
           <DialogHeader>
             <div className="flex items-center gap-3">
               {metadata?.logo && (
                 <Image
                   src={metadata.logo.url}
                   alt={metadata.title}
                   width={48}
                   height={48}
                   className="rounded"
                 />
               )}
               <div>
                 <DialogTitle>{metadata?.title}</DialogTitle>
                 <BonusStatusBadge status={eligibility.statusId} />
               </div>
             </div>
           </DialogHeader>
           
           <div className="space-y-6">
             {metadata?.featuredImage && (
               <Image
                 src={metadata.featuredImage.url}
                 alt={metadata.title}
                 width={600}
                 height={300}
                 className="w-full h-48 object-cover rounded"
               />
             )}
             
             <div>
               <h4 className="font-semibold mb-2">{dictionary.bonus.description}</h4>
               <RichTextPreview content={metadata?.description} />
             </div>
             
             <BonusProgress eligibility={eligibility} detailed />
             
             <BonusTermsSection 
               termsAndConditions={metadata?.termsAndConditions}
               dictionary={dictionary}
             />
           </div>
         </DialogContent>
       </Dialog>
     );
   }
   ```

2. **Terms and conditions section**
   ```tsx
   // src/components/user/bonus/bonus-terms-section.tsx
   import { RichTextPreview } from '@tekmine/mint-ui';
   
   export function BonusTermsSection({ termsAndConditions, dictionary }: Props) {
     const [isExpanded, setIsExpanded] = useState(false);
     
     return (
       <div className="border-t pt-4">
         <Button
           variant="ghost"
           onClick={() => setIsExpanded(!isExpanded)}
           className="flex items-center gap-2 p-0 h-auto"
         >
           <span className="font-semibold">{dictionary.bonus.termsAndConditions}</span>
           <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
         </Button>
         
         {isExpanded && (
           <div className="mt-4">
             <RichTextPreview 
               content={termsAndConditions}
               className="text-muted-foreground"
             />
           </div>
         )}
       </div>
     );
   }
   ```

#### Task 5.3: Wallet Integration
**Priority:** Medium  
**Estimated Time:** 1-2 days  
**Dependencies:** Task 5.1

**Subtasks:**
1. **Enhanced transaction history**
   ```tsx
   // src/components/user/wallet/enhanced-transaction-history.tsx
   export function EnhancedTransactionHistory({ dictionary }: Props) {
     const { data: transactions } = useQuery(GET_WALLET_TRANSACTIONS_WITH_BONUS, {
       context: {
         headers: {
           'Accept-Language': dictionary.lang,
           'Authorization': `Bearer ${session?.accessToken}`
         }
       }
     });
     
     return (
       <div className="space-y-4">
         {transactions?.myWalletTransactions.map(transaction => (
           <TransactionCard 
             key={transaction.id}
             transaction={transaction}
             dictionary={dictionary}
           />
         ))}
       </div>
     );
   }
   ```

2. **Transaction card with bonus indicators**
   ```tsx
   // src/components/user/wallet/transaction-card.tsx
   export function TransactionCard({ transaction, dictionary }: Props) {
     return (
       <Card>
         <CardContent className="flex items-center justify-between p-4">
           <div className="flex items-center gap-3">
             <TransactionIcon type={transaction.type} />
             <div>
               <h4 className="font-medium">{transaction.description}</h4>
               <p className="text-sm text-muted-foreground">
                 {formatDate(transaction.createdAt)}
               </p>
               {transaction.bonusTransaction && (
                 <Badge variant="secondary" className="mt-1">
                   {dictionary.wallet.bonusTransaction}
                 </Badge>
               )}
             </div>
           </div>
           
           <div className="text-right">
             <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
               {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
             </p>
             <p className="text-sm text-muted-foreground">{transaction.currency}</p>
           </div>
         </CardContent>
       </Card>
     );
   }
   ```

### Phase 6: Testing and Quality Assurance

#### Task 6.1: Backend Unit Tests
**Priority:** High  
**Estimated Time:** 3-4 days  
**Dependencies:** All backend tasks

**Subtasks:**
1. **Service layer tests**
   ```typescript
   // src/bonus/services/__tests__/bonus-type.service.spec.ts
   describe('BonusTypeService', () => {
     describe('createBonusType', () => {
       it('should create a bonus type with version 1', async () => {
         // Test implementation
       });
       
       it('should create localized metadata for all languages', async () => {
         // Test implementation
       });
     });
     
     describe('createNewVersion', () => {
       it('should increment version number', async () => {
         // Test implementation
       });
       
       it('should preserve existing eligibilities', async () => {
         // Test implementation
       });
     });
   });
   ```

2. **Rule engine tests**
   ```typescript
   // src/bonus/rules/__tests__/first-cashback-multiplier.rule.spec.ts
   describe('FirstCashbackMultiplierRule', () => {
     it('should apply bonus for user\'s first confirmed cashback', async () => {
       // Test implementation
     });
     
     it('should not apply bonus for subsequent cashbacks', async () => {
       // Test implementation
     });
     
     it('should calculate correct bonus amount', async () => {
       // Test implementation
     });
   });
   ```

#### Task 6.2: Integration Tests
**Priority:** Medium  
**Estimated Time:** 2-3 days  
**Dependencies:** Task 6.1

**Subtasks:**
1. **End-to-end bonus flow tests**
   ```typescript
   // test/integration/bonus-flow.spec.ts
   describe('Bonus Flow Integration', () => {
     it('should complete full bonus flow for new user', async () => {
       // 1. Create new user
       // 2. Verify bonus eligibility created
       // 3. Simulate first cashback
       // 4. Verify bonus transaction created
       // 5. Verify wallet credited
     });
   });
   ```

2. **GraphQL resolver tests**
   ```typescript
   // src/bonus/resolvers/__tests__/user-bonus.resolver.spec.ts
   describe('UserBonusResolver', () => {
     it('should return user\'s bonus eligibilities', async () => {
       // Test implementation
     });
     
     it('should return localized content based on Accept-Language', async () => {
       // Test implementation
     });
   });
   ```

#### Task 6.3: Frontend Component Tests
**Priority:** Medium  
**Estimated Time:** 2 days  
**Dependencies:** All frontend tasks

**Subtasks:**
1. **React component tests**
   ```typescript
   // src/components/user/bonus/__tests__/bonus-card.test.tsx
   describe('BonusCard', () => {
     it('should render bonus title and description', () => {
       // Test implementation
     });
     
     it('should show correct status badge', () => {
       // Test implementation
     });
     
     it('should handle image loading errors gracefully', () => {
       // Test implementation
     });
   });
   ```

2. **Admin form tests**
   ```typescript
   // src/components/admin/bonus/__tests__/bonus-form.test.tsx
   describe('BonusForm', () => {
     it('should validate required fields', () => {
       // Test implementation
     });
     
     it('should handle image uploads', () => {
       // Test implementation
     });
     
     it('should submit form data correctly', () => {
       // Test implementation
     });
   });
   ```

## GraphQL Queries and Mutations

### Admin Queries/Mutations

```graphql
# Get all bonus types for admin
query GetBonusTypes($status: BonusTypeStatusEnum) {
  bonusTypes(status: $status) {
    id
    code
    version
    priority
    statusId
    effectiveFrom
    effectiveTo
    metadatas {
      languageId
      title
      description
      featuredImage {
        url
      }
      logo {
        url
      }
    }
  }
}

# Create new bonus type
mutation CreateBonusType($input: CreateBonusTypeInput!) {
  createBonusType(input: $input) {
    id
    code
    version
  }
}

# Create new version
mutation CreateBonusTypeVersion($id: String!, $input: CreateVersionInput!) {
  createBonusTypeVersion(id: $id, input: $input) {
    id
    version
    effectiveFrom
  }
}
```

### User Queries

```graphql
# Get user's bonus eligibilities
query GetMyBonuses {
  myBonuses {
    id
    statusId
    availableAt
    expiresAt
    bonusType {
      id
      code
      maxUsagePerUser
      currentLanguageMetadata {
        title
        description
        termsAndConditions
        featuredImage {
          url
        }
        logo {
          url
        }
      }
    }
  }
}

# Get user's bonus transactions
query GetMyBonusTransactions {
  myBonusTransactions {
    id
    amount
    currency
    processedAt
    bonusEligibility {
      bonusType {
        currentLanguageMetadata {
          title
        }
      }
    }
  }
}
```

## Deployment Checklist

### Pre-deployment
- [ ] Database migrations tested in staging
- [ ] GraphQL schema deployed
- [ ] Environment variables configured
- [ ] SNS topic for alerts created
- [ ] SQS queues configured
- [ ] Lambda functions deployed
- [ ] Admin permissions configured

### Post-deployment
- [ ] Verify bonus eligibilities created for new users
- [ ] Test cashback → bonus flow in staging
- [ ] Verify admin interface functionality
- [ ] Test user bonus page
- [ ] Monitor error rates and alerts
- [ ] Verify localization working correctly

## Monitoring and Alerting

### Key Metrics to Monitor
- Bonus eligibility creation rate
- Bonus transaction success rate
- Lambda function error rates
- Database query performance
- Image loading performance

### Alert Thresholds
- Failed bonus transactions: > 5% error rate
- Lambda timeout: > 10% of executions
- Database connection failures: Any occurrence
- SQS DLQ messages: Any messages

This comprehensive technical implementation plan provides a detailed roadmap for implementing the Generic Bonus Engine with proper versioning, localization, and monitoring capabilities.
