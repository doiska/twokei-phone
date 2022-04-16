import { CallHistoryItem } from '@typings/call';
import Xiao from 'db/xiao';
import { DataTypes, Model, Optional } from 'sequelize';

type CallAttributesOptional = Optional<CallHistoryItem, 'id'>;

class CallSchema extends Model<CallHistoryItem, CallAttributesOptional> {
	declare id: number;
	declare identifier: string;
	declare transmitter: string;
	declare receiver: string;
	declare isAccepted: number;
	declare start: number;
	declare end: number;
}

CallSchema.init(
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
		dialer: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		receiver: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isAccepted: {
			field: 'is_accepted',
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		start: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		end: {
			type: DataTypes.NUMBER,
			allowNull: true,
			defaultValue: null,
		},
	},
	{
		sequelize: Xiao,
		timestamps: false,
		tableName: 'twokei_phone_calls',
	}
);

export default CallSchema;
