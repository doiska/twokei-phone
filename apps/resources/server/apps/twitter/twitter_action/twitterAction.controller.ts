import { toggleAction } from "@apps/twitter/twitter_action/twitterAction.service";
import { onNetPromise } from "@lib/onNetPromise";

import { TwitterEvents, ToggleAction } from "@typings/twitter";

onNetPromise<ToggleAction, void>(TwitterEvents.TOGGLE_ACTION, toggleAction);