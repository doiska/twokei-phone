import logger from '../logger';

class Service {
	public name = 'Unnamed service';
	public logger;

	public constructor(name?: string) {
		this.name = name;

		this.logger = logger.child({ module: 'Service' });
	}
}

export default Service;
