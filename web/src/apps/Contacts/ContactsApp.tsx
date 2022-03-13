import GenericApp from '@ui/os/GenericApp';
import GenericBody from '@ui/os/GenericBody';
import GenericHeader from '@ui/os/GenericHeader';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ContactsDetails from './components/ContactsDetails';
import ContactsPage from './components/ContactsPage';

const ContactsApp: React.FC = () => {
	// const { pathname } = useLocation();
	const navigation = useNavigate();

	return (
		<GenericApp>
			<GenericHeader title={'Contacts'} />
			<GenericBody>
				<Routes>
					<Route path="/" element={<ContactsPage />} />
					<Route path="/:id" element={<ContactsDetails />} />
				</Routes>
			</GenericBody>
		</GenericApp>
	);
};

export default ContactsApp;
