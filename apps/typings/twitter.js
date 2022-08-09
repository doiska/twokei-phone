"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterEvents = void 0;
var TwitterEvents;
(function (TwitterEvents) {
    TwitterEvents["FETCH_TWEETS"] = "tkphone:twitter:fetch";
    TwitterEvents["FETCH_TWEETS_WITH_FILTER"] = "tkphone:twitter:fetch:with:filter";
    // CREATE_PROFILE = 'tkphone:twitter:create:profile',
    TwitterEvents["GET_PROFILE"] = "tkphone:twitter:get:or:create:profile";
    TwitterEvents["UPDATE_OR_CREATE_PROFILE"] = "tkphone:twitter:update_create:profile";
    TwitterEvents["CREATE_TWEET"] = "tkphone:twitter:create:tweet";
    TwitterEvents["BROADCAST_TWEET"] = "tkphone:twitter:broadcast:tweet";
    TwitterEvents["DELETE_TWEET"] = "tkphone:twitter:delete:tweet";
    TwitterEvents["TOGGLE_ACTION"] = "tkphone:twitter:toggle:action";
    TwitterEvents["REPORT_TWEET"] = "tkphone:twitter:report:tweet";
})(TwitterEvents = exports.TwitterEvents || (exports.TwitterEvents = {}));
