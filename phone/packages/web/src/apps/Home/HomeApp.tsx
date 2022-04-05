import React from 'react';
import { Link } from 'react-router-dom';

import { useApps } from '@os/hooks/useApp';
import usePhoneTime from '@os/hooks/usePhoneTime';

const HomeApp: React.FC = () => {
	const { apps } = useApps();
	const { now } = usePhoneTime();

	console.log('render');

	const [hour, minute] = now.toLocaleString('pt-BR', { timeStyle: 'short' }).split(':');
	const [dayOfWeek, date] = now.toLocaleString('pt-BR', { year: undefined, dateStyle: 'full' }).split(',');

	return (
		<div className="flex h-full w-full flex-col items-center">
			<div className="flex basis-[60%] flex-col place-content-center text-center [text-shadow:0_4px_8px_rgba(0,0,0,0.70)]">
				<span className="text-7xl">{hour}</span>
				<span className="text-7xl">{minute}</span>
				<span className="text-md">{dayOfWeek}</span>
				<span className="text-md">{date}</span>
			</div>
			<div className="flex basis-[40%] flex-col-reverse">
				<div className="grid grid-cols-4 gap-3 pb-5 text-5xl">
					{apps
						.filter(({ hidden, icon }) => !hidden && icon)
						.map(({ icon: Icon, id, routes: { path } }) => (
							<Link key={id} to={path ?? '/'}>
								{Icon}
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};

export default HomeApp;
