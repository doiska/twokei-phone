import React from 'react';

import Avatar from '@ui/components/Avatar';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';

type ProfileProps = {
	name: string;
	avatar?: string;
};

const Profile: React.FC<ProfileProps> = ({ name, avatar, children }) => {
	return (
		<Avatar childrenClassName="w-16 my-3">
			<ImageWithDefaultComponentFallback
				loadedImage={avatar}
				fallbackElement={<span className="text-3xl">{name.slice(0, 1).toUpperCase()}</span>}
				className="rounded-full"
			/>
		</Avatar>
	);
};

export { Profile };
