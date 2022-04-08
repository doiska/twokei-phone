import { MessageEvents } from "@typings/messages";
import { RegisterNUIProxy } from "utils/NUI";

RegisterNUIProxy(MessageEvents.FETCH_MESSAGE_CONVERSATIONS)
RegisterNUIProxy(MessageEvents.CREATE_MESSAGE_CONVERSATION);
RegisterNUIProxy(MessageEvents.SEND_MESSAGE);