import React from 'react';
import { GiBirdTwitter } from "react-icons/all";

import { TwitterProfile } from "@typings/twitter";
import ImageWithDefaultComponentFallback from "@ui/components/ImageWithComponentFallback";

type Props = {
	profile?: TwitterProfile;
}

const Header = ({ profile }: Props) => {
	return (
		<div className={'flex justify-between items-center w-full h-[5%]'}>
			<div className={'w-24 h-24 rounded-full'}>
				<ImageWithDefaultComponentFallback
					fallbackElement={<span>{profile?.username.slice(0, 1) ?? ''}</span>}
					src={profile?.avatar}
				/>
			</div>
			<span className={'flex items-center justify-center'}>
				<GiBirdTwitter/>
			</span>
		</div>
	);
};

export { Header };
