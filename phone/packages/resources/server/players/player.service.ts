import { Player } from './player.class';
import Collection from '@discordjs/collection';

class _PlayerService {
	private readonly playersBySource: Collection<number, Player>;
	private readonly playersByIdentifier: Collection<string, Player>;
	// private readonly playerDB: PlayerRepo;

	constructor() {
		this.playersBySource = new Collection();
		this.playersByIdentifier = new Collection();
		// this.playerDB = new PlayerRepo();

		console.info('Player Service started.');
	}

	registerPlayer(source: number, player: Player) {
		this.playersBySource.set(source, player);
		this.playersByIdentifier.set(player.identifier, player);
	}

	unRegisterPlayer(source: number) {
		const identifier = this.playersBySource.get(source).identifier;
		this.playersBySource.delete(source);
		this.playersByIdentifier.delete(identifier);
	}

	getPlayer(source: number): Player | null {
		const player = this.playersBySource.get(source);

		if (!player) return null;

		return player;
	}

	getPlayerByIdentifier(identifier: string): Player | null {
		const player = this.playersByIdentifier.get(identifier);

		if (!player) return null;

		return player;
	}

	getIdentifierByPlayer(source: number): string {
		return this.getPlayer(source).identifier;
	}

	async getIdentifierByPhone(phone: string, fetch?: boolean): Promise<string | null> {
		const onlinePlayer = this.playersBySource.find((player) => player.phoneNumber === phone);

		if (onlinePlayer) return onlinePlayer.identifier;
		if (fetch) {
		}

		return null;
	}
}

export default new _PlayerService();
