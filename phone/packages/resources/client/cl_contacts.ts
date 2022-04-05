import { ContactEvents } from '@typings/contacts';
import { RegisterNUIProxy } from 'utils/NUI';

RegisterNUIProxy(ContactEvents.GET_CONTACTS);
RegisterNUIProxy(ContactEvents.ADD_CONTACT);
RegisterNUIProxy(ContactEvents.UPDATE_CONTACT);
RegisterNUIProxy(ContactEvents.DELETE_CONTACT);
