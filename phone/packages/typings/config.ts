interface Phone {
	toggleKey: string;
	toggleCommand: string;
}

interface DatabaseConfig {
	identifier: string | 'steam' | 'discord' | 'ip' | 'license' | 'phone';
	remapIdentifier: string;
	players_table: string;
	profileQueries: boolean;
}

interface DebugConfig {
	enabled: boolean;
	level: 'info' | 'verbose' | 'debug' | 'silly';
}

export interface ResourceConfig {
	phone: Phone;
	database: DatabaseConfig;
	debug: DebugConfig;
}
