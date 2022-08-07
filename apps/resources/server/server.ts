import './config';

import 'reflect-metadata';

import { XiaoDS } from "@db/xiao";

import { TwitterContentDB } from "@apps/twitter/twitter_content/twitterContent.db";

import PlayerService from '@players/player.service';

import { config as ResourceConfig } from './config';


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


	console.log('[PHONE] Phone resource started.');
	setTimeout(async () => {
		const online = getPlayers();

		for (const p of online) {
			console.log(`[PLAYER] Player ${p} is online.`);
			await PlayerService.handleNewPlayer(parseInt(p));
		}


		const newTweet = await TwitterContentDB.createTweet('char1:2a0758ea547fb1dd5b5f8e8e57d24c78cf83ae8d', { content: 'Hello world!', images: [] });
		const tweets = await TwitterContentDB.fetchTweets('char1:2a0758ea547fb1dd5b5f8e8e57d24c78cf83ae7d', 10);

		console.log(`[TWEET] Fetching tweets`, tweets);

	}, 1000);
})();

export const config = ResourceConfig;

// on('onServerResourceStart', (resourceName: string) => {
// 	if (resourceName === GetCurrentResourceName()) {
// 		logger.info('[TKPhone] Resource successfully loaded.');
// 	}
// });
