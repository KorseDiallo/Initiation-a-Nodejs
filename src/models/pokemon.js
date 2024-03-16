module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false // le nom de la colonne est 'allowNull', pas 'allowNul'
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: { 
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false, 
    });
}
