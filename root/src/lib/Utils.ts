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
