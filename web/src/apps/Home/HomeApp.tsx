import React from 'react';
import { Link } from 'react-router-dom';

import { useApps } from '@os/hooks/useApp';

const Home: React.FC = () => {
	const { apps } = useApps();

	return (
		<div
			className="flex h-full w-full flex-col items-center"
			style={{ background: 'url(media/background/default.jpg)', backgroundSize: 'cover' }}
		>
			<div className="mt-8 grid grid-cols-5 gap-3 px-1  text-5xl">
				{apps
					.filter(({ hidden, icon }) => !hidden && icon)
					.map(({ icon: Icon, id, parent: { path } }) => (
						<Link key={id} to={path}>
							{Icon}
						</Link>
					))}
			</div>
		</div>
	);
};

export default Home;
