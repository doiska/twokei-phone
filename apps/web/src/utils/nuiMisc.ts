/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerPromiseResp } from '@typings/common';

export const isEnvBrowser = (): boolean =>
	process.env.NODE_ENV === 'development' && !(window as any).invokeNative;

export const getResourceName = () =>
	(window as any).GetParentResourceName
		? (window as any)?.GetParentResourceName()
		: 'tkphone';

export const buildRespObj = <T>(
	data: T,
	status: 'ok' | 'error' = 'ok',
	errorMsg?: string
): ServerPromiseResp<T> => ({
	data,
	status,
	errorMsg,
});
