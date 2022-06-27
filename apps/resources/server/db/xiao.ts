import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

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

(async () => {
	try {
		await Xiao.authenticate();
		console.log('CONNECTED');
	} catch (e) {
		console.error(e);
	}
})();

export default Xiao;
