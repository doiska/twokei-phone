import React from 'react';
import { useEffect } from 'react';

import { useCamera } from '@apps/photo/hooks/useCamera';

const Camera = () => {
	const { takePhoto } = useCamera();

	useEffect(() => {
		console.log('takePhoto');
		takePhoto();
	}, []);

	return <></>;
};

export default Camera;
