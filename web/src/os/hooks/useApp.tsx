import { useCallback, useMemo } from 'react';
import { IApp, Apps, AllApps } from '@apps/Apps';

export const useApps = () => {
	const apps: IApp[] = useMemo(() => {
		return Apps.map((app) => {
			return {
				...app,
			};
		});
	}, [AllApps]); //TODO: theme, icon

	const getApp = useCallback((id: string): IApp | null => apps.find((a) => a.id === id) || null, [apps]);

	return { apps, getApp };
};

export const useApp = (id: string): IApp | null => {
	const { getApp } = useApps();
	return getApp(id);
};
