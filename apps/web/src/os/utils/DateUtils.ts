import dayjs from 'dayjs';
//
// const replaceableLocale = {
// 	"poucos segundos":
// }

export const timeTo = (date: Date) => {
	return dayjs(date).toNow(true);
};
