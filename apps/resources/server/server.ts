import './config';
import 'reflect-metadata';

import './db/xiao';

import { config as ResourceConfig } from './config';

export const config = ResourceConfig;

import './db/pool';
import './players/player.controller';
import './apps/contacts/contacts.controller';
import './apps/messages/messages.controller';

on('onServerResourceStart', (resourceName: string) => {
	if (resourceName === GetCurrentResourceName()) {
		console.log('[TKPhone] Resource successfully loaded.');
	}
});
