const Pool = require('../config/db');

const selectAllCategory = (sortby,sort,limit,offset) =>{
    return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectCategory = (category_id) =>{
    return Pool.query(`SELECT * FROM category WHERE category_id=${category_id}`);
}

const insertCategory = (data) =>{
    const {category_name,category_image} = data;
    return Pool.query(`INSERT INTO category (category_name,category_image) VALUES( '${category_name}', '${category_image}')`);
}

const  updateCategory = (data) =>{
    const { category_id, category_name, category_image} = data;
    return Pool.query(`UPDATE category SET category_name='${category_name}', category_image='${category_image}' WHERE category_id=${category_id}`);
}

const deleteCategory= (category_id) =>{
    return Pool.query(`DELETE FROM category WHERE id=${category_id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM category')
  }
  
const findId =(category_id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT category_id FROM category WHERE category_id=${category_id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }
  const searchByName = (category_name) => {
    return Pool.query(`SELECT * FROM category WHERE category_name ILIKE '%${category_name}%'`);
  }  

module.exports = {
    selectAllCategory,
    selectCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
    countData,
    findId,
    searchByName
}