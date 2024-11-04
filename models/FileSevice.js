const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FileService extends Model { }

    FileService.init({
        filename: {
            type: DataTypes.STRING
        },
        original_file_name: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'FileService',
        tableName: 'fileUpload',
        timestamps: true
    }
    );

    return FileService;
};
