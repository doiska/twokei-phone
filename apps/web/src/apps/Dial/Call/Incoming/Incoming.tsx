import React, { useState } from 'react';
import { BsTelephoneFill, BsTelephoneXFill } from 'react-icons/bs';
import { Bars } from 'react-loader-spinner';

import { Button, ButtonGrid, ButtonWrapper, Container } from '@apps/Dial/Call/Call.styles';
import { Profile } from '@apps/Dial/Call/Calling/Calling.styles';

const Incoming: React.FC = () => {
	const [name, setName] = useState('John Doe');

	return (
		<Container className="justify-center">
			<div className="flex w-full basis-[70%] flex-col gap-6">
				<div className="flex flex-row items-center justify-evenly fill-white text-white">
					<Profile name={name} />
					<Bars height={32} color="white" />
					<Profile name="doiská" />
				</div>
				<div className="text-md flex flex-col items-center">
					<span className="text-md text-slate-200">Chamada de</span>
					<span className="text-2xl text-white">{name}</span>
				</div>
			</div>
			<ButtonGrid className="w-full basis-[10%] items-center justify-center">
				<Button className="basis-[45%] text-2xl">
					<ButtonWrapper className="rounded-full bg-green-400 p-5">
						<BsTelephoneFill />
					</ButtonWrapper>
				</Button>
				<Button className="basis-[45%] text-2xl">
					<ButtonWrapper className="rounded-full bg-red-400 p-5">
						<BsTelephoneXFill />
					</ButtonWrapper>
				</Button>
			</ButtonGrid>
		</Container>
	);
};

export default Incoming;
