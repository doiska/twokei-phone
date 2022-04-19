import { DataTypes, Model, Optional } from 'sequelize';
import { ConversationParticipant } from '@typings/messages';
import Xiao from '../../db/xiao';
import { GalleryPhoto } from '@typings/gallery';

type GalleryPhotoCreation = GalleryPhoto & {
	identifier: string;
};

class PhotoSchema extends Model<GalleryPhotoCreation, Omit<GalleryPhotoCreation, 'id'>> {
	declare id: number;
	declare identifier: string;
	declare image: string;
	declare category: string;
}

PhotoSchema.init(
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
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		sequelize: Xiao,
		tableName: 'twokei_phone_gallery_photos',
	}
);

export default PhotoSchema;
