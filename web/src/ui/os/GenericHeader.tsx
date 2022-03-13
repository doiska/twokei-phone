import React from 'react';

type Props = {
	title: string;
	description?: string;
};

const GenericHeader: React.FC<Props> = ({ children, title, description }) => {
	return (
		<div className="flex basis-[10%] flex-col p-3 text-gray-200">
			<span className="text-lg">{title}</span>
			<span className="text-sm">{description}</span>
		</div>
	);
};

export default GenericHeader;
