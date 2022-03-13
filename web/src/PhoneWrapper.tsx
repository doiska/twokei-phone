import React from 'react';

const PhoneWrapper: React.FC = ({ children }) => {
	return (
		<div className="relative h-screen w-screen">
			<div className="absolute right-0 h-phone w-phone" style={{ position: 'fixed' }}>
				<div
					className="absolute z-[999] h-phone w-phone"
					style={{
						backgroundImage:
							'url("https://github.com/project-error/npwd/blob/master/phone/public/media/frames/default.png?raw=true")',
					}}
				>
					<div
						id="phone"
						className="absolute bottom-[100px] left-[50px] right-[50px] top-[100px] flex flex-col overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhoneWrapper;
