import React from "react";

import Avatar from "@ui/components/Avatar";
import ImageWithDefaultComponentFallback from "@ui/components/ImageWithComponentFallback";

type ProfileProps = {
	name: string;
	avatar?: string;
};

const ProfileHolder: React.FC = ({ children }) => {
	return <div className="flex w-full basis-[40%] flex-col items-center justify-center gap-2 p-3">{children}</div>;
};

const CallProfile: React.FC<ProfileProps> = ({ name, avatar }) => {
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

export { ProfileHolder, CallProfile };