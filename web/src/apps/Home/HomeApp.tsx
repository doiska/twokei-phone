import { useApps } from '@os/hooks/useApp';
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
	const { apps } = useApps();

	return (
		<div className="mt-8 flex h-full w-full flex-col items-center px-1">
			<div className="grid grid-cols-5 gap-3 text-5xl">
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
