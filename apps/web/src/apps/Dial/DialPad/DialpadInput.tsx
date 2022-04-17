import React, { useContext } from 'react';

import { DialInputContext } from '@apps/dial/call/context/InputContext';

const DialPadInput: React.FC = () => {
	const context = useContext(DialInputContext);

	if (!context) return null;

	const { val, setVal } = context;

	return (
		<div className="flex w-full basis-[20%] flex-col items-center justify-center">
			<div className="h-[40%] w-[50%] rounded-full text-3xl">
				<input
					className="h-full w-full bg-transparent px-3 text-center outline-none focus:outline-none"
					value={val}
					onChange={(e) => setVal(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default DialPadInput;
