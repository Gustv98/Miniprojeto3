require('dotenv').config();
const database_redis = require('./redis');
const database = require('./database');
const { addPedido, getPedido, updatePessoaPedido} = require('./mongo');

// getPedido()
addPedido(2,17)
// updatePessoaPedido()

//database_redis.setKey(6, "Produto: Monitor JS, preco: 800")
//database_redis.setTime(6, 15, "Produto: Gabinete Aigo, Preco: 350")
//database_redis.getKey(3)
//database_redis.delKey(6)

// database.getProduto(3)
//database.inserirProduto("Mouse XSS",95)
//database.updateProduto(200, "Mouse X")
//database.delProduto(14)



