import React, { useState } from 'react';
import { useEffect } from 'react';

import { GalleryPhoto } from '@typings/gallery';
import { TriangleLoader } from '@ui/components/LoadingSpinner';

import useNavigation from '@os/hooks/useNavigation';
import { useSetNavigationDisabled } from '@os/navigation/navigation.state';

import { useCamera } from '@apps/photo/hooks/useCamera';
import usePhotoActions from '@apps/photo/hooks/usePhotoActions';
import usePhotoAPI from '@apps/photo/hooks/usePhotoAPI';
import { Container } from '@apps/photo/Photo.styles';

const Camera = () => {
	const [displayPhoto, setDisplayPhoto] = useState<GalleryPhoto>();

	const { goTo } = useNavigation();
	const { takePhoto, isConcluded, isLoading } = useCamera();

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
		goTo('/photo/');
	};

	//TODO: mover tudo para o contextMenu da pagina anterior, é muito mais fácil manipular por lá, só usar como :ref

	return (
		<Container>
			{!isConcluded ? (
				<TriangleLoader />
			) : (
				<>
					Essa foto tá boa?
					<img src={displayPhoto?.image} alt="latest photo" />
					<button onClick={handleSave}>Salvar</button>
					<button onClick={() => displayPhoto && removePhoto(displayPhoto)}>Quero não</button>
				</>
			)}
		</Container>
	);
};

export default Camera;
