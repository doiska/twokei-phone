import React, { useState } from 'react';

import { HTMLAttributes } from '@typings/core';

export const GalleryItem: React.FC<
	{ checked?: boolean; content: string } & HTMLAttributes
> = ({ content, className, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<img
			{...rest}
			src={content}
			onLoad={() => setLoaded(true)}
			className={`h-auto transition-all ${className}`}
			style={{ opacity: loaded ? 1 : 0 }}
			alt={content}
		/>
	);
};
