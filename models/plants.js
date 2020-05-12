module.exports = function (sequelize, DataTypes) {
    var plants = sequelize.define("plants", {
        latin_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'No Project Name'
                },
                len: [1, 50]
            }
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'github URL'
                },
                len: [1, 50]
            }
        },
        habitat: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'deployed URL'
                },
                len: [1, 40]
            }
        },
        main_photo: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    return plants;