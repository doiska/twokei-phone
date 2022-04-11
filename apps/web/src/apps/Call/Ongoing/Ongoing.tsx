import React, { useState } from 'react';
import {
	BsCameraVideoFill,
	BsCameraVideoOffFill,
	BsChatDotsFill,
	BsMic,
	BsMicMuteFill,
	BsPeople,
	BsTelephoneX,
	BsVolumeMuteFill,
	BsVolumeUpFill,
} from 'react-icons/bs';

import {
	Profile,
	Button,
	ButtonGrid,
	Container,
	Details,
	ProfileHolder,
	ButtonWrapper,
	Fill,
} from '@apps/Call/Ongoing/Ongoing.styles';

const Ongoing: React.FC = () => {
	const mock = {
		name: 'doiská',
		avatar: '',
	};

	const [volume, setVolume] = useState(true);
	const [mic, setMic] = useState(true);
	const [camera, setCamera] = useState(false);

	const handleVolumeClick = () => {
		setVolume((curr) => !curr);
	};

	const handleMicrophoneClick = () => {
		setMic((curr) => !curr);
	};

	const handleCameraClick = () => {
		setCamera((curr) => !curr);
	};

	return (
		<Container>
			<ProfileHolder>
				<Profile {...mock} />
				<Details className="text-green-400" formattedTime="00:00" />
			</ProfileHolder>

			<ButtonGrid className="bg-white bg-opacity-40 p-3 px-4 shadow-md ">
				<Button>
					<BsChatDotsFill />
				</Button>
				<Button>
					<BsPeople />
				</Button>
				<Button onClick={handleCameraClick}>{camera ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}</Button>
			</ButtonGrid>

			<Fill />

			<ButtonGrid className="w-full basis-[30%] items-center justify-center">
				<Button className="basis-[20%]" onClick={handleVolumeClick}>
					<ButtonWrapper className="rounded-full bg-zinc-400 bg-opacity-40 p-3">
						{volume ? <BsVolumeUpFill /> : <BsVolumeMuteFill />}
					</ButtonWrapper>
				</Button>
				<Button className="basis-[30%] text-lg">
					<ButtonWrapper className="rounded-full bg-red-400 p-5">
						<BsTelephoneX />
					</ButtonWrapper>
				</Button>
				<Button className="basis-[20%]" onClick={handleMicrophoneClick}>
					<ButtonWrapper className="rounded-full bg-zinc-400 bg-opacity-40 p-3">
						{mic ? <BsMic /> : <BsMicMuteFill />}
					</ButtonWrapper>
				</Button>
			</ButtonGrid>
		</Container>
	);
};

export default Ongoing;
