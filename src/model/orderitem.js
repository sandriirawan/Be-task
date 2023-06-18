const Pool = require('../config/db');

const selectAllOrderitem = (sortby,sort,limit,offset) =>{
    return Pool.query(`SELECT * FROM order_item ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectOrderitem = (order_item_id) =>{
    return Pool.query(`SELECT * FROM order_item WHERE order_item_id=${order_item_id}`);
}

const insertOrderitem = (data) =>{
    const {product_id,quantity} = data;
    return Pool.query(`INSERT INTO order_item (product_id,quantity) VALUES(  ${product_id}, ${quantity})`);
}

const updateOrderitem = (data) =>{
    const { order_item_id,product_id,quantity} = data;
    return Pool.query(`UPDATE order_item SET  product_id=${product_id}, quantity=${quantity} WHERE order_item_id=${order_item_id}`);
}

const deleteOrderitem= (order_item_id) =>{
    return Pool.query(`DELETE FROM order_item WHERE order_item_id=${order_item_id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM order_item')
  }
  
const findId =(order_item_id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT order_item_id FROM order_item WHERE order_item_id=${order_item_id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }


module.exports = {
    selectAllOrderitem,
    selectOrderitem,
    insertOrderitem,
    updateOrderitem,
    deleteOrderitem,
    countData,
    findId,
}