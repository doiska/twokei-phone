import React from 'react';

type Props = {
	sourceProfileAvatar: string;
};

export const TweetItemAvatar: React.FC<Props> = ({ sourceProfileAvatar }) => (
	<div className="flex w-16 flex-col gap-2">
		<div
			className="h-16 w-16 rounded-full bg-cover bg-center"
			style={{ backgroundImage: `url(${sourceProfileAvatar})` }}
		/>
	</div>
);
