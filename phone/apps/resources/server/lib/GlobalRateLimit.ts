interface Limiter {
	limiters: Map<number, boolean>;
	options: LimiterOptions;
}

export interface LimiterOptions {
	rateLimit?: number;
}

export class GlobalRateLimit {
	private rateLimits: Map<string, Limiter> = new Map();
	private timeBetweenRequests: number;

	constructor(timeBetweenRequests: number) {
		this.timeBetweenRequests = timeBetweenRequests;
	}

	registerNewEvent(event: string, options?: LimiterOptions) {
		this.rateLimits.set(event, { limiters: new Map(), options });
	}

	isPlayerLimited(event: string, source: number) {
		return !!this.rateLimits.get(event).limiters.get(source);
	}

	setPlayerRateLimited(event: string, source: number) {
		const rateLimiter = this.rateLimits.get(event);
		rateLimiter.limiters.set(source, true);

		setTimeout(() => {
			rateLimiter.limiters.delete(source);
		}, rateLimiter?.options?.rateLimit || this.timeBetweenRequests);
	}
}
