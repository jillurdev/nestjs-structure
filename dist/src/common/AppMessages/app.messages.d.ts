export declare const AppMessages: {
    readonly auth: {
        readonly invalidCredentials: "ফোন নম্বর বা পাসওয়ার্ড সঠিক নয়";
        readonly accountDeactivated: "আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে";
        readonly accountBanned: (reason: string) => string;
        readonly tokenInvalid: "সেশন মেয়াদ শেষ, আবার লগইন করুন";
        readonly tokenRefreshed: "সেশন নবায়ন হয়েছে";
        readonly unauthorized: "অনুমতি নেই";
        readonly logoutSuccess: "লগআউট সফল হয়েছে";
        readonly loginSuccess: "লগইন সফল হয়েছে";
        readonly registerSuccess: "রেজিস্ট্রেশন সফল হয়েছে";
    };
    readonly user: {
        readonly notFound: "ব্যবহারকারী পাওয়া যায়নি";
        readonly phoneExists: "এই ফোন নম্বর দিয়ে আগেই অ্যাকাউন্ট আছে";
        readonly emailExists: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে";
        readonly deviceLimit: "এই ডিভাইস থেকে সর্বোচ্চ ২টি অ্যাকাউন্ট তৈরি করা যাবে";
        readonly profileUpdated: "প্রোফাইল আপডেট হয়েছে";
        readonly passwordSameAsOld: "নতুন পাসওয়ার্ড বর্তমান পাসওয়ার্ডের মতো হতে পারবে না";
        readonly passwordChanged: "পাসওয়ার্ড পরিবর্তন হয়েছে";
        readonly incorrectPassword: "বর্তমান পাসওয়ার্ড সঠিক নয়";
        readonly banned: (reason: string) => string;
        readonly unbanned: "ব্যবহারকারীর স্থগিতাদেশ তুলে নেওয়া হয়েছে";
        readonly retrieved: "ব্যবহারকারীর তথ্য পাওয়া গেছে";
        readonly alreadyBanned: "ব্যবহারকারী ইতোমধ্যে স্থগিত আছে";
        readonly notBanned: "ব্যবহারকারী স্থগিত নেই";
        readonly deleted: "ব্যবহারকারী মুছে ফেলা হয়েছে";
    };
    readonly referral: {
        readonly invalidCode: "রেফারেল কোড সঠিক নয়";
        readonly selfReferral: "নিজের রেফারেল কোড ব্যবহার করা যাবে না";
        readonly alreadyApplied: "রেফারেল কোড ইতোমধ্যে ব্যবহার করা হয়েছে";
        readonly applied: "রেফারেল কোড সফলভাবে প্রয়োগ হয়েছে";
    };
    readonly ads: {
        readonly notFound: "বিজ্ঞাপন পাওয়া যায়নি";
        readonly notActive: "বিজ্ঞাপনটি সক্রিয় নেই";
        readonly accountNotActive: "আপনার অ্যাকাউন্ট সক্রিয় নেই";
        readonly premiumRequired: "এই বিজ্ঞাপন দেখতে প্রিমিয়াম সদস্যপদ প্রয়োজন";
        readonly notAvailable: "এই বিজ্ঞাপনটি আপনার জন্য প্রযোজ্য নয়";
        readonly dailyLimitReached: (limit: number) => string;
        readonly verificationFailed: "বিজ্ঞাপন যাচাই করা সম্ভব হয়নি";
        readonly watchSuccess: (amount: number) => string;
        readonly retrieved: "বিজ্ঞাপন তালিকা পাওয়া গেছে";
        readonly created: "বিজ্ঞাপন তৈরি হয়েছে";
        readonly updated: "বিজ্ঞাপন আপডেট হয়েছে";
        readonly deleted: "বিজ্ঞাপন মুছে ফেলা হয়েছে";
        readonly toggled: "বিজ্ঞাপনের অবস্থা পরিবর্তন হয়েছে";
        readonly statsRetrieved: "আজকের তথ্য পাওয়া গেছে";
        readonly historyRetrieved: "বিজ্ঞাপন দেখার ইতিহাস পাওয়া গেছে";
    };
    readonly topup: {
        readonly notFound: "টপআপ অনুরোধ পাওয়া যায়নি";
        readonly duplicateTransaction: "এই ট্রানজেকশন আইডি আগেই ব্যবহার করা হয়েছে";
        readonly pendingExists: "আপনার একটি টপআপ অনুরোধ ইতোমধ্যে প্রক্রিয়াধীন আছে";
        readonly requested: "টপআপ অনুরোধ সফলভাবে জমা হয়েছে";
        readonly approved: "টপআপ অনুমোদন করা হয়েছে";
        readonly rejected: "টপআপ বাতিল করা হয়েছে";
        readonly alreadyProcessed: "এই অনুরোধটি ইতোমধ্যে প্রক্রিয়া করা হয়েছে";
        readonly retrieved: "টপআপ তালিকা পাওয়া গেছে";
        readonly historyRetrieved: "টপআপ ইতিহাস পাওয়া গেছে";
    };
    readonly withdrawal: {
        readonly notFound: "উত্তোলনের অনুরোধ পাওয়া যায়নি";
        readonly insufficientBalance: (required: number, available: number) => string;
        readonly belowMinimum: (min: number) => string;
        readonly pendingExists: "আপনার একটি অনুরোধ ইতোমধ্যে প্রক্রিয়াধীন আছে";
        readonly requested: "উত্তোলনের অনুরোধ সফলভাবে জমা হয়েছে";
        readonly approved: "উত্তোলন অনুমোদন করা হয়েছে";
        readonly rejected: "উত্তোলন বাতিল করা হয়েছে";
        readonly alreadyProcessed: "এই অনুরোধটি ইতোমধ্যে প্রক্রিয়া করা হয়েছে";
        readonly retrieved: "উত্তোলনের তথ্য পাওয়া গেছে";
        readonly historyRetrieved: "উত্তোলনের ইতিহাস পাওয়া গেছে";
    };
    readonly subscription: {
        readonly notFound: "সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি";
        readonly alreadyPremium: "আপনি ইতোমধ্যে প্রিমিয়াম সদস্য";
        readonly insufficientBalance: (price: number, available: number) => string;
        readonly upgradeSuccess: "প্রিমিয়াম সদস্যপদ সফলভাবে সক্রিয় হয়েছে! 🎉";
        readonly plansRetrieved: "প্ল্যানের তালিকা পাওয়া গেছে";
        readonly statusRetrieved: "সাবস্ক্রিপশনের তথ্য পাওয়া গেছে";
        readonly expiredCount: (count: number) => string;
        readonly allRetrieved: "সকল সাবস্ক্রিপশন পাওয়া গেছে";
    };
    readonly notification: {
        readonly notFound: "নোটিফিকেশন পাওয়া যায়নি";
        readonly retrieved: "নোটিফিকেশন তালিকা পাওয়া গেছে";
        readonly markedRead: "নোটিফিকেশন পঠিত হিসেবে চিহ্নিত হয়েছে";
        readonly allMarkedRead: "সকল নোটিফিকেশন পঠিত হিসেবে চিহ্নিত হয়েছে";
        readonly sent: (count: number) => string;
    };
    readonly admin: {
        readonly notFound: "অ্যাডমিন পাওয়া যায়নি";
        readonly phoneExists: "এই ফোন নম্বর দিয়ে আগেই অ্যাকাউন্ট আছে";
        readonly created: "অ্যাডমিন তৈরি হয়েছে";
        readonly deleted: "অ্যাডমিন মুছে ফেলা হয়েছে";
        readonly statusUpdated: "অ্যাডমিনের অবস্থা পরিবর্তন হয়েছে";
        readonly retrieved: "অ্যাডমিনের তালিকা পাওয়া গেছে";
        readonly dashboardRetrieved: "ড্যাশবোর্ডের তথ্য পাওয়া গেছে";
    };
    readonly owner: {
        readonly overviewRetrieved: "সামগ্রিক তথ্য পাওয়া গেছে";
        readonly settingsRetrieved: "সেটিংস পাওয়া গেছে";
        readonly settingUpdated: "সেটিং আপডেট হয়েছে";
        readonly settingsUpdated: "সকল সেটিংস আপডেট হয়েছে";
        readonly revenueRetrieved: "রেভিনিউ তথ্য পাওয়া গেছে";
        readonly revenueUpdated: "রেভিনিউ তথ্য আপডেট হয়েছে";
        readonly bonusGiven: (amount: number, name: string) => string;
        readonly maintenanceEnabled: "মেইনটেন্যান্স মোড চালু হয়েছে";
        readonly maintenanceDisabled: "মেইনটেন্যান্স মোড বন্ধ হয়েছে";
        readonly forceUpdateSet: (version: string) => string;
    };
    readonly blog: {
        readonly notFound: "পোস্ট পাওয়া যায়নি";
        readonly slugExists: "এই slug দিয়ে আগেই একটি পোস্ট আছে";
        readonly created: "পোস্ট তৈরি হয়েছে";
        readonly updated: "পোস্ট আপডেট হয়েছে";
        readonly deleted: "পোস্ট মুছে ফেলা হয়েছে";
        readonly published: "পোস্ট প্রকাশিত হয়েছে";
        readonly unpublished: "পোস্ট অপ্রকাশিত হয়েছে";
        readonly retrieved: "পোস্ট পাওয়া গেছে";
        readonly allRetrieved: "পোস্টের তালিকা পাওয়া গেছে";
    };
    readonly general: {
        readonly notFound: "তথ্য পাওয়া যায়নি";
        readonly serverError: "সার্ভারে সমস্যা হয়েছে, পরে আবার চেষ্টা করুন";
        readonly forbidden: "এই কাজের অনুমতি নেই";
        readonly invalidInput: "প্রদত্ত তথ্য সঠিক নয়";
    };
};
