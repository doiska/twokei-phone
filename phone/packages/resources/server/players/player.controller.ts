import { PhoneEvents } from '@typings/phone';
import { getSource } from 'utils/fivem';
import PlayerService from './player.service';

onNet(PhoneEvents.FETCH_CREDENTIALS, () => {
	const source = getSource();
	const phone = PlayerService.getPlayer(source).phoneNumber;

	emitNet(PhoneEvents.SEND_CREDENTIALS, source, phone);
});
