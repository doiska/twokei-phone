import { useQuery } from "@tanstack/react-query";
import fetchNui from "@utils/fetchNui";

export const useNuiCallbackFetch = <Response = any, Data = any>(eventName: string, data?: Data, mock?: Response) => {
	return useQuery([eventName], () => fetchNui(eventName, data, mock));
};