require('dotenv').config()
const express = require('express')
const sequelize = require('./service/dao')
const router = require('./router/router')
const errorMiddleware = require('./middleware/error_handler')
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)

const run = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync({force: false});
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
        
    } catch (e) {
        console.log(e);
    }
}

run()