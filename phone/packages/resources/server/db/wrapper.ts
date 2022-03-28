import { pool } from './pool';

const RESOURCE_NAME = GetCurrentResourceName();

class _DBInterface {
	private async _interalQuery(query: string, values?: any[]) {
		try {
			if (!values) values = [];

			return pool.execute(query, values);
		} catch (e) {
			console.log(`Error executing ${query} with values ${values}.`);
		}
	}
}
