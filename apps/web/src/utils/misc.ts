export const groupBy = <T>(array: T[], predicate: (v: T) => string | number) =>
	array.reduce((acc, value) => {
		(acc[predicate(value)] ||= []).push(value);
		return acc;
	}, {} as Record<string | number, T[]>);

export const removeDupe = <T>(array: T[]) => {
	const seen = new Set<T>();
	return array.filter((item) => {
		if (seen.has(item)) {
			return false;
		}
		seen.add(item);
		return true;
	});
};