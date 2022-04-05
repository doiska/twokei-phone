export const isValidPhone = (content: string) => content.match(/^[0-9]*$/);

export const formatNumber = (content: string) => {
	if (!content) return '';

	const clean = content.replace(/[^\d]/g, '');
	const cleanLength = content.length - 1;

	const halfLength = Math.round(cleanLength / 2);

	console.log(halfLength);

	if (cleanLength < 5) return clean;

	const firstHalf = clean.substring(0, halfLength);

	console.log(cleanLength, halfLength);
	console.log(`First half ${firstHalf}`);

	const secondHalf = clean.substring(halfLength, cleanLength);
	console.log(`Second half ${secondHalf}`);

	return `${firstHalf}-${secondHalf}`;
};
