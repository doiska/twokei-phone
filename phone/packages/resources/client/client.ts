import './cl_config';

import './cl_main';
import './cl_controls';

import './settings/settings.controller';

emitNet('hot-reload:watch', 'phone');
emitNet('hot-reload:list');

console.log(`[TKPhone] Resource successfully loaded.`);
