import logger from 'logger';

class Service {
	public name: string = 'Unnamed service';
	public logger;

	public constructor(name?: string) {
		this.name = name;
		this.logger = logger.child({
			module: this.name.toUpperCase(),
		});
	}
}

export default Service;
