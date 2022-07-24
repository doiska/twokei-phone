import { AiOutlinePlus } from "react-icons/all";
import React from "react";

export const TwitterComposeIcon = ({ onClick }: { onClick: () => void }) => (
	<div
		className="bg-twitter-blue absolute bottom-24 right-5 rounded-full p-4"
onClick={onClick}
	>
	<AiOutlinePlus />
	</div>
);