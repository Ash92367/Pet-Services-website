import express from 'express';
import { addforms, listform, removeform, approveform } from '../controllers/adoptController.js';

const adoptRouter = express.Router();

adoptRouter.post('/addforms', addforms);
adoptRouter.get('/listforms', listform);
adoptRouter.put('/approve/:id', approveform); // Add this line
adoptRouter.delete('/delete/:id', removeform);

export default adoptRouter;
