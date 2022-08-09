"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contacts_1 = require("@typings/contacts");
const NUI_1 = require("./utils/NUI");
(0, NUI_1.RegisterNUIProxy)(contacts_1.ContactEvents.GET_CONTACTS);
(0, NUI_1.RegisterNUIProxy)(contacts_1.ContactEvents.ADD_CONTACT);
(0, NUI_1.RegisterNUIProxy)(contacts_1.ContactEvents.UPDATE_CONTACT);
(0, NUI_1.RegisterNUIProxy)(contacts_1.ContactEvents.DELETE_CONTACT);
