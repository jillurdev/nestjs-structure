-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'BLOCKED', 'BANNED', 'DEACTIVATED', 'CLOSED', 'DORMANT');

-- CreateEnum
CREATE TYPE "LoginMethod" AS ENUM ('PASSWORD', 'GOOGLE', 'APPLE', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "KycTier" AS ENUM ('TIER_0', 'TIER_1', 'TIER_2', 'TIER_3');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'REQUIRES_ACTION');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('MAIN', 'SAVINGS');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REVERSED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('P2P_TRANSFER', 'EXTERNAL_TRANSFER', 'SAVINGS_DEPOSIT', 'SAVINGS_WITHDRAWAL', 'PROMISE_PAYMENT', 'BIRTHDAY_GIFT', 'CARD_PAYMENT', 'REFUND', 'CREDIT_DISBURSEMENT', 'CREDIT_REPAYMENT');

-- CreateEnum
CREATE TYPE "PromiseFrequency" AS ENUM ('WEEKLY', 'MONTHLY', 'ONE_TIME');

-- CreateEnum
CREATE TYPE "PromiseStatus" AS ENUM ('PENDING_ACCEPTANCE', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'MISSED');

-- CreateEnum
CREATE TYPE "PostVisibility" AS ENUM ('PUBLIC', 'FRIENDS', 'PRIVATE');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BIRTHDAY_REMINDER', 'BIRTHDAY_GIFT_SENT', 'BIRTHDAY_GIFT_RECEIVED', 'PROMISE_CREATED', 'PROMISE_ACCEPTED', 'PROMISE_FULFILLED', 'PROMISE_MISSED', 'PROMISE_REMINDER', 'MONEY_RECEIVED', 'MONEY_SENT', 'MONEY_REQUESTED', 'TAGGED_IN_POST', 'TAGGED_IN_TRANSFER', 'WALL_LIKE', 'WALL_COMMENT', 'KYC_APPROVED', 'KYC_REJECTED', 'CARD_FROZEN', 'LOW_BALANCE', 'BADGE_EARNED', 'STREAK_MILESTONE', 'SYSTEM');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('ACTIVE', 'FROZEN', 'BLOCKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('VIRTUAL', 'PHYSICAL');

-- CreateEnum
CREATE TYPE "CreditStatus" AS ENUM ('PENDING', 'APPROVED', 'ACTIVE', 'PAID_OFF', 'DEFAULTED');

-- CreateEnum
CREATE TYPE "BadgeCategory" AS ENUM ('SAVING', 'SOCIAL', 'FINANCIAL_LITERACY', 'GENEROSITY', 'STREAK');

-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "AmlCheckStatus" AS ENUM ('CLEAR', 'FLAGGED', 'REVIEW_REQUIRED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'COMPLIANCE_OFFICER', 'SUPPORT_AGENT', 'FINANCE_MANAGER');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_audit_logs" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetType" TEXT,
    "targetId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "vybeScore" INTEGER NOT NULL DEFAULT 0,
    "kyc_tier" "KycTier" NOT NULL DEFAULT 'TIER_0',
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "statusReason" TEXT,
    "statusChangedAt" TIMESTAMP(3),
    "statusChangedById" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "deviceName" TEXT,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "loginMethod" "LoginMethod" NOT NULL DEFAULT 'PASSWORD',
    "refreshTokenHash" TEXT NOT NULL,
    "isTrusted" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kyc_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tier" "KycTier" NOT NULL,
    "status" "KycStatus" NOT NULL DEFAULT 'PENDING',
    "providerRef" TEXT,
    "documentType" TEXT,
    "documentImageUrl" TEXT,
    "selfieImageUrl" TEXT,
    "livenessCheckPassed" BOOLEAN,
    "proofOfAddressUrl" TEXT,
    "rejectionReason" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kyc_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aml_checks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionId" TEXT,
    "status" "AmlCheckStatus" NOT NULL DEFAULT 'CLEAR',
    "reason" TEXT,
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aml_checks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_limits" (
    "id" TEXT NOT NULL,
    "kyc_tier" "KycTier" NOT NULL,
    "dailyLimit" DECIMAL(18,2) NOT NULL,
    "weeklyLimit" DECIMAL(18,2) NOT NULL,
    "monthlyLimit" DECIMAL(18,2) NOT NULL,
    "singleTxLimit" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',

    CONSTRAINT "transaction_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "virtualAccountNumber" TEXT NOT NULL,
    "balance" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "accountType" "AccountType" NOT NULL DEFAULT 'MAIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "cardType" "CardType" NOT NULL DEFAULT 'VIRTUAL',
    "lastFourDigits" TEXT NOT NULL,
    "expiryMonth" INTEGER NOT NULL,
    "expiryYear" INTEGER NOT NULL,
    "status" "CardStatus" NOT NULL DEFAULT 'ACTIVE',
    "billingAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "fromAccountId" TEXT NOT NULL,
    "toAccountId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "type" "TransactionType" NOT NULL,
    "note" TEXT,
    "reference" TEXT NOT NULL,
    "externalRef" TEXT,
    "postToWall" BOOLEAN NOT NULL DEFAULT false,
    "hideAmount" BOOLEAN NOT NULL DEFAULT false,
    "promiseId" TEXT,
    "socialPostId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_requests" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "note" TEXT,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "linkToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savings_goals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "targetAmount" DECIMAL(18,2) NOT NULL,
    "currentAmount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "emoji" TEXT,
    "coverImageUrl" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isGroupGoal" BOOLEAN NOT NULL DEFAULT false,
    "targetDate" TIMESTAMP(3),
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "savings_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savings_goal_members" (
    "id" TEXT NOT NULL,
    "savingsGoalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contribution" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "savings_goal_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vybe_wish_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isOptedIn" BOOLEAN NOT NULL DEFAULT true,
    "showOnWall" BOOLEAN NOT NULL DEFAULT true,
    "notifyContactsDaysBefore" INTEGER[] DEFAULT ARRAY[7, 3, 1]::INTEGER[],

    CONSTRAINT "vybe_wish_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "birthday_notification_jobs" (
    "id" TEXT NOT NULL,
    "birthdayUserId" TEXT NOT NULL,
    "notifyUserId" TEXT NOT NULL,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "daysBefore" INTEGER NOT NULL,
    "isSent" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "birthday_notification_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promises" (
    "id" TEXT NOT NULL,
    "promisorUserId" TEXT NOT NULL,
    "promiseeUserId" TEXT NOT NULL,
    "title" TEXT,
    "totalAmount" DECIMAL(18,2) NOT NULL,
    "installmentAmount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "frequency" "PromiseFrequency" NOT NULL,
    "totalInstallments" INTEGER NOT NULL,
    "fulfilledCount" INTEGER NOT NULL DEFAULT 0,
    "status" "PromiseStatus" NOT NULL DEFAULT 'PENDING_ACCEPTANCE',
    "nextDueDate" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promise_installments" (
    "id" TEXT NOT NULL,
    "promiseId" TEXT NOT NULL,
    "installmentNo" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "status" "PromiseStatus" NOT NULL DEFAULT 'PENDING_ACCEPTANCE',
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promise_installments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT,
    "mediaUrls" TEXT[],
    "visibility" "PostVisibility" NOT NULL DEFAULT 'FRIENDS',
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isSystemPost" BOOLEAN NOT NULL DEFAULT false,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "taggedUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendships" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "FriendshipStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "senderId" TEXT,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "metadata" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestedAmount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "creditType" TEXT NOT NULL,
    "status" "CreditStatus" NOT NULL DEFAULT 'PENDING',
    "approvedAmount" DECIMAL(18,2),
    "interestRate" DECIMAL(5,4),
    "repaymentPeriodDays" INTEGER,
    "alternativeScoreData" JSONB,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credit_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credits" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "principalAmount" DECIMAL(18,2) NOT NULL,
    "outstandingBalance" DECIMAL(18,2) NOT NULL,
    "interestRate" DECIMAL(5,4) NOT NULL,
    "status" "CreditStatus" NOT NULL DEFAULT 'ACTIVE',
    "disbursedAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "paidOffAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "category" "BadgeCategory" NOT NULL,
    "condition" JSONB NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_streaks" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "streakType" TEXT NOT NULL,
    "currentCount" INTEGER NOT NULL DEFAULT 0,
    "longestCount" INTEGER NOT NULL DEFAULT 0,
    "lastActivityAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_streaks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privacy_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "defaultPostVisibility" "PostVisibility" NOT NULL DEFAULT 'FRIENDS',
    "showTransactionsOnWall" BOOLEAN NOT NULL DEFAULT true,
    "showAmountsOnWall" BOOLEAN NOT NULL DEFAULT false,
    "allowTagging" BOOLEAN NOT NULL DEFAULT true,
    "allowFriendRequests" BOOLEAN NOT NULL DEFAULT true,
    "showBirthdayToFriends" BOOLEAN NOT NULL DEFAULT true,
    "showVybeScore" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "privacy_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "transactionId" TEXT,
    "action" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "adminId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue_records" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "transactionFeeRevenue" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "cardInterchangeRevenue" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "interestRevenue" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "lateFeeRevenue" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "subscriptionRevenue" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "otherRevenue" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "totalRevenue" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "totalPayouts" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "netProfit" DECIMAL(14,2) NOT NULL DEFAULT 0.00,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revenue_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "admin_audit_logs_adminId_createdAt_idx" ON "admin_audit_logs"("adminId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_handle_key" ON "users"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_deviceId_idx" ON "sessions"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "device_tokens_token_key" ON "device_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_limits_kyc_tier_key" ON "transaction_limits"("kyc_tier");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_virtualAccountNumber_key" ON "accounts"("virtualAccountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_reference_key" ON "transactions"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_socialPostId_key" ON "transactions"("socialPostId");

-- CreateIndex
CREATE INDEX "transactions_senderId_idx" ON "transactions"("senderId");

-- CreateIndex
CREATE INDEX "transactions_receiverId_idx" ON "transactions"("receiverId");

-- CreateIndex
CREATE INDEX "transactions_createdAt_idx" ON "transactions"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "payment_requests_linkToken_key" ON "payment_requests"("linkToken");

-- CreateIndex
CREATE UNIQUE INDEX "savings_goals_accountId_key" ON "savings_goals"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "savings_goal_members_savingsGoalId_userId_key" ON "savings_goal_members"("savingsGoalId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "vybe_wish_settings_userId_key" ON "vybe_wish_settings"("userId");

-- CreateIndex
CREATE INDEX "birthday_notification_jobs_scheduledFor_isSent_idx" ON "birthday_notification_jobs"("scheduledFor", "isSent");

-- CreateIndex
CREATE UNIQUE INDEX "birthday_notification_jobs_birthdayUserId_notifyUserId_days_key" ON "birthday_notification_jobs"("birthdayUserId", "notifyUserId", "daysBefore");

-- CreateIndex
CREATE UNIQUE INDEX "promise_installments_promiseId_installmentNo_key" ON "promise_installments"("promiseId", "installmentNo");

-- CreateIndex
CREATE UNIQUE INDEX "posts_transactionId_key" ON "posts"("transactionId");

-- CreateIndex
CREATE INDEX "posts_userId_createdAt_idx" ON "posts"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "post_tags_postId_taggedUserId_key" ON "post_tags"("postId", "taggedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_postId_userId_key" ON "likes"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "friendships_senderId_receiverId_key" ON "friendships"("senderId", "receiverId");

-- CreateIndex
CREATE INDEX "notifications_receiverId_isRead_createdAt_idx" ON "notifications"("receiverId", "isRead", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "credits_applicationId_key" ON "credits"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "badges_name_key" ON "badges"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_userId_badgeId_key" ON "user_badges"("userId", "badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "user_streaks_userId_streakType_key" ON "user_streaks"("userId", "streakType");

-- CreateIndex
CREATE UNIQUE INDEX "privacy_settings_userId_key" ON "privacy_settings"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_userId_createdAt_idx" ON "audit_logs"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "app_settings_key_key" ON "app_settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "revenue_records_date_key" ON "revenue_records"("date");

-- AddForeignKey
ALTER TABLE "admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_statusChangedById_fkey" FOREIGN KEY ("statusChangedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_tokens" ADD CONSTRAINT "device_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kyc_records" ADD CONSTRAINT "kyc_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kyc_records" ADD CONSTRAINT "kyc_records_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aml_checks" ADD CONSTRAINT "aml_checks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aml_checks" ADD CONSTRAINT "aml_checks_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aml_checks" ADD CONSTRAINT "aml_checks_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_promiseId_fkey" FOREIGN KEY ("promiseId") REFERENCES "promises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_socialPostId_fkey" FOREIGN KEY ("socialPostId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savings_goals" ADD CONSTRAINT "savings_goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savings_goals" ADD CONSTRAINT "savings_goals_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savings_goal_members" ADD CONSTRAINT "savings_goal_members_savingsGoalId_fkey" FOREIGN KEY ("savingsGoalId") REFERENCES "savings_goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vybe_wish_settings" ADD CONSTRAINT "vybe_wish_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promises" ADD CONSTRAINT "promises_promisorUserId_fkey" FOREIGN KEY ("promisorUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promises" ADD CONSTRAINT "promises_promiseeUserId_fkey" FOREIGN KEY ("promiseeUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promise_installments" ADD CONSTRAINT "promise_installments_promiseId_fkey" FOREIGN KEY ("promiseId") REFERENCES "promises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_applications" ADD CONSTRAINT "credit_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_applications" ADD CONSTRAINT "credit_applications_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "credit_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_streaks" ADD CONSTRAINT "user_streaks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privacy_settings" ADD CONSTRAINT "privacy_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "app_settings" ADD CONSTRAINT "app_settings_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
