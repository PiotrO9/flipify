// services/validationService.ts

import { CountryCode } from '~/types/enums/postal-code-patterns'

class ValidationService {
	isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	validatePhoneNumber(
		phoneNumber: string,
		countryCode: CountryCode,
	): boolean {
		switch (countryCode) {
			case CountryCode.US:
				const usCanadaRegex =
					/^(?:\+1)?[-.\s]?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/
				return usCanadaRegex.test(phoneNumber)
			case CountryCode.Numeric:
				const numericRegex = /^\d+$/
				return numericRegex.test(phoneNumber)
			case CountryCode.Poland:
				const polandRegex =
					/^(?:\+48)?[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/
				return polandRegex.test(phoneNumber)
			default:
				return false
		}
	}

	isValidPassword(password: string): boolean {
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
		return passwordRegex.test(password)
	}

	isValidURL(url: string): boolean {
		try {
			new URL(url)
			return true
		} catch (_) {
			return false
		}
	}

	isValidDate(dateString: string): boolean {
		const date = new Date(dateString)
		return !isNaN(date.getTime())
	}

	isNumberInRange(value: number, min: number, max: number): boolean {
		return value >= min && value <= max
	}

	isValidFileType(fileName: string, allowedTypes: string[]): boolean {
		const extension = fileName.split('.').pop()?.toLowerCase()
		return extension ? allowedTypes.includes(extension) : false
	}

	customValidator(
		value: any,
		validationFunction: (value: any) => boolean,
	): boolean {
		return validationFunction(value)
	}

	validatePolishNIP(nip: string): boolean {
		const cleanNIP = nip.replace(/\D/g, '')

		if (cleanNIP.length !== 10) {
			return false
		}

		const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7]

		let checksum = 0

		for (let i = 0; i < weights.length; i++) {
			checksum += parseInt(cleanNIP[i], 10) * weights[i]
		}

		const checkDigit = parseInt(cleanNIP[9], 10)

		return checksum % 11 === checkDigit
	}
}

export const validationService = new ValidationService()
