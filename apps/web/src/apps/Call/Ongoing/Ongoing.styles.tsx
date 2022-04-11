import React, { useEffect } from 'react';
import { IoCall } from 'react-icons/io5';

import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

const Container: React.FC = ({ children }) => {
	const setGlobalWallpaper = useSetGlobalWallpaper();

	useEffect(() => {
		setGlobalWallpaper('backdrop-blur-md');
	}, []);

	return <div className="flex h-full w-full flex-col items-center gap-6">{children}</div>;
};

type ProfileProps = {
	name: string;
	avatar?: string;
};

const ProfileHolder: React.FC = ({ children }) => {
	return <div className="flex w-full basis-[40%] flex-col items-center justify-center gap-2 p-3">{children}</div>;
};

const Profile: React.FC<ProfileProps> = ({ name, avatar }) => {
	return (
		<>
			<Avatar childrenClassName="w-20 my-3">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					fallbackElement={<span className="text-3xl">{name.slice(0, 1).toUpperCase()}</span>}
					className="rounded-full"
				/>
			</Avatar>

			<div className="text-md flex flex-col items-center">
				<span className="text-green-400">Em chamada com</span>
				<span className="text-white">{name}</span>
			</div>
		</>
	);
};

type DetailProps = React.HTMLAttributes<HTMLDivElement> & {
	formattedTime: string;
};

const Details: React.FC<DetailProps> = ({ formattedTime, className, ...props }) => {
	return (
		<div className={`text-md flex w-full flex-row items-center justify-center gap-2 ${className}`} {...props}>
			<IoCall />
			<span>{formattedTime}</span>
		</div>
	);
};

const ButtonGrid: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
	<div className={`flex flex-row items-center justify-center gap-4 rounded-full ${className}`} {...props}>
		{children}
	</div>
);
const Button: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
	<div
		className={`flex cursor-pointer items-center justify-around fill-white text-3xl text-white ${className} text-center`}
		{...rest}
	>
		{children}
	</div>
);

const ButtonWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
	<div className={`flex flex-row items-center justify-center gap-2 ${className}`} {...props}>
		{children}
	</div>
);

const Fill = () => {
	return <span className="flex-1" />;
};

export { Container, ProfileHolder, Details, Profile, ButtonGrid, Button, ButtonWrapper, Fill };
