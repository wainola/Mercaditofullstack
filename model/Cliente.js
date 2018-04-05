module.exports = (sequelize, DataType) => {
    const Cliente = sequelize.define('Cliente', {
        id_cliente: { type: DataType.INTEGER, allowNull: false },
        nombre: { type: DataType.STRING, allowNull: false },
        apellido: { type: DataType.STRING, allowNull: false },
        email: { type: DataType.STRING, allowNull: false }
    });
    return Cliente;
}
