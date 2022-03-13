const ContactCategory: React.FC<{ title?: string }> = ({ title, children }) => {
	return (
		<div className="mb-2 flex flex-col gap-1 rounded-xl bg-zinc-800 p-2 text-white">
			{title ? <span className="p-2">{title}</span> : ''}
			<div>{children}</div>
		</div>
	);
};
