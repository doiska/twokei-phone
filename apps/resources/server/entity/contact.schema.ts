import { DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize';
import Xiao from '../db/xiao';
import { Contact } from '@typings/contacts';

interface ContactAttributes extends Contact {
	identifier: string;
}

type ContactAttributesOptional = Optional<ContactAttributes, 'id'>;

class ContactSchema extends Model<ContactAttributes, ContactAttributesOptional> {
	declare id: number;
	declare identifier: string;
	declare display: string;
	declare number: string;
	declare avatar?: string;
}

ContactSchema.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		identifier: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		display: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		number: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: false,
		tableName: 'twokei_phone_contacts',
		sequelize: Xiao,
	}
);

export default ContactSchema;
