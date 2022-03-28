import mysql from 'mysql2';

const mysqlConnectionString = GetConvar('', 'none');

if (mysqlConnectionString === 'none') {
	console.log('[db] No connection string provided');
	throw new Error('No conection string provided.');
}

function generateConectionPool() {
	try {
		const config = {
			uri: mysqlConnectionString,
		};

		return mysql.createPool({
			connectTimeout: 60000,
			...config,
		});
	} catch (error) {
		console.log(`MySQL connection error: ${error}`);
	}
}

export const pool = generateConectionPool();
