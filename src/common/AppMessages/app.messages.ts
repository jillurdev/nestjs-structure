export const AppMessages = {
	// ─── Auth ─────────────────────────────────────────────────────
	auth: {
		invalidCredentials: "Invalid phone number or password",
		accountDeactivated: "Your account has been deactivated",
		accountBanned: (reason: string) =>
			`Your account has been suspended. Reason: ${reason || "Not specified"}`,
		tokenInvalid: "Session expired. Please log in again",
		tokenRefreshed: "Session refreshed successfully",
		unauthorized: "Unauthorized access",
		logoutSuccess: "Logged out successfully",
		loginSuccess: "Logged in successfully",
		registerSuccess: "Registration completed successfully",
	},

	// ─── User ─────────────────────────────────────────────────────
	user: {
		notFound: "User not found",
		phoneExists: "An account with this phone number already exists",
		emailExists: "An account with this email already exists",
		deviceLimit: "A maximum of 2 accounts can be created from this device",
		profileUpdated: "Profile updated successfully",
		passwordSameAsOld:
			"New password cannot be the same as the current password",
		passwordChanged: "Password changed successfully",
		incorrectPassword: "Current password is incorrect",
		banned: (reason: string) => `User has been suspended. Reason: ${reason}`,
		unbanned: "User suspension has been removed",
		retrieved: "User information retrieved successfully",
		alreadyBanned: "User is already suspended",
		notBanned: "User is not suspended",
		deleted: "User deleted successfully",
	},

	// ─── Referral ─────────────────────────────────────────────────
	referral: {
		invalidCode: "Invalid referral code",
		selfReferral: "You cannot use your own referral code",
		alreadyApplied: "Referral code has already been applied",
		applied: "Referral code applied successfully",
	},

	// ─── Ads ──────────────────────────────────────────────────────
	ads: {
		notFound: "Advertisement not found",
		notActive: "This advertisement is not active",
		accountNotActive: "Your account is not active",
		premiumRequired:
			"Premium membership is required to view this advertisement",
		notAvailable: "This advertisement is not available for you",
		dailyLimitReached: (limit: number) =>
			`Daily limit reached. You can watch up to ${limit} ads per day`,
		verificationFailed: "Advertisement verification failed",
		watchSuccess: (amount: number) =>
			`Ad watched successfully! You earned ৳${amount}`,
		retrieved: "Advertisements retrieved successfully",
		created: "Advertisement created successfully",
		updated: "Advertisement updated successfully",
		deleted: "Advertisement deleted successfully",
		toggled: "Advertisement status updated successfully",
		statsRetrieved: "Today's statistics retrieved successfully",
		historyRetrieved: "Ad watch history retrieved successfully",
	},

	// ─── Topup ────────────────────────────────────────────────────
	topup: {
		notFound: "Top-up request not found",
		duplicateTransaction: "This transaction ID has already been used",
		pendingExists: "You already have a pending top-up request",
		requested: "Top-up request submitted successfully",
		approved: "Top-up request approved successfully",
		rejected: "Top-up request rejected",
		alreadyProcessed: "This request has already been processed",
		retrieved: "Top-up requests retrieved successfully",
		historyRetrieved: "Top-up history retrieved successfully",
	},

	// ─── Withdrawal ───────────────────────────────────────────────
	withdrawal: {
		notFound: "Withdrawal request not found",
		insufficientBalance: (required: number, available: number) =>
			`Insufficient balance. Required: ৳${required}, Available: ৳${available}`,
		belowMinimum: (min: number) => `Minimum withdrawal amount is ৳${min}`,
		pendingExists: "You already have a pending withdrawal request",
		requested: "Withdrawal request submitted successfully",
		approved: "Withdrawal request approved successfully",
		rejected: "Withdrawal request rejected",
		alreadyProcessed: "This request has already been processed",
		retrieved: "Withdrawal information retrieved successfully",
		historyRetrieved: "Withdrawal history retrieved successfully",
	},

	// ─── Subscription ─────────────────────────────────────────────
	subscription: {
		notFound: "Subscription plan not found",
		alreadyPremium: "You are already a premium member",
		insufficientBalance: (price: number, available: number) =>
			`Insufficient balance. Premium costs ৳${price}, Available: ৳${available}`,
		upgradeSuccess: "Premium membership activated successfully! 🎉",
		plansRetrieved: "Subscription plans retrieved successfully",
		statusRetrieved: "Subscription status retrieved successfully",
		expiredCount: (count: number) =>
			`${count} expired subscriptions have been updated`,
		allRetrieved: "All subscriptions retrieved successfully",
	},

	// ─── Notification ─────────────────────────────────────────────
	notification: {
		notFound: "Notification not found",
		retrieved: "Notifications retrieved successfully",
		markedRead: "Notification marked as read",
		allMarkedRead: "All notifications marked as read",
		sent: (count: number) => `Notification sent to ${count} users successfully`,
	},

	// ─── Admin ────────────────────────────────────────────────────
	admin: {
		notFound: "Admin not found",
		phoneExists: "An account with this phone number already exists",
		created: "Admin created successfully",
		deleted: "Admin deleted successfully",
		statusUpdated: "Admin status updated successfully",
		retrieved: "Admins retrieved successfully",
		dashboardRetrieved: "Dashboard data retrieved successfully",
	},

	// ─── Owner ────────────────────────────────────────────────────
	owner: {
		overviewRetrieved: "Overview retrieved successfully",
		settingsRetrieved: "Settings retrieved successfully",
		settingUpdated: "Setting updated successfully",
		settingsUpdated: "All settings updated successfully",
		revenueRetrieved: "Revenue data retrieved successfully",
		revenueUpdated: "Revenue data updated successfully",
		bonusGiven: (amount: number, name: string) =>
			`Bonus of ৳${amount} has been awarded to ${name}`,
		maintenanceEnabled: "Maintenance mode enabled",
		maintenanceDisabled: "Maintenance mode disabled",
		forceUpdateSet: (version: string) =>
			`Force update has been enabled for version ${version}`,
	},

	// ─── Blog ─────────────────────────────────────────────────────
	blog: {
		notFound: "Post not found",
		slugExists: "A post with this slug already exists",
		created: "Post created successfully",
		updated: "Post updated successfully",
		deleted: "Post deleted successfully",
		published: "Post published successfully",
		unpublished: "Post unpublished successfully",
		retrieved: "Post retrieved successfully",
		allRetrieved: "Posts retrieved successfully",
	},

	// ─── General ──────────────────────────────────────────────────
	general: {
		notFound: "Resource not found",
		serverError: "Something went wrong on the server. Please try again later",
		forbidden: "You do not have permission to perform this action",
		invalidInput: "Invalid input provided",
	},
} as const;
