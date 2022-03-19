import React from 'react';

const Avatar: React.FC<{ className?: string; width?: string; }> = ({ className, width, children }) => {
	return (
		<div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
			<div className="avatar placeholder">
				<div className={`text-neutral-content rounded-full bg-zinc-700 ${width}`}>{children}</div>
			</div>
		</div>
	);
};

export default Avatar;
