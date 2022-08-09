"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("@typings/messages");
const NUI_1 = require("./utils/NUI");
(0, NUI_1.RegisterNUIProxy)(messages_1.MessageEvents.FETCH_MESSAGE_CONVERSATIONS);
(0, NUI_1.RegisterNUIProxy)(messages_1.MessageEvents.CREATE_MESSAGE_CONVERSATION);
(0, NUI_1.RegisterNUIProxy)(messages_1.MessageEvents.SEND_MESSAGE);
