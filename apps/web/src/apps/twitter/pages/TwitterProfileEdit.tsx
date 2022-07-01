import React, { useEffect, useState } from 'react';

import { useQueryParams } from '@common/hooks/useQueryParams';
import { ServerPromiseResp } from '@typings/common';
import { TwitterEvents, TwitterProfile } from '@typings/twitter';
import ImageWithDefaultComponentFallback from '@ui/components/ImageWithComponentFallback';
import { TriangleLoader } from '@ui/components/LoadingSpinner';
import fetchNui from '@utils/fetchNui';
import { buildRespObj } from '@utils/nuiMisc';

import { TwitterInput } from '@apps/twitter/components/profile/TwitterInput';
import { useTwitterProfileValue } from '@apps/twitter/hooks/state';
import useTwitterActions from '@apps/twitter/hooks/useTwitterActions';

const TwitterProfileEdit = () => {
	const { updateLocalProfile } = useTwitterActions();

	const currentProfile = useTwitterProfileValue();

	const [updating, setUpdating] = useState(false);
	const [name, setName] = useState(currentProfile?.name || '');
	const [avatar, setAvatar] = useState(currentProfile?.avatar || '');

	const hasProfile = !!currentProfile;

	const handleUpdate = () => {
		setUpdating(true);

		fetchNui<ServerPromiseResp<TwitterProfile>>(
			TwitterEvents.UPDATE_OR_CREATE_PROFILE,
			{
				name,
				avatar,
			}
		)
			.then(() => {
				//TODO: add username and name to local profile
				updateLocalProfile({
					username: name,
					avatar,
				});
			})
			.catch(() => console.error('Failed to update profile'))
			.finally(() => setUpdating(false)); //TODO: show popup
	};

	const handleReset = () => {
		setName(currentProfile?.name || '');
		setAvatar(currentProfile?.avatar || '');
	};

	return (
		<div className={'flex flex-col items-center justify-center gap-2'}>
			<div className="flex h-32 w-32 flex-col gap-2 rounded-full">
				<ImageWithDefaultComponentFallback
					loadedImage={avatar}
					fallbackElement={<TriangleLoader />}
					className="rounded-full bg-cover bg-center"
				/>
			</div>
			<div
				className={
					'flex w-full flex-col items-center justify-center p-3'
				}
			>
				<TwitterInput
					label={'Avatar'}
					value={avatar}
					onChange={setAvatar}
				/>
				<TwitterInput label={'Nome'} value={name} onChange={setName} />
				<div className={'flex gap-2'}>
					<button
						onClick={handleUpdate}
						className="bg-twitter-blue rounded-lg border-2 border-transparent p-2 font-bold text-white transition-all hover:border-white"
					>
						{hasProfile ? 'Salvar' : 'Criar'}
					</button>
					<button
						onClick={handleReset}
						className={`bg-twitter-light-gray rounded-lg border-2 border-transparent p-2 font-bold text-white transition-all hover:border-white ${
							updating ? 'cursor-not-allowed opacity-50' : ''
						}`}
					>
						Resetar
					</button>
				</div>
			</div>
		</div>
	);
};

export default TwitterProfileEdit;
