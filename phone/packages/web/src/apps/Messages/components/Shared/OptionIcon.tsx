import React from 'react';

type IOptionIcon = {
	icon: JSX.Element;
	onClick: () => void;
};

const OptionIcon: React.FC<IOptionIcon> = ({ icon, onClick }) => {
	return (
		<div className="absolute bottom-20 flex w-full items-end justify-end">
			<div className="bg-whatsapp-light-green mr-5 w-fit rounded-full p-4 text-xl text-white" onClick={onClick}>
				{icon}
			</div>
		</div>
	);
};

export default OptionIcon;
