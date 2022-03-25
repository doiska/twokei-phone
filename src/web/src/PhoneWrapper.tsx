import React from 'react';

import { usePhoneVisibility } from '@os/hooks/usePhoneVisibility';

import { useSettings } from '@apps/Settings/hooks/useSettings';

const PhoneWrapper: React.FC = ({ children }) => {
	const [settings] = useSettings();
	const { bottom } = usePhoneVisibility();

	return (
		<div className="relative h-screen w-screen">
			<div
				className="h-phone w-phone absolute right-0"
				style={{
					position: 'fixed',
					transformOrigin: 'right bottom',
					transform: `scale(${settings.zoom})`,
					bottom,
				}}
			>
				<div
					className="h-phone w-phone absolute z-[999]"
					style={{
						backgroundImage: `url("/media/frames/${settings.case.value}")`,
					}}
				>
					<div
						id="phone"
						className="absolute bottom-[100px] left-[50px] right-[50px] top-[100px] overflow-hidden rounded-2xl bg-cover bg-center"
						style={{
							backgroundImage: `url(/media/background/${settings.wallpaper.value})`,
						}}
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhoneWrapper;
