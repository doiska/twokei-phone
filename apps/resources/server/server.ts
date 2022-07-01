import './config';
import { XiaoDS } from '@db/xiao';

import { config as ResourceConfig } from './config';
import logger from './logger';

import 'reflect-metadata';
import PlayerService from 'players/player.service';

(async () => {
	await XiaoDS.initialize()
		.then(async () => {
			console.log('XiaoDS initialized.');
		})
		.catch((err) => console.log(err));

	await import('./players/player.controller');
	await import('./apps/contacts/contacts.controller');
	await import('./apps/messages/messages.controller');
	await import('./apps/calls/calls.controller');
	await import('./apps/photo/photo.controller');
	await import('./apps/twitter/twitter.controller');

	console.log('[PHONE] Phone resource started.');
	setTimeout(() => {
		const online = getPlayers();

		for (const p of online) {
			console.log(`[PLAYER] Player ${p} is online.`);
			PlayerService.handleNewPlayer(parseInt(p));
		}
	}, 1000);
})();

export const config = ResourceConfig;

// on('onServerResourceStart', (resourceName: string) => {
// 	if (resourceName === GetCurrentResourceName()) {
// 		logger.info('[TKPhone] Resource successfully loaded.');
// 	}
// });
