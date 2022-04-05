import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { config } from 'server';
import { pool } from './pool';

const RESOURCE_NAME = GetCurrentResourceName();

class _DBInterface {
	private async _internalQuery(query: string, values?: any[]) {
		try {
			if (!values) values = [];

			if (config.database.profileQueries) {
				const startTime = process.hrtime();

				ScheduleResourceTick(RESOURCE_NAME);

				const res = pool.promise().execute(query, values);
				const timeMs = process.hrtime(startTime)[1] / 1e6;

				console.log(`[db] ${query} ${values.join(', ')} ${timeMs}ms`);
				return res;
			}

			ScheduleResourceTick(RESOURCE_NAME);
			return pool.promise().execute(query, values);
		} catch (e) {
			console.log(`Error executing ${query} with values ${values}.`);
		}
	}

	public async _rawQuery(query: string, values?: any[]) {
		return this._internalQuery(query, values);
	}

	public async exec(query: string, values?: any[]) {
		const [res] = await this._internalQuery(query, values);
		return (<ResultSetHeader>res).affectedRows;
	}

	public async insert(query: string, values?: any[]) {
		const [res] = await this._internalQuery(query, values);
		return (<ResultSetHeader>res).insertId;
	}

	public async update(query: string, values?: any[]) {
		return this.exec(query, values);
	}

	public async remove(query: string, values?: any[]) {
		return this.exec(query, values);
	}

	public async fetch<T = unknown>(query: string, values?: any[]): Promise<T[]> {
		let [rows] = await this._internalQuery(query, values);

		console.log(`[db] ${query} ${values.join(', ')}`);
		console.log(`[db] ${JSON.stringify(rows)}`);

		return <T[]>(<unknown>rows);
	}
}

export default new _DBInterface();
