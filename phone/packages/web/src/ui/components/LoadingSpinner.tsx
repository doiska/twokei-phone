import React from 'react';
import { Audio, Triangle } from 'react-loader-spinner';

const LoadingSpinner: React.FC = () => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Triangle height={100} width={100} color="white" ariaLabel="Loading..." />
		</div>
	);
};

export default LoadingSpinner;
