"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactErrors = exports.ContactEvents = exports.ContactLimits = void 0;
var ContactLimits;
(function (ContactLimits) {
    ContactLimits[ContactLimits["number"] = 9] = "number";
    ContactLimits[ContactLimits["avatar"] = 255] = "avatar";
    ContactLimits[ContactLimits["display"] = 35] = "display";
})(ContactLimits = exports.ContactLimits || (exports.ContactLimits = {}));
var ContactEvents;
(function (ContactEvents) {
    ContactEvents["ADD_CONTACT"] = "tkphone:contacts:addContact";
    ContactEvents["GET_CONTACTS"] = "tkphone:contacts:getContacts";
    ContactEvents["UPDATE_CONTACT"] = "tkphone:contacts:updateContact";
    ContactEvents["DELETE_CONTACT"] = "tkphone:contacts:deleteContact";
})(ContactEvents = exports.ContactEvents || (exports.ContactEvents = {}));
var ContactErrors;
(function (ContactErrors) {
    ContactErrors["INVALID_ID"] = "CONTACT_ERROR_INVALID_ID";
    ContactErrors["INVALID_NUMBER"] = "CONTACT_ERROR_INVALID_NUMBER";
    ContactErrors["INVALID_DISPLAY"] = "CONTACT_ERROR_INVALID_DISPLAY";
    ContactErrors["INVALID_URL"] = "CONTACT_ERROR_INVALID_URL";
    ContactErrors["FETCH_FAILED"] = "CONTACT_ERROR_FETCH_FAILED";
    ContactErrors["INSERT_FAILED"] = "CONTACT_ERROR_INSERT_FAILED";
    ContactErrors["UPDATE_FAILED"] = "CONTACT_ERROR_UPDATE_FAILED";
    ContactErrors["DELETE_FAILED"] = "CONTACT_ERROR_DELETE_FAILED";
})(ContactErrors = exports.ContactErrors || (exports.ContactErrors = {}));
