export const findParticipants = (conversation: string, phoneNumber: string) =>
	conversation.split('+').filter((participant) => participant !== phoneNumber);
