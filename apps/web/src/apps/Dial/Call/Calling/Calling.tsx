import React, { useState } from 'react';
import { BsChatDotsFill, BsTelephoneX, BsVolumeUpFill } from 'react-icons/bs';
import { BallTriangle, Bars, Rings } from 'react-loader-spinner';

import { Button, ButtonGrid, ButtonWrapper, Container } from '@apps/Dial/Call/Call.styles';
import { Profile } from '@apps/Dial/Call/Calling/Calling.styles';

const Calling: React.FC = () => {
	const [name, setName] = useState('John Doe');

	return (
		<Container className="justify-center">
			<div className="flex w-full basis-[70%] flex-col gap-6">
				<div className="flex flex-row items-center justify-evenly fill-white text-white">
					<Profile name="doiská" />
					<Bars height={32} color="white" />
					<Profile name={name} />
				</div>
				<div className="text-md flex flex-col items-center">
					<span className="text-md text-slate-200">Ligando para</span>
					<span className="text-2xl text-white">{name}</span>
				</div>
			</div>
			<ButtonGrid className="w-full basis-[10%] items-center justify-center">
				<Button className="basis-[20%]">
					<ButtonWrapper className="rounded-full bg-zinc-400 bg-opacity-40 p-3">
						<BsVolumeUpFill />
					</ButtonWrapper>
				</Button>
				<Button className="basis-[30%] text-2xl">
					<ButtonWrapper className="rounded-full bg-red-400 p-5">
						<BsTelephoneX />
					</ButtonWrapper>
				</Button>
				<Button className="basis-[20%]">
					<ButtonWrapper className="rounded-full bg-zinc-400 bg-opacity-40 p-3">
						<BsChatDotsFill />
					</ButtonWrapper>
				</Button>
			</ButtonGrid>
		</Container>
	);
};

export default Calling;
