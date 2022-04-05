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

export interface ResourceConfig {
	database: DatabaseConfig;
}
