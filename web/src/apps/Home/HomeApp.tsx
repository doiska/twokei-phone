import { useApps } from '@os/hooks/useApp';
import AppWrapper from '@ui/components/AppWrapper';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
	const { apps } = useApps();

	return (
		<AppWrapper
			style={{
				backgroundImage:
					'url(https://raw.githubusercontent.com/project-error/npwd/master/phone/public/media/backgrounds/minimal.jpg)',
			}}
		>
			<div className="mt-8 flex h-full w-full flex-col items-center px-1">
				<div className="grid grid-cols-5 gap-3 text-5xl">
					{apps.map(({ path, icon: Icon, disable, color, id }) => (
						<Link key={id} to={path}>
							{Icon}
						</Link>
					))}
				</div>
			</div>
		</AppWrapper>
	);
};

export default Home;
