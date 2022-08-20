import { deepMergeObjects } from '@shared/utils/deepMergeObject';

import { ResourceConfig } from "@typings/config";

import defaultConfig from '../../config.default.json';

export const config = (() => {
	const resourceName = GetCurrentResourceName();
	const loadedConfig: ResourceConfig = JSON.parse(LoadResourceFile(resourceName, 'config.json'));
	return deepMergeObjects({}, defaultConfig, loadedConfig);
})();
