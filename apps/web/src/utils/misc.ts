export const groupBy = <T>(array: T[], predicate: (v: T) => string | number) =>
	array.reduce((acc, value) => {
		(acc[predicate(value)] ||= []).push(value);
		return acc;
	}, {} as Record<string | number, T[]>);
