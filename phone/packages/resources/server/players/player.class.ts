import { PlayerInstance } from './player.interfaces';

export class Player {
	public readonly source: number;
	public readonly userName: string;

	private _phoneNumber: string;
	private _identifier: string;
	private _firstName: string | null;
	private _lastName: string | null;

	constructor({ source, identifier, phoneNumber, userName }: PlayerInstance) {
		this.source = source;
		this._identifier = identifier;
		this._phoneNumber = phoneNumber;
		this.userName = userName;
	}

	/**
	 * Sets the identifier of the player.
	 * @param {string} identifier
	 */
	public set identifier(identifier: string) {
		this._identifier = identifier;
	}

	/**
	 * Gets the identifier of the player.
	 */
	public get identifier(): string {
		return this._identifier;
	}

	/**
	 * Sets the phone number of the player.
	 * @param {string} phoneNumber
	 */
	public set phoneNumber(phoneNumber: string) {
		this._phoneNumber = phoneNumber;
	}

	/**
	 * Gets the phone number of the player.
	 */
	public get phoneNumber(): string {
		return this._phoneNumber;
	}

	/**
	 * Sets the first name of the player.
	 */
	public set firstName(firstName: string | null) {
		this._firstName = firstName;
	}

	/**
	 * Gets the first name of the player.
	 */
	public get firstName(): string | null {
		return this._firstName;
	}

	/**
	 * Sets the last name of the player.
	 */
	public set lastName(lastName: string | null) {
		this._lastName = lastName;
	}

	/**
	 * Gets the last name of the player.
	 */
	public get lastName(): string | null {
		return this._lastName;
	}

	public getFullName(): string {
		return `${this.firstName || ''} ${this.lastName || ''}`;
	}
}
