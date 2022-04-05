import { Player } from './player.class';
import Collection from '@discordjs/collection';
import { PlayerDB } from './player.db';
import { findOrGeneratePhoneNumber } from 'phone/helper';
import { PhoneEvents } from '@typings/phone';
import { getPlayerGameLicense } from 'utils/fivem';

class _PlayerService {
	private readonly playersBySource: Collection<number, Player>;
	private readonly playersByIdentifier: Collection<string, Player>;
	private readonly playerDB: PlayerDB;

	constructor() {
		this.playersBySource = new Collection();
		this.playersByIdentifier = new Collection();
		this.playerDB = new PlayerDB();

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
			const result = await this.playerDB.fetchIdentifierByPhone(phone).catch((err) => {
				console.error(`Could not fetch player identifier by phone number: ${err}`);
				return null;
			});

			return result;
		}

		return null;
	}

	async handleNewPlayer(source: number) {
		const identifier = getPlayerGameLicense(source);

		const userName = GetPlayerName(source.toString());
		console.log(`Loading player ${userName}.`);

		const phoneNumber = await findOrGeneratePhoneNumber(identifier);

		const newPlayer = new Player({ source, identifier, userName, phoneNumber });

		this.registerPlayer(source, newPlayer);

		console.log(`New player loaded`, newPlayer);

		emitNet(PhoneEvents.SET_PLAYER_LOADED, source, true);
	}

	async handlePlayerDisconnect(source: number) {
		const player = this.getPlayer(source);

		if (!player) return;

		this.unRegisterPlayer(source);

		console.log(`Player disconnected`, player);
	}
}

export default new _PlayerService();
