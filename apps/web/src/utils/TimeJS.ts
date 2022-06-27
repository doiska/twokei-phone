import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale('pt-br');
dayjs.updateLocale('pt-br', {
	relativeTime: {
		future: '%s',
		past: '%s atrás',
		s: '%d segundos',
		m: '%d minutos',
		mm: '%d minutos',
		h: '%d hora',
		hh: '%d horas',
		d: '%d dia',
		dd: '%d dias',
		M: '%d mês',
		MM: '%d meses',
		y: '%d ano',
		yy: '%d anos',
	},
});
