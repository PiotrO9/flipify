import { format, parseISO } from 'date-fns'

class FormattingService {
	formatDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
		const dateObj = typeof date === 'string' ? parseISO(date) : date
		return format(dateObj, formatStr)
	}

	formatTime(date: Date | string, formatStr: string = 'HH:mm:ss'): string {
		const dateObj = typeof date === 'string' ? parseISO(date) : date
		return format(dateObj, formatStr)
	}

	formatCurrency(
		amount: number,
		locale: string = 'en-US',
		currency: string = 'USD',
	): string {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
		}).format(amount)
	}

	formatNumber(
		value: number,
		decimalPlaces: number = 2,
		locale: string = 'en-US',
	): string {
		return new Intl.NumberFormat(locale, {
			minimumFractionDigits: decimalPlaces,
			maximumFractionDigits: decimalPlaces,
		}).format(value)
	}

	formatPercentage(
		value: number,
		decimalPlaces: number = 2,
		locale: string = 'en-US',
	): string {
		return new Intl.NumberFormat(locale, {
			style: 'percent',
			minimumFractionDigits: decimalPlaces,
			maximumFractionDigits: decimalPlaces,
		}).format(value)
	}

	capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
	}

	truncate(str: string, maxLength: number, suffix: string = '...'): string {
		return str.length > maxLength ? str.slice(0, maxLength) + suffix : str
	}

	formatBoolean(
		value: boolean,
		trueString: string = 'Yes',
		falseString: string = 'No',
	): string {
		return value ? trueString : falseString
	}

	reverseString(text: string): string {
		return text.split('').reverse().join('')
	}

	toCamelCase(text: string): string {
		return text
			.toLowerCase()
			.replace(/[-_]+/g, ' ')
			.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
				index == 0 ? letter.toLowerCase() : letter.toUpperCase(),
			)
			.replace(/\s+/g, '')
	}

	toKebabCase(text: string): string {
		return text
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '')
	}

	toSlug(text: string): string {
		return text
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '')
			.replace(/-+/g, '-')
			.trim()
	}
}

export const formattingService = new FormattingService()
