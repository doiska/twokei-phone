import React from 'react';
import { Rings, Triangle } from 'react-loader-spinner';
import { BaseProps } from 'react-loader-spinner/dist/type';

const RingsLoader: React.FC<BaseProps> = (props) => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Rings {...props} />
		</div>
	);
};

const TriangleLoader: React.FC<BaseProps> = (props) => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Triangle height={100} width={100} color="white" ariaLabel="Loading..." {...props} />
		</div>
	);
};

export { RingsLoader, TriangleLoader };
