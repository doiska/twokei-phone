import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { formatNumber } from '@utils/format';

import { useGlobalWallpaper } from '@os/hooks/useGlobalWallpaper';

import { Container } from "@apps/dial/call/Call.styles";
import { ContainerWithNavbar } from "@apps/dial/dialpad/components/Container";
import DialPadContacts from '@apps/dial/dialpad/components/DialpadContacts';
import DialPadGrid from '@apps/dial/dialpad/components/DialpadGrid';
import DialPadInput from '@apps/dial/dialpad/components/DialpadInput';
import { DialInputContext } from '@apps/dial/dialpad/hooks/InputContext';

const DialPad: React.FC = () => {
	const { phone } = useParams();
	const [input, setInput] = useState(phone || '');

	useGlobalWallpaper('backdrop-blur-md bg-steel-slate-800 bg-opacity-80');

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
					<DialPadContacts/>
					<Container className="items-center basis-[65%] rounded-t-2xl pt-5">
						<DialPadInput/>
						<DialPadGrid/>
					</Container>
				</ContainerWithNavbar>
			</DialInputContext.Provider>
		</>
	);
};

export default DialPad;
