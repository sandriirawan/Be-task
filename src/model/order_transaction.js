const Pool = require('../config/db');

const selectAllOrderTransaction = (sortby,sort,limit,offset) =>{
    return Pool.query(`SELECT * FROM order_transaction ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectOrderTransaction = (order_id) =>{
    return Pool.query(`SELECT * FROM order_transaction WHERE order_id=${order_id}`);
}

const insertOrderTransaction = (data) =>{
    const {customer_id,order_item_id} = data;
    const date = new Date().toISOString()
    return Pool.query(`INSERT INTO order_transaction (customer_id,order_item_id, order_date) VALUES(${customer_id}, ${order_item_id}, '${date}')`);
}

const updateOrderTransaction = (data) =>{
    const { order_id,customer_id,order_item_id} = data;
    const date = new Date().toISOString()

    return Pool.query(`UPDATE order_transaction SET order_date='${date}', customer_id=${customer_id} ,order_item_id = ${order_item_id} WHERE order_id=${order_id}`);
}

const deleteOrderTransaction= (order_id) =>{
    return Pool.query(`DELETE FROM order_transaction WHERE order_id=${order_id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM order_transaction')
  }
  
const findId =(order_id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT order_id FROM order_transaction WHERE order_id=${order_id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }


module.exports = {
    selectAllOrderTransaction,
    selectOrderTransaction,
    insertOrderTransaction,
    updateOrderTransaction,
    deleteOrderTransaction,
    countData,
    findId,
}