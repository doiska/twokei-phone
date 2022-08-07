import React from 'react';
import { Outlet } from 'react-router-dom';

import GenericApp from '@ui/os/GenericApp';
import GenericBody from '@ui/os/GenericBody';
import GenericHeader from '@ui/os/GenericHeader';

const ContactsApp: React.FC = () => {
	return (
		<GenericApp>
			<GenericHeader title={'Contacts'}/>
			<GenericBody>
				<Outlet/>
			</GenericBody>
		</GenericApp>
	);
};

export default ContactsApp;
