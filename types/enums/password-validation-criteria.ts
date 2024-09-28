export type ValidationCriteria = {
    minLength?: number;
    maxLength: number;
    requireUppercase?: boolean;
    requireLowercase: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
    requiredChars?: string[];
};
