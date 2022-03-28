interface DatabaseConfig {
	playerTable: string;
	profileQueries: boolean;
}

export interface ResourceConfig {
	database: DatabaseConfig;
}
