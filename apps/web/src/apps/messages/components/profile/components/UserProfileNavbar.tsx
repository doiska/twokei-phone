import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

import useNavigation from '@os/hooks/useNavigation';

const UserProfileNavbar: React.FC = () => {
	const { goBack } = useNavigation();

	return (
		<div className="flex w-full flex-row items-center gap-2 px-3">
			<span>
				<BiArrowBack className="cursor-pointer text-xl" onClick={() => goBack()} />
			</span>
			<span>Seu perfil</span>
		</div>
	);
};

export default UserProfileNavbar;
