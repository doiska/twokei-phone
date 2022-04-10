import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

const Xiao = new Sequelize({
	host: 'localhost',
	username: 'root',
	password: 'pwd',
	database: 'twokei',
	dialect: 'mysql',
	dialectModule: mysql,
	query: {
		raw: true,
		benchmark: true,
		logging: true,
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
