const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
import { router } from './router';

const port: number = 5002;
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
  
app.use(express.json());
app.use(express.static("public"));

app.use('/v1/', router);
  
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});