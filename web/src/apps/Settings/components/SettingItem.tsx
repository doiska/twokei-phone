import React, { useState } from 'react';

import { IContextMenuOption } from '@ui/components/contextmenu/ContextMenu';

import { SettingsItemBody, SettingsItemLabel, SettingsItemOption } from '../Settings.styles';

type Props = {
	title?: string;
	label: string;
	icon: JSX.Element;
	value: boolean | string | number;
	onCommit: (event: React.SyntheticEvent | Event, val: unknown, key: unknown) => void;
};

const SettingsItemRange: React.FC<Props & { min?: number; max?: number; step?: number }> = ({
	title,
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
			<SettingsItemLabel label={title ?? label} value={range} />
			<SettingsItemOption>
				<input
					value={range}
					type="range"
					min={min ?? 0}
					max={max ?? 100}
					step={step ?? 1}
					className="toggle-primary"
					onChange={(e) => setRange(e.target.value)}
					onMouseUp={(e) => onCommit(e, range, label)}
				/>
			</SettingsItemOption>
		</SettingsItemBody>
	);
};

const SettingsItemToggle: React.FC<Props> = ({ title, label, icon, value, onCommit }) => {
	return (
		<SettingsItemBody icon={icon}>
			<SettingsItemLabel label={title ?? label} />
			<SettingsItemOption>
				<input
					className="toggle self-end"
					type="checkbox"
					checked={value === 'true' || value === true}
					onChange={(e) => onCommit(e, e.target.checked, label)}
				/>
			</SettingsItemOption>
		</SettingsItemBody>
	);
};

type PropsWithOptions = Props & {
	onOpen(e: unknown): void;
	options: IContextMenuOption[];
};

const SettingsItemSelect: React.FC<PropsWithOptions> = ({ title, label, icon, value, onCommit, onOpen, options }) => {
	return (
		<SettingsItemBody icon={icon}>
			<SettingsItemLabel label={title ?? label} /*icon={icon}*/ />
			<SettingsItemOption>
				<div
					className="border-1 border-blue"
					onClick={() => {
						options = options.map((option) => ({
							...option,
							selected: option.value === label,
							onClick: (e: React.MouseEvent, option: IContextMenuOption) => onCommit(e, option.value, option.label),
						}));

						onOpen?.(options);
					}}
				>
					<label className="text-sm text-blue-300">{label}</label>
				</div>
			</SettingsItemOption>
		</SettingsItemBody>
	);
};

export { SettingsItemRange, SettingsItemToggle, SettingsItemSelect };
