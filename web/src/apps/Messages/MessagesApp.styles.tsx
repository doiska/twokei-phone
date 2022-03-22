import React from 'react';

const Wrapper: React.FC = ({ children }) => {
	return <div className="flex h-full w-full flex-col">{children}</div>;
};

const MainHeader: React.FC = ({ children }) => {
	return <div className="bg-whatsapp-teal-dark flex basis-[13%] flex-col justify-center text-white">{children}</div>;
};

const MainBody: React.FC = ({ children }) => {
	return <div className="flex flex-1 bg-white">{children}</div>;
};

export { Wrapper, MainHeader, MainBody };
