import React from 'react';
import { useGlobalWallpaper } from "@os/hooks/useGlobalWallpaper";
import { useSetAppWallpaper } from "@os/hooks/useAppWallpaper";

const Wrapper: React.FC = ({ children }) => {
	return <div className="flex w-full basis-[50%] flex-col">{children}</div>;
};

const MainHeader: React.FC<{ className?: string }> = ({ className, children }) => {
	return (
		<div className={`bg-whatsapp-teal-dark flex basis-[13%] justify-center text-white ${className ?? ''}`}>{children}</div>
	);
};

const MainBody: React.FC<{ style?: React.CSSProperties; className?: string }> = ({ children, className, style }) => {

	const setWallpaper = useSetAppWallpaper();
	setWallpaper('bg-white');

	return (
		<div className={`flex h-full w-full flex-col ${className ?? ''}`} style={style ?? {}}>
			{children}
		</div>
	);
};

export { Wrapper, MainHeader, MainBody };
