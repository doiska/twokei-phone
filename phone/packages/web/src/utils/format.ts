export const isValidPhone = (content: string) => content.match(/^[0-9]*$/);

export const formatNumber = (content: string) => {
	if (!content) return '';

	const clean = content.replace(/[^\d]/g, '');
	const cleanLength = content.length - 1;

	const halfLength = Math.round(cleanLength / 2);

	if (cleanLength < 5) return clean;

	const firstHalf = clean.substring(0, halfLength);
	const secondHalf = clean.substring(halfLength, cleanLength);

	return `${firstHalf}-${secondHalf}`;
};
