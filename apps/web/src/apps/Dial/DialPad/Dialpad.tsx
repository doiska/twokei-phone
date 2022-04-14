import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { formatNumber } from '@utils/format';

import { useSetAppWallpaper } from '@os/hooks/useAppWallpaper';
import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

import { DialInputContext } from '@apps/Dial/Call/context/InputContext';
import Navbar from '@apps/Dial/Dial.styles';
import DialpadContacts from '@apps/Dial/DialPad/DialpadContacts';
import DialPadGrid from '@apps/Dial/DialPad/DialpadGrid';
import DialPadInput from '@apps/Dial/DialPad/DialpadInput';

const Dialpad: React.FC = () => {
	const { phone } = useParams();
	const [input, setInput] = useState(phone || '');

	const setAppWallpaper = useSetAppWallpaper();
	const setGlobalWallpaper = useSetGlobalWallpaper();

	useEffect(() => {
		setAppWallpaper('bg-steel-slate-600 bg-opacity-50');
		setGlobalWallpaper('backdrop-blur-md bg-zinc-900 bg-opacity-20');
	}, []);

	const validateInput = (input: string) => formatNumber(input);

	return (
		<>
			<DialInputContext.Provider
				value={{
					val: input,
					setVal: (val: string) => setInput(validateInput(val)),
					addOne: (val: string | number) => setInput(validateInput(`${input}${val}`)),
					removeOne: () => setInput((curr) => validateInput(curr.slice(0, -1))),
					removeAll: () => setInput(''),
				}}
			>
				<div className="flex h-full w-full flex-col">
					<DialpadContacts />
					<div className="flex h-full w-full basis-[65%] flex-col items-center rounded-t-2xl pt-5">
						<DialPadInput />
						<DialPadGrid />
					</div>
				</div>
				<Navbar />
			</DialInputContext.Provider>
		</>
	);
};

export default Dialpad;
