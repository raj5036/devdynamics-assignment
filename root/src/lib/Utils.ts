export const ActivityTypes: Array<string> = [
	'PR Open', 
	'PR Merged', 
	'Commits', 
	'PR Reviewed', 
	'PR Comments', 
	'Incident Alerts', 
	'Incidents Resolved'
]

/**
 * Converts a given date string to a formatted date string in the 'en-US' locale.
 *
 * @param {string} date - The date string to be formatted.
 * @return {string} The formatted date string.
 */
export const changeDateFormat = (date: string): string => {
    const options: any = { day: 'numeric', month: 'long' }
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-US', options).replace(/(\d)(st|nd|rd|th)/g, '$1 $2')
}

/**
 * Returns an array containing the elements that are common to both the
 * input arrays.
 *
 * @template T
 * @param {T[]} array1
 * @param {T[]} array2
 * @return {T[]}
 */
export const intersection = <T>(array1: T[], array2: T[]): T[] => {
    return array1.filter(value => array2.includes(value))
}

