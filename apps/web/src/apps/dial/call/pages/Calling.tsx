import React from 'react';
import { BsChatDotsFill, BsTelephoneX, BsVolumeUpFill } from 'react-icons/bs';
import { Bars } from 'react-loader-spinner';

import { ModalState, useSetCallModal } from '@os/call/hooks/state';
import { useCall } from '@os/call/hooks/useCall';

import { Button, ButtonGrid, ButtonWrapper, Container } from '@apps/dial/call/Call.styles';
import { CallingProfile } from "@apps/dial/call/calling/components/CallingProfile";

const Calling: React.FC = () => {
	const { call, hangupCall } = useCall();
	const setCallModalState = useSetCallModal();

	const handleEndCall = (e: React.MouseEvent) => {
		e.stopPropagation();
		hangupCall();
		setCallModalState(ModalState.CLOSED);
	};

	if (!call) return null;

	const { dialer, receiver } = call;

	return (
		<Container className="justify-center">
			<div className="flex w-full basis-[70%] flex-col gap-6">
				<div className="flex flex-row items-center justify-evenly fill-white text-white">
					<CallingProfile name="doiská"/>
					<Bars height={32} color="white"/>
					<CallingProfile name={dialer}/>
				</div>
				<div className="text-md flex flex-col items-center">
					<span className="text-md text-slate-200">Ligando para</span>
					<span className="text-2xl text-white">{receiver}</span>
				</div>
			</div>
			<ButtonGrid className="w-full basis-[10%] items-center justify-center">
				<Button className="basis-[20%]">
					<ButtonWrapper className="rounded-full bg-zinc-400 bg-opacity-40 p-3">
						<BsVolumeUpFill/>
					</ButtonWrapper>
				</Button>
				<Button className="basis-[30%] text-2xl">
					<ButtonWrapper className="rounded-full bg-red-400 p-5">
						<BsTelephoneX onClick={handleEndCall}/>
					</ButtonWrapper>
				</Button>
				<Button className="basis-[20%]">
					<ButtonWrapper className="rounded-full bg-zinc-400 bg-opacity-40 p-3">
						<BsChatDotsFill/>
					</ButtonWrapper>
				</Button>
			</ButtonGrid>
		</Container>
	);
};

export default Calling;
