const { conn, User, Product } = require('../db');
const seedUser = require('./seedUsers');
const seedProducts = require('./seedProducts');

// Cargar datos
const initialChargeData = async ()=>{
    try {
        //funcion para probar si la conexion esta bien
        await conn.authenticate();

        //generar las columnas
        await conn.sync();

        //insertar datos
        await Promise.all([
            User.bulkCreate(seedUser),
            Product.bulkCreate(seedProducts)
        ])
        console.log('Datos insertados correctamente');

        process.exit(0);

    } catch (error) {
        process.exit(1);
    }
}

// Eliminar datos
const deleteChargeInitial = async()=>{
    try {
        // Indica que Sequelize debe forzar la creación de nuevas tablas en la base de datos, eliminando las tablas existentes si es necesario
        await conn.sync({force: true});
        console.log('Eliminacion correcta');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


if(process.argv[2] === "-i"){
    initialChargeData();
}

if(process.argv[2] === "-e"){
    deleteChargeInitial();
}