export interface flipcardSetModel {
	id: string
	createdAt: Date
	flipcardCount: number
	baseLanguage: string
	foreignLanguage: string
	name: string
}

export interface flipcardModel {
	Id: string
	NativeWord: string
	ForeignWord: string
	NativeWordExample: string
	ForeignWordExample: string
	LastReviewDate: string
	NextReviewDate: string
	IntervalDays: number
	Ef: number
	AttemptCount: number
}
