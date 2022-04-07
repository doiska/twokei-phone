export function createConversationHash(participants: string[]) {
	participants.sort();
	return participants.join('+');
}
