import React, { useState } from 'react';

import { SettingsItemBody, SettingsItemLabel, SettingsItemOption } from '../Settings.styles';

type Props = {
	label: string;
	icon: JSX.Element;
	value: boolean | string | number;
	onCommit: (event: React.SyntheticEvent | Event, value: any) => void;
};

const SettingsItemRange: React.FC<Props> = ({ label, icon, value, onCommit }) => {
	const [range, setRange] = useState<string>(value as string);

	return (
		<SettingsItemBody icon={icon}>
			<SettingsItemLabel label={label} value={range} />
			<SettingsItemOption>
				<input
					type="range"
					min={0}
					max={100}
					className="toggle-primary"
					onChange={(e) => setRange(e.target.value)}
					onMouseUp={(e) => onCommit(e, range)}
				/>
			</SettingsItemOption>
		</SettingsItemBody>
	);
};

const SettingsItemToggle: React.FC<Props> = ({ label, icon, value, onCommit }) => {
	return (
		<SettingsItemBody icon={icon}>
			<SettingsItemLabel label={label} />
			<SettingsItemOption>
				<input
					className="toggle self-end"
					type="checkbox"
					checked={value === 'true' || value === true}
					onChange={(e) => onCommit(e, e.target.checked)}
				/>
			</SettingsItemOption>
		</SettingsItemBody>
	);
};

type PropsWithOptions = Props & {
	options: {
		label: string;
		value: string;
	}[];
};

const SettingsItemSelect: React.FC<PropsWithOptions> = ({ label, icon, value, onCommit, options }) => {
	console.log(value);
	return (
		<SettingsItemBody icon={icon}>
			<SettingsItemLabel label={label} />
			<SettingsItemOption>
				<select
					className="select select-bordered w-full max-w-xs"
					value={value as string}
					onChange={(e) => onCommit(e, e.target.value)}
				>
					{options.map(({ label: optLabel, value: optValue }) => (
						<option value={optValue} key={optLabel}>
							{optLabel}
						</option>
					))}
				</select>
			</SettingsItemOption>
		</SettingsItemBody>
	);
};

export { SettingsItemRange, SettingsItemToggle, SettingsItemSelect };
