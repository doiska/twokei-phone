import './config';
import { config as ResourceConfig } from './config';

import 'reflect-metadata';

import './db/xiao';
import './db/pool';
import './players/player.controller';
import './apps/contacts/contacts.controller';
import './apps/messages/messages.controller';
import './apps/calls/calls.controller';
import './apps/photo/photo.controller';
import './apps/twitter/twitter.controller';

import logger from './logger';

export const config = ResourceConfig;

on('onServerResourceStart', (resourceName: string) => {
	if (resourceName === GetCurrentResourceName()) {
		logger.info('[TKPhone] Resource successfully loaded.');
	}
});
