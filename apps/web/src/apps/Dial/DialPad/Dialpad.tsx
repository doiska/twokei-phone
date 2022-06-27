import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { formatNumber } from '@utils/format';

import { useSetAppWallpaper } from '@os/hooks/useAppWallpaper';
import { useSetGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

import { DialInputContext } from '@apps/dial/call/context/InputContext';
import { Container, ContainerWithNavbar } from '@apps/dial/Dial.styles';
import DialpadContacts from '@apps/dial/dialpad/DialpadContacts';
import DialPadGrid from '@apps/dial/dialpad/DialpadGrid';
import DialPadInput from '@apps/dial/dialpad/DialpadInput';

const Dialpad: React.FC = () => {
	const { phone } = useParams();
	const [input, setInput] = useState(phone || '');

	const setAppWallpaper = useSetAppWallpaper();
	const setGlobalWallpaper = useSetGlobalWallpaper();

	useEffect(() => {
		setGlobalWallpaper('backdrop-blur-md bg-steel-slate-800 bg-opacity-80');
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
				<ContainerWithNavbar>
					<DialpadContacts />
					<Container className="items-center basis-[65%] rounded-t-2xl pt-5">
						<DialPadInput />
						<DialPadGrid />
					</Container>
				</ContainerWithNavbar>
			</DialInputContext.Provider>
		</>
	);
};

export default Dialpad;
