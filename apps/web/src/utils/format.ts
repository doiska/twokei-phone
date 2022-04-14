import { ContactLimits } from '@typings/contacts';

export const isValidPhone = (content: string) => content.match(/^[0-9]*$/);

export const formatNumber = (content: string) => {
	if (!content) return '';

	const clean = content.replace(/[^\d]/g, '').substring(0, ContactLimits.number);

	const regex = /(\d{0,3})(\d{0,3})(\d{0,3})/g;

	const result = clean.replace(regex, (_, a, b, c) => {
		const res = [a, b, c].filter((c) => c);
		return res.join('-');
	});

	return result;
};

export const filterContactDisplay = (content: string) => {
	if (!content) return;

	const limit = ContactLimits.display;

	return content.length > limit ? `${content.substring(0, limit)}...` : content;
};
