export const findParticipants = (conversation: string, phoneNumber?: string | null) =>
	conversation.split('+').filter((participant) => participant !== phoneNumber);