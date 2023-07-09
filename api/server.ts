const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const config = require('config');
import { router } from './router';

const port: number = config.get("port");
const app = express();

app.use(cors({
    origin: config.get('corsAllowedHosts')
}));
  
app.use(express.json());
app.use(express.static("public"));

app.use('/v1/', router);
  
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});
