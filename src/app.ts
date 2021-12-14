import express from "express";
import indexRoutes from './routes/index';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());
app.use(indexRoutes);

app.listen(3000);