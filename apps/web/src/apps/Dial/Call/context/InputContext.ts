import { createContext } from 'react';

export interface IInputContext {
	val: string;
	setVal: (val: string) => void;
	addOne: (val: string | number) => void;
	removeOne: () => void;
	removeAll: () => void;
}

export const DialInputContext = createContext<IInputContext | null>(null);
