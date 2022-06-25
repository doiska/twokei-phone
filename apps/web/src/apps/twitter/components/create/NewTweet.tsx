import React from 'react';
import { MdEmojiEmotions, MdImage, MdOutlinePlace } from 'react-icons/all';

const NewTweet = () => {
	const [tweet, setTweet] = React.useState('');

	return (
		<div
			className={
				'flex w-96 flex-col items-center gap-2 rounded-lg p-3 dark:bg-black'
			}
		>
			<textarea
				value={tweet}
				onChange={(e) => setTweet(e.target.value)}
				placeholder={'O que está acontecendo?'}
				className={
					'h-32 w-full resize-none bg-transparent p-2 text-black dark:text-white'
				}
				maxLength={140}
			/>
			<span
				className={
					'h-[1%] w-full border-t-[1px] border-gray-500 border-opacity-50'
				}
			/>
			<div
				className={
					'flex h-[10%] w-full items-center justify-between px-2'
				}
			>
				<div
					className={
						'flex flex-1 items-center justify-between px-2 text-lg'
					}
				>
					<div className={'text-twitter-blue flex items-center'}>
						<MdOutlinePlace />
						<MdImage />
						<MdEmojiEmotions />
					</div>
					<span className={'text-black dark:text-white'}>
						{tweet.length}/140
					</span>
				</div>
				<div
					className={`bg-twitter-blue rounded-full p-1.5 px-4 ${
						tweet.length === 0 && 'opacity-70'
					}`}
				>
					Tweetar
				</div>
			</div>
		</div>
	);
};

export default NewTweet;
