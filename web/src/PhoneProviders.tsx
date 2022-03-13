import React from 'react';
import { NotificationProvider } from '@os/notification/providers/NotificationProvider';

const PhoneProviders: React.FC = ({ children }) => {
	return <NotificationProvider>{children}</NotificationProvider>;
};

export default PhoneProviders;
