require('dotenv').config();
const { MongoClient, ObjectID } = require('mongodb');
const redis = require("redis");
const Client = require('pg').Client
const client_mongo = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    { useUnifiedTopology: true });

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

const cliente = new Client({
    user: 'postgres',
    host: '10.0.0.2',
    database: 'Produtos',
    password: 'postgres',
    port: 5432
});






async function getPedido(){
    try{
        await client_mongo.connect();
        const database = client_mongo.db(`${process.env.MONGO_DATABASE}`);
        const pessoas = client_mongo.db(`${process.env.MONGO_DATABASE}`).collection('clientes');

     
        await pessoas.find().forEach(p => console.log(p));
    } finally{
        await client_mongo.close();
    }
}


async function addPedido(id_cliente, id){
    try{
        await cliente.connect()
        const resultado = await cliente.query("SELECT nome, cpf, nome_produto, preco FROM clientes, produtos where id_cliente = '"+id_cliente+"' and id = '"+id+"'")
        await client_mongo.connect();
        const pessoas = client_mongo.db(`${process.env.MONGO_DATABASE}`).collection('clientes');
        console.log(resultado.rows)
        await pessoas.insertMany(resultado.rows).then(console.log('Pedido inserido  no mongodb!'));
        client.setex(id, 3600, JSON.stringify(resultado.rows), function(err, resp){
            if(err) throw err;
            console.log(resp);
        }); 
    }finally{
        
        await client_mongo.close();
    }
}

async function updatePessoaPedido(){
    try{
        await client_mongo.connect();
        const pessoas = client_mongo.db(`${process.env.MONGO_DATABASE}`).collection('clientes');

        const query = {nome_produto: "Mouse X"};
        const update = {$set: {nome_produto: "Mouse KSX"}};
        await pessoas.updateOne(query, update).then(console.log('Nome atualizado!'));
    }finally{
        await client_mongo.close();
    }
}

async function deletePedido(filter){
    try{
        await client_mongo.connect();
        const pessoas = client_mongo.db(`${process.env.MONGO_DATABASE}`).collection('clientes');

        const result = await pessoas.deleteOne(filter);
        console.log(`${result.deletedCount} documentos removidos`);
    }finally{
        await client_mongo.close();
    }
}


module.exports = {getPedido, addPedido, deletePedido, updatePessoaPedido};
