const Pool = require('../config/db');

const selectAllCustomer = (sortby,sort,limit,offset) =>{
    return Pool.query(`SELECT * FROM customer ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectCustomer= (customer_id) =>{
    return Pool.query(`SELECT * FROM customer WHERE customer_id=${customer_id}`);
}

const insertCustomer = (data) =>{
    const {customer_name,  email, phone_number, address} = data;
    return Pool.query(`INSERT INTO customer (customer_name,email,phone_number,address) VALUES( '${customer_name}', '${email}', '${phone_number}', '${address}')`);
}

const updateCustomer = (data) =>{
    const { customer_id, customer_name, email, phone_number, address} = data;
    return Pool.query(`UPDATE customer SET customer_name='${customer_name}', email='${email}', phone_number='${phone_number}', address='${address}' WHERE customer_id=${customer_id}`);
}

const deleteCustomer= (customer_id) =>{
    return Pool.query(`DELETE FROM customer WHERE customer_id=${customer_id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM category')
  }
  
const findId =(customer_id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT customer_id FROM customer WHERE customer_id=${customer_id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }
  const searchByName = (customer_name) => {
    return Pool.query(`SELECT * FROM customer WHERE customer_name ILIKE '%${customer_name}%'`);
  }  

module.exports = {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
    searchByName
}