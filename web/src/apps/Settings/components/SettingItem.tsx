import React, { useState } from 'react';

import { SettingsItemBody, SettingsItemLabel, SettingsItemOption } from '../Settings.styles';

type Props = {
	label: string;
	icon: JSX.Element;
	value: boolean | string | number;
	onCommit: (event: React.SyntheticEvent | Event, value: unknown) => void;
};

const SettingsItemRange: React.FC<Props & { min?: number; max?: number; step?: number }> = ({
	label,
	icon,
	value,
	onCommit,
	min,
	max,
	step,
}) => {
	const [range, setRange] = useState<string>(value as string);

	return (
		<SettingsItemBody icon={icon}>
			<SettingsItemLabel label={label} value={range} />
			<SettingsItemOption>
				<input
					type="range"
					min={min ?? 0}
					max={max ?? 100}
					step={step ?? 1}
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
	onOpen(e: unknown): void;
	options: Record<string, string>[];
};

const SettingsItemSelect: React.FC<PropsWithOptions> = ({ label, icon, value, onCommit, onOpen, options }) => {
	return (
		<SettingsItemBody icon={icon}>
			<SettingsItemLabel label={label} />
			<SettingsItemOption>
				<div
					className="border-1 border-blue"
					onClick={() => {
						console.log('click');
						onOpen?.(options);
					}}
				>
					{value} | {label}
				</div>
				{/* <select
					className="select select-bordered w-full max-w-xs"
					value={value as string}
					onChange={(e) => onCommit(e, e.target.value)}
				>
					{options.map(({ label: optLabel, value: optValue }) => (
						<option value={optValue} key={optLabel}>
							{optLabel}
						</option>
					))}
				</select> */}
			</SettingsItemOption>
		</SettingsItemBody>
	);
};

export { SettingsItemRange, SettingsItemToggle, SettingsItemSelect };
