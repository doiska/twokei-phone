import mysql from 'mysql2';

const mysqlConnectionString = GetConvar('mysql_connection_string', 'none');

if (mysqlConnectionString === 'none') {
	console.log('[db] No connection string provided');
	throw new Error('No conection string provided.');
}

function generateConectionPool() {
	try {
		const config = {
			uri: mysqlConnectionString,
		};

		const pool = mysql.createPool({
			connectTimeout: 60000,
			...config,
		});

		console.log(pool ? 'Connected to database' : 'Failed to connect to database');

		return pool;
	} catch (error) {
		console.log(`MySQL connection error: ${error}`);
	}
}

export const pool = generateConectionPool();
