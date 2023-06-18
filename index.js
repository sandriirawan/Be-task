const express = require("express");
require('dotenv').config()
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const mainRouter = require("./src/routes/index");
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(morgan('dev'));
app.use("/", mainRouter);
app.use((err,req,res,next)=>{
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message : messageError
  })

})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
