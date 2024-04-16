const express = require('express');
const {serverConfig} = require('./config')
const apiRoutes = require('./routes');

const App = express();

App.use(express.json());  
App.use(express.urlencoded({extended: true,}))

App.use('/api', apiRoutes);


App.listen(serverConfig.Port , async ()=> {
    console.log(`Successfully started server on Port ${serverConfig.Port}`);
})