const ContactCategory: React.FC<{ title?: string }> = ({ title, children }) => {
	return (
		<ul className="flex flex-col text-white">
			{title ? <span className="ml-0.5 p-2">{title}</span> : ''}
			<div className="flex flex-col gap-2">{children}</div>
		</ul>
	);
};

export { ContactCategory };
