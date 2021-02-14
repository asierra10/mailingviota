const express = require('express');
const app = express();
const path = require('path');
const { SERVER_PORT } = require('./path');
const cors = require('cors');
const db = require('./database/db');
const routes = require('./routes/routes');

  //Server settings
app.set('port', process.env.PORT  || SERVER_PORT);
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//Middleware
app.use(cors({
    origin:'*'
}));

//Routes
app.use(routes);

//Start the server
app.listen(app.get('port'), ()=>{
    console.log('Server listening on port '+app.get('port'));
});


app.get('/3', (req, res) => {
    fs.rf("mama");
    res.send("Hola");
});
