export const AppMessages = {
	// ────────────────────────────────────────────────────────────
	// AUTH
	// ────────────────────────────────────────────────────────────
	auth: {
		registerSuccess: "Registration completed successfully",
		loginSuccess: "Logged in successfully",
		logoutSuccess: "Logged out successfully",

		invalidCredentials: "Invalid phone number or password",
		invalidToken: "Invalid authentication token",
		tokenExpired: "Session expired. Please log in again",
		tokenRefreshed: "Session refreshed successfully",

		unauthorized: "Unauthorized access",
		forbidden: "You do not have permission to perform this action",

		accountPendingVerification: "Your account is pending verification.",

		accountSuspended: (reason?: string) =>
			`Your account has been suspended.${reason ? ` Reason: ${reason}` : ""}`,

		accountBlocked: (reason?: string) =>
			`Your account has been blocked.${reason ? ` Reason: ${reason}` : ""}`,

		accountBanned: (reason?: string) =>
			`Your account has been permanently banned.${reason ? ` Reason: ${reason}` : ""}`,

		accountClosed: "Your account has been closed.",
		accountDormant:
			"Your account is dormant. Please verify your identity to continue.",
	},

	// ────────────────────────────────────────────────────────────
	// USER
	// ────────────────────────────────────────────────────────────
	user: {
		notFound: "User not found",

		retrieved: "User retrieved successfully",
		listRetrieved: "Users retrieved successfully",

		created: "User created successfully",
		updated: "Profile updated successfully",
		deleted: "User deleted successfully",

		handleExists: "This username is already taken",
		emailExists: "An account with this email already exists",
		phoneExists: "An account with this phone number already exists",

		alreadyVerified: "User is already verified",
		verified: "User verified successfully",

		passwordChanged: "Password changed successfully",
		passwordSameAsOld:
			"New password cannot be the same as the current password",
		incorrectPassword: "Current password is incorrect",

		statusUpdated: "User status updated successfully",

		alreadySuspended: "User is already suspended",
		alreadyBlocked: "User is already blocked",
		alreadyBanned: "User is already banned",

		suspended: "User suspended successfully",
		blocked: "User blocked successfully",
		banned: "User banned successfully",

		activated: "User activated successfully",
		unbanned: "User unbanned successfully",

		avatarUpdated: "Profile picture updated successfully",
		bioUpdated: "Profile updated successfully",
	},

	// ────────────────────────────────────────────────────────────
	// SESSION
	// ────────────────────────────────────────────────────────────
	session: {
		notFound: "Session not found",

		created: "Session created successfully",
		revoked: "Session revoked successfully",
		revokedAll: "All sessions revoked successfully",

		retrieved: "Sessions retrieved successfully",

		deviceRegistered: "Device registered successfully",
		deviceRemoved: "Device removed successfully",
		deviceAlreadyExists: "Device already registered",
	},

	// ────────────────────────────────────────────────────────────
	// ACCOUNT
	// ────────────────────────────────────────────────────────────
	account: {
		notFound: "Account not found",

		created: "Account created successfully",
		retrieved: "Account retrieved successfully",
		listRetrieved: "Accounts retrieved successfully",

		activated: "Account activated successfully",
		deactivated: "Account deactivated successfully",

		insufficientBalance: (required: number, available: number) =>
			`Insufficient balance. Required: ${required}, Available: ${available}`,

		accountFrozen: "Account has been frozen",
		accountClosed: "Account has been closed",
	},

	// ────────────────────────────────────────────────────────────
	// CARD
	// ────────────────────────────────────────────────────────────
	card: {
		notFound: "Card not found",

		created: "Card created successfully",
		retrieved: "Card retrieved successfully",
		listRetrieved: "Cards retrieved successfully",

		frozen: "Card frozen successfully",
		unfrozen: "Card unfrozen successfully",
		blocked: "Card blocked successfully",

		alreadyFrozen: "Card is already frozen",
		alreadyBlocked: "Card is already blocked",

		expired: "Card has expired",
	},

	// ────────────────────────────────────────────────────────────
	// TRANSACTION
	// ────────────────────────────────────────────────────────────
	transaction: {
		notFound: "Transaction not found",

		created: "Transaction created successfully",
		completed: "Transaction completed successfully",
		failed: "Transaction failed",
		reversed: "Transaction reversed successfully",

		retrieved: "Transaction retrieved successfully",
		listRetrieved: "Transactions retrieved successfully",

		invalidAmount: "Invalid transaction amount",
		selfTransfer: "You cannot transfer money to your own account",

		insufficientBalance: (required: number, available: number) =>
			`Insufficient balance. Required: ${required}, Available: ${available}`,

		limitExceeded: "Transaction limit exceeded",

		alreadyCompleted: "Transaction has already been completed",

		referenceExists: "Transaction reference already exists",
	},

	// ────────────────────────────────────────────────────────────
	// GENERAL
	// ────────────────────────────────────────────────────────────
	general: {
		success: "Operation completed successfully",

		notFound: "Resource not found",

		serverError: "Something went wrong on the server. Please try again later.",

		invalidInput: "Invalid input provided",

		forbidden: "You do not have permission to perform this action",
	},
	// ────────────────────────────────────────────────────────────
	// PAYMENT REQUEST
	// ────────────────────────────────────────────────────────────
	paymentRequest: {
		notFound: "Payment request not found",

		created: "Payment request created successfully",
		cancelled: "Payment request cancelled successfully",
		expired: "Payment request has expired",

		retrieved: "Payment request retrieved successfully",
		listRetrieved: "Payment requests retrieved successfully",

		alreadyPaid: "Payment request has already been paid",
		alreadyCancelled: "Payment request has already been cancelled",

		invalidTarget: "Invalid payment request recipient",
	},

	// ────────────────────────────────────────────────────────────
	// KYC
	// ────────────────────────────────────────────────────────────
	kyc: {
		notFound: "KYC record not found",

		submitted: "KYC submitted successfully",
		retrieved: "KYC information retrieved successfully",

		approved: "KYC approved successfully",
		rejected: "KYC rejected",

		alreadyApproved: "KYC has already been approved",
		alreadyRejected: "KYC has already been rejected",

		requiresAction: "Additional documents are required",

		documentMissing: "Required document is missing",
		livenessFailed: "Liveness verification failed",
	},

	// ────────────────────────────────────────────────────────────
	// AML
	// ────────────────────────────────────────────────────────────
	aml: {
		clear: "AML verification passed",
		flagged: "Transaction flagged for review",
		blocked: "Transaction blocked",
		reviewRequired: "Manual compliance review required",
	},

	// ────────────────────────────────────────────────────────────
	// SAVINGS GOAL
	// ────────────────────────────────────────────────────────────
	savingsGoal: {
		notFound: "Savings goal not found",

		created: "Savings goal created successfully",
		updated: "Savings goal updated successfully",
		deleted: "Savings goal deleted successfully",

		retrieved: "Savings goal retrieved successfully",
		listRetrieved: "Savings goals retrieved successfully",

		completed: "Savings goal completed successfully",

		memberAdded: "Member added successfully",
		memberRemoved: "Member removed successfully",

		alreadyMember: "User is already a member of this goal",
	},

	// ────────────────────────────────────────────────────────────
	// PROMISE
	// ────────────────────────────────────────────────────────────
	promise: {
		notFound: "Promise not found",

		created: "Promise created successfully",
		accepted: "Promise accepted successfully",
		cancelled: "Promise cancelled successfully",

		completed: "Promise completed successfully",
		missed: "Promise payment missed",

		retrieved: "Promise retrieved successfully",
		listRetrieved: "Promises retrieved successfully",

		installmentPaid: "Installment paid successfully",
	},

	// ────────────────────────────────────────────────────────────
	// POST
	// ────────────────────────────────────────────────────────────
	post: {
		notFound: "Post not found",

		created: "Post created successfully",
		updated: "Post updated successfully",
		deleted: "Post deleted successfully",

		retrieved: "Post retrieved successfully",
		listRetrieved: "Posts retrieved successfully",

		pinned: "Post pinned successfully",
		unpinned: "Post unpinned successfully",
	},

	// ────────────────────────────────────────────────────────────
	// COMMENT
	// ────────────────────────────────────────────────────────────
	comment: {
		notFound: "Comment not found",

		created: "Comment added successfully",
		updated: "Comment updated successfully",
		deleted: "Comment deleted successfully",
	},

	// ────────────────────────────────────────────────────────────
	// LIKE
	// ────────────────────────────────────────────────────────────
	like: {
		liked: "Post liked successfully",
		unliked: "Like removed successfully",

		alreadyLiked: "Post already liked",
		notLiked: "Post has not been liked",
	},

	// ────────────────────────────────────────────────────────────
	// FRIENDSHIP
	// ────────────────────────────────────────────────────────────
	friendship: {
		notFound: "Friend request not found",

		requestSent: "Friend request sent successfully",
		requestAccepted: "Friend request accepted",
		requestRejected: "Friend request rejected",

		requestCancelled: "Friend request cancelled",

		alreadyFriends: "Users are already friends",
		requestAlreadySent: "Friend request already sent",

		userBlocked: "User blocked successfully",
		userUnblocked: "User unblocked successfully",

		listRetrieved: "Friends retrieved successfully",
	},

	// ────────────────────────────────────────────────────────────
	// NOTIFICATION
	// ────────────────────────────────────────────────────────────
	notification: {
		notFound: "Notification not found",

		retrieved: "Notification retrieved successfully",
		listRetrieved: "Notifications retrieved successfully",

		markedRead: "Notification marked as read",
		allMarkedRead: "All notifications marked as read",

		deleted: "Notification deleted successfully",

		sent: "Notification sent successfully",
	},

	// ────────────────────────────────────────────────────────────
	// BADGE
	// ────────────────────────────────────────────────────────────
	badge: {
		notFound: "Badge not found",

		earned: "Badge earned successfully",

		retrieved: "Badge retrieved successfully",
		listRetrieved: "Badges retrieved successfully",
	},

	// ────────────────────────────────────────────────────────────
	// STREAK
	// ────────────────────────────────────────────────────────────
	streak: {
		retrieved: "Streak retrieved successfully",
		listRetrieved: "Streaks retrieved successfully",

		updated: "Streak updated successfully",
		reset: "Streak reset successfully",
	},

	// ────────────────────────────────────────────────────────────
	// CREDIT
	// ────────────────────────────────────────────────────────────
	credit: {
		notFound: "Credit application not found",

		applied: "Credit application submitted successfully",

		approved: "Credit application approved",
		rejected: "Credit application rejected",

		disbursed: "Credit disbursed successfully",

		repaid: "Credit repayment successful",

		paidOff: "Credit fully repaid",

		defaulted: "Credit marked as defaulted",

		retrieved: "Credit information retrieved successfully",
		listRetrieved: "Credit applications retrieved successfully",
	},

	// ────────────────────────────────────────────────────────────
	// PRIVACY
	// ────────────────────────────────────────────────────────────
	privacy: {
		retrieved: "Privacy settings retrieved successfully",
		updated: "Privacy settings updated successfully",
	},

	// ────────────────────────────────────────────────────────────
	// ADMIN
	// ────────────────────────────────────────────────────────────
	admin: {
		notFound: "Admin not found",

		created: "Admin created successfully",
		updated: "Admin updated successfully",
		deleted: "Admin deleted successfully",

		retrieved: "Admin retrieved successfully",
		listRetrieved: "Admins retrieved successfully",

		statusUpdated: "Admin status updated successfully",
	},

	// ────────────────────────────────────────────────────────────
	// APP SETTINGS
	// ────────────────────────────────────────────────────────────
	appSetting: {
		notFound: "Application setting not found",

		retrieved: "Application settings retrieved successfully",

		updated: "Application setting updated successfully",
	},

	// ────────────────────────────────────────────────────────────
	// AUDIT LOG
	// ────────────────────────────────────────────────────────────
	audit: {
		retrieved: "Audit logs retrieved successfully",
	},

	// ────────────────────────────────────────────────────────────
	// REVENUE
	// ────────────────────────────────────────────────────────────
	revenue: {
		notFound: "Revenue record not found",

		retrieved: "Revenue information retrieved successfully",

		listRetrieved: "Revenue history retrieved successfully",

		updated: "Revenue record updated successfully",
	},
} as const;
