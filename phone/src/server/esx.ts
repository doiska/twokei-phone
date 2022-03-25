import { ESXServer } from "fivem-esx-js/server/esx_server";

export let ESX: ESXServer;

emit("esx:getSharedObject", (obj: ESXServer) => (ESX = obj));
