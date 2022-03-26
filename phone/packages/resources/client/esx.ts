import { ESXClient } from "fivem-esx-js/client/esx_client";

export let ESX: ESXClient;

emit("esx:getSharedObject", (obj: ESXClient) => (ESX = obj));
