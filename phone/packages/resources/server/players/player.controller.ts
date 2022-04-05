import { PhoneEvents } from '@typings/phone';
import { getSource } from 'utils/fivem';
import PlayerService from './player.service';

onNet(PhoneEvents.FETCH_CREDENTIALS, () => {
	const source = getSource();
	const phone = PlayerService.getPlayer(source).phoneNumber;

	console.log(`[PLAYER] Fetch credentials: ${source} | ${phone}`);

	emitNet(PhoneEvents.SEND_CREDENTIALS, source, phone);
});

on('playerJoining', async () => {
	const source = getSource();
	await PlayerService.handleNewPlayer(source);
});

on('playerDropped', async () => {
	const source = getSource();

	try {
		await PlayerService.handlePlayerDisconnect(source);
	} catch (err) {
		console.error(err);
	}
});

on('onServerResourceStart', async (resource: string) => {
	if (resource === GetCurrentResourceName()) {
		setTimeout(() => {
			const online = getPlayers();

			for (const p of online) {
				PlayerService.handleNewPlayer(parseInt(p));
			}
		}, 1000);
	}
});
