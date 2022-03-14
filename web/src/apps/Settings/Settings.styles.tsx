import React from 'react';

const SettingsItemBody: React.FC<{ icon: JSX.Element }> = ({ children, icon }) => {
	return (
		<>
			<div className="w-100% my-1 flex flex-row items-center px-2">
				<span className="basis-[10%]">{icon}</span>
				{children}
			</div>
		</>
	);
};

const SettingsItemLabel: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
	return (
		<div className="flex flex-1 flex-col">
			<span className="label-text">{label}</span>
			{value ? <label className="text-sm text-blue-300">{value}</label> : ''}
		</div>
	);
};

const SettingsItemOption: React.FC = ({ children }) => {
	return <div className="basis-[35%] text-right">{children}</div>;
};

export { SettingsItemBody, SettingsItemLabel, SettingsItemOption };
