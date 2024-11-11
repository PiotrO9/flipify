export interface flipcardSetModel {
	id: string
	createdAt: Date
	flipcardCount: number
	baseLanguage: string
	foreignLanguage: string
	name: string
}

export interface flipcardModel {
	id: string
	nativeWord: string
	foreignWord: string
	nativeWordExample: string
	foreignWordExample: string
	lastReviewDate: string
	nextReviewDate: string
	intervalDays: number
	ef: number
	attemptCount: number
}
