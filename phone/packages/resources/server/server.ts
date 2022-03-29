import './config';

import { config as ResourceConfig } from './config';

export const config = ResourceConfig;

import './db/pool';
import './players/player.controller';

on('onServerResourceStart', (resourceName: string) => {
	if (resourceName === GetCurrentResourceName()) {
		console.log('[TKPhone] Resource successfully loaded.');
	}
});
