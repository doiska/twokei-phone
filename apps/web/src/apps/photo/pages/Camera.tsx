import React, { useEffect, useState } from 'react';

import { GalleryPhoto } from '@typings/gallery';
import { TriangleLoader } from '@ui/components/LoadingSpinner';

import useNavigation from '@os/hooks/useNavigation';
import { useSetNavigationDisabled } from '@os/navigation/navigation.state';

import { useCamera } from '@apps/photo/hooks/useCamera';
import usePhotoAPI from '@apps/photo/hooks/usePhotoAPI';
import { Container } from '@apps/photo/Photo.styles';

const Camera = () => {
	const [displayPhoto, setDisplayPhoto] = useState<GalleryPhoto>();

	const { goTo } = useNavigation();
	const { takePhoto, isConcluded } = useCamera();

	const { getLatestPhoto, removePhoto } = usePhotoAPI();

	const setDisabledNavigation = useSetNavigationDisabled();

	useEffect(() => {
		takePhoto();
		setDisabledNavigation(true);
	}, []);

	useEffect(() => {
		if (isConcluded) {
			setDisplayPhoto(getLatestPhoto());
			setDisabledNavigation(false);
		}
	}, [isConcluded]);

	const handleSave = () => {
		if (displayPhoto) {
			const url = new URL('/photo');
			url.searchParams.set('ref', 'camera');
			url.searchParams.set('photo', displayPhoto.image);
			goTo('/photo', { state: { ref: 'camera', photo: displayPhoto.image } });
		}
	};

	return (
		<Container>
			{!isConcluded ? (
				<TriangleLoader/>
			) : (
				<>
					<span>Essa foto tá boa?</span>
					<img src={displayPhoto?.image} alt="latest photo"/>
					<button onClick={handleSave}>Salvar</button>
					<button onClick={() => displayPhoto && removePhoto(displayPhoto)}>Quero não</button>
				</>
			)}
		</Container>
	);
};

export default Camera;
