import { ResourceConfig } from '@typings/config';
import { deepMergeObjects } from 'utils/deepMerge';
import defaultConfig from '../../config.default.json';

export const getConfig = (): ResourceConfig => {
	const resourceName = GetCurrentResourceName();

	const config: ResourceConfig = JSON.parse(LoadResourceFile(resourceName, 'config.json'));

	return deepMergeObjects({}, defaultConfig, config);
};
