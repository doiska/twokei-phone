import './cl_config';

import './cl_main';
import './cl_controls';
import './cl_contacts';
import './cl_messages';
import './cl_calls';

import './settings/settings.controller';

emitNet('hot-reload:watch', 'phone');
emitNet('hot-reload:list');

console.log(`[TKPhone] Resource successfully loaded.`);
