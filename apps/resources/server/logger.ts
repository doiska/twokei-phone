import { config } from './server';
import { createLogger, transports, format } from 'winston';

const manualColorize = (str: string): string => `[\x1b[35m${str}\x1b[0m]`;

const formatLogs = (log: any): string => {
	if (log.module) return `${log.label} ${manualColorize(log.module)} [${log.level}]} ${log.message}`;

	return `${log.label} [${log.level}]: ${log.message}`;
};

const logger = createLogger({
	silent: !config.debug.enabled ?? false,
	transports: [
		new transports.Console({
			level: config.debug.level ?? 'info',
			format: format.combine(
				format.label({ label: '[TKPhone]' }),
				format.colorize({ all: true }),
				format.printf(formatLogs)
			),
		}),
	],
});

export default logger;
