import './config';
import { config as ResourceConfig } from './config';

import 'reflect-metadata';

import './db/xiao';

export const config = ResourceConfig;

import './db/pool';
import './players/player.controller';
import './apps/contacts/contacts.controller';
import './apps/messages/messages.controller';
import './apps/calls/calls.controller';

import logger from './logger';

on('onServerResourceStart', (resourceName: string) => {
	if (resourceName === GetCurrentResourceName()) {
		logger.info('[TKPhone] Resource successfully loaded.');
	}
});
