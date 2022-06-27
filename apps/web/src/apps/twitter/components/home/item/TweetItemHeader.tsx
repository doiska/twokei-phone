import React from 'react';

import { timeTo } from '@os/utils/DateUtils';

export const TweetItemHeader: React.FC<{
	sourceProfileName: string;
	sourceProfileUsername: string;
	createdAt: string;
}> = ({ sourceProfileName, sourceProfileUsername, createdAt }) => {
	console.log(`Created at: ${createdAt}`, new Date(createdAt));

	return (
		<h2 className="text-twitter-dark-gray flex flex-row gap-2">
			<strong className={'text-black dark:text-white'}>
				{sourceProfileName}
			</strong>
			<span>@{sourceProfileUsername}</span>
			<span>•</span>
			<span>{timeTo(new Date(createdAt))}</span>
		</h2>
	);
};
