module.exports = (sequelize, Sequelize) => {
    const Ip = sequelize.define("ip", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ipv4: {
            type: Sequelize.STRING(15),
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "ip"
    });
    return Ip;
}