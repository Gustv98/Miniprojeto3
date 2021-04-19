const Client = require('pg').Client
const redis = require("redis");

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

async function getProduto(id){
    
    try{
        console.log("Iniciando conexão com postgresql...")
        await cliente.connect()
        console.log("Ok")
        const resultado = await cliente.query("SELECT nome_produto, preco FROM produtos where id = '"+id+"' ")
        console.log(resultado.rows)

        client.setex(id, 3600, JSON.stringify(resultado.rows), function(err, resp){
            if(err) throw err;
            console.log(resp);
        }); 
    }catch(ex){
        console.log("Error" + ex)
    }
}

async function inserirProduto(nome_produto, preco){
    try{
        console.log("Iniciando conexão com postgresql...")
        await cliente.connect()
        console.log("Ok")
        await cliente.query('INSERT INTO produtos("nome_produto", "preco") VALUES ('+"'"+nome_produto+"', '"+preco+"');")
        console.log("Inserção bem sucedida")
    }catch(ex){
        console.log("Error" + ex)
    }
}

async function updateProduto(preco, mouse){
    try{
        console.log("Iniciando conexão com postgresql...")
        await cliente.connect()
        console.log("Ok")
        await cliente.query("UPDATE produtos SET preco = '"+preco+"' WHERE nome_produto = '"+mouse+"';")
        console.log("Produto atualizado com sucesso!")
    }catch(ex){
        console.log("Error" + ex)
    }finally{
        await cliente.end()
    }
}

async function delProduto(id){
    try{
        console.log("Iniciando conexão com postgresql...")
        await cliente.connect()
        console.log("Ok")
        await cliente.query("DELETE FROM produtos WHERE id = '"+id+"';")
        console.log("Produto deletado com sucesso!")
    }catch(ex){
        console.log("Error" + ex)
    }finally{
        await cliente.end()
    }
}

module.exports = {getProduto, inserirProduto, updateProduto, delProduto};