import logger from '../logger';

abstract class Service {
	public logger;

	protected constructor(public name = 'Unamed Service') {
		this.name = name;
		this.logger = logger.child({ module: 'Service' });
	}
}

export default Service;
