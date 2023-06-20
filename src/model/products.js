const Pool = require('../config/db');

const selectAllProduct = (sortby,sort,limit,offset) =>{
    return Pool.query(`SELECT
    product.product_id,
    product.product_name as product,
    product.shop_name as brand,
    product.price,
    product.color,
    product.product_image,
    category.category_name as category,
    category.category_image
  FROM
    product
  JOIN
    category ON product.category_id = category.category_id
    ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectProduct = (product_id) => {
    return Pool.query( `SELECT * FROM product WHERE product_id=${product_id} `);
  };
  
  const insertProduct = (data) => {
    const { product_name, shop_name, price, color, product_image, category_id} = data;
    return Pool.query(`INSERT INTO product (product_name, shop_name, price, color, product_image, category_id) VALUES('${product_name}','${shop_name}',${price},'${color}','${product_image}',${category_id})`);
  };
  
  const updateProduct = (data) => {
    const { product_id,product_name,shop_name,price,color,product_image,category_id} = data;
    return Pool.query(
      `UPDATE product SET product_name='${product_name}', shop_name='${shop_name}', price=${price}, color='${color}', product_image='${product_image}', category_id=${category_id} WHERE product_id=${product_id}`
    );
  };
  
  const deleteProduct = (product_id) => {
    return Pool.query(`DELETE FROM product WHERE product_id=${product_id}`);
  };
  
  const countData = () => {
    return Pool.query("SELECT COUNT(*) FROM product");
  };
  
  const findId = (product_id) => {
    return new Promise((resolve, reject) =>
      Pool.query(`SELECT product_id FROM product WHERE product_id=${product_id}`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      })
    );
  };

  const searchByName = (product_name) => {
    return Pool.query(`SELECT * FROM product WHERE product_name ILIKE '%${product_name}%'`);
  }  
  
  module.exports = {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId,
    searchByName,
  };
  