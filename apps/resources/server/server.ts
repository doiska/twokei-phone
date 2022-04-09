import './config';
import 'reflect-metadata';

import { config as ResourceConfig } from './config';

export const config = ResourceConfig;

import './db/pool';
import './players/player.controller';
import './contacts/contacts.controller';
import './messages/messages.controller';

on('onServerResourceStart', (resourceName: string) => {
	if (resourceName === GetCurrentResourceName()) {
		console.log('[TKPhone] Resource successfully loaded.');
	}
});
