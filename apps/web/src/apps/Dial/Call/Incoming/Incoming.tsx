import React, { useState } from 'react';
import { BsTelephoneFill, BsTelephoneXFill } from 'react-icons/bs';
import { Bars } from 'react-loader-spinner';

import { ModalState, useCallModal } from '@os/call/hooks/state';
import { useCall } from '@os/call/hooks/useCall';
import useNavigation from '@os/hooks/useNavigation';

import { Button, ButtonGrid, ButtonWrapper, Container } from '@apps/Dial/Call/Call.styles';
import { Profile } from '@apps/Dial/Call/Calling/Calling.styles';
import useContacts from '@apps/Dial/Contacts/hooks/useContacts';

const Incoming: React.FC = () => {
	const { goTo } = useNavigation();
	const { call, acceptCall, rejectCall } = useCall();
	const [modal, setCallModalState] = useCallModal();

	const { getContactByNumber } = useContacts();

	const handleAcceptCall = (e: React.MouseEvent) => {
		console.log('Call accepted');
		e.stopPropagation();
		acceptCall();

		setCallModalState(ModalState.ONGOING);
	};

	const handleRejectCall = (e: React.MouseEvent) => {
		console.log('Call rejected');
		e.stopPropagation();
		rejectCall();

		setCallModalState(ModalState.CLOSED);
	};

	if (!call) return null;

	const { dialer, receiver } = call;

	const contact = getContactByNumber(dialer);

	return (
		<Container className="justify-center">
			<div className="flex w-full basis-[70%] flex-col gap-6">
				<div className="flex flex-row items-center justify-evenly fill-white text-white">
					<Profile name={contact?.display ?? dialer} avatar={contact?.avatar} />
					<Bars height={32} color="white" />
					<Profile name="doiská" />
				</div>
				<div className="text-md flex flex-col items-center">
					<span className="text-md text-slate-200">Chamada de</span>
					<span className="text-2xl text-white">{contact?.display ?? dialer}</span>
					{contact?.display ? dialer : <span className="text-sm text-slate-200">(não encontrado)</span>}
				</div>
			</div>
			<ButtonGrid className="w-full basis-[10%] items-center justify-center">
				<Button className="basis-[45%] text-2xl" onClick={handleAcceptCall}>
					<ButtonWrapper className="rounded-full bg-green-400 p-5">
						<BsTelephoneFill />
					</ButtonWrapper>
				</Button>
				<Button className="basis-[45%] text-2xl" onClick={handleRejectCall}>
					<ButtonWrapper className="rounded-full bg-red-400 p-5">
						<BsTelephoneXFill />
					</ButtonWrapper>
				</Button>
			</ButtonGrid>
		</Container>
	);
};

export default Incoming;
