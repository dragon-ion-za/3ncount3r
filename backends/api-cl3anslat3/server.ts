const express = require("express");
import { router } from './router';

const app = express();
const config = require('config');

app.use(express.json());
app.use(express.static("public"));

app.use('/', router);
  
app.listen(config.get("port"), function() {
    console.log(`Server started on port ${config.get("port")}`);
});