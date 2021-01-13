import express from 'express';

const route = express.Router();

route.get('/health-check',(req,res,next)=>res.send('OK'))
