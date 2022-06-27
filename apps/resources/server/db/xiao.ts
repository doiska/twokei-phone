import { Sequelize } from 'sequelize';
import mysql from 'mysql2';
import { DataSource } from 'typeorm';
import path from 'path';

const Xiao = new Sequelize({
	host: '0.0.0.0',
	username: 'root',
	password: 'doiska',
	port: 3306,
	database: 'twokei',
	dialect: 'mysql',
	dialectModule: mysql,

	query: {
		raw: true,
		benchmark: true,
		logging: true,
		plain: true,
	},
});

const __dirname = path.resolve();

const XiaoDS = new DataSource({
	type: 'mariadb',
	database: 'twokei',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'doiska',
	logging: true,
	entities: [__dirname + '/**/*.entity{.js}'],
});

XiaoDS.initialize()
	.then(() => console.log('XiaoDS initialized'))
	.catch((err) => console.log(err));

(async () => {
	try {
		await Xiao.authenticate();
		console.log('CONNECTED');
	} catch (e) {
		console.error(e);
	}
})();

export default Xiao;
