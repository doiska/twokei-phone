import { Model, Optional, DataTypes } from 'sequelize';
import { TweetDTO } from '@typings/twitter';
import Xiao from 'db/xiao';

type TweetOptionalAttributes = Optional<TweetDTO, 'id'>;

class TweetItemSchema extends Model<TweetDTO, TweetOptionalAttributes> {
	declare id: number;
	declare source: string;
	declare sourceProfile: string;

	declare content: string;
	declare images?: string[];

	declare likes?: number;
	declare retweets?: number;

	declare createdAt: string;
	declare updatedAt?: string;
}

TweetItemSchema.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		source: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		images: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		timestamps: false,
		sequelize: Xiao,
		tableName: 'twokei_phone_tweet_item',
	}
);

export default TweetItemSchema;
