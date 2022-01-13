import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import userRouter from './controllers/user.controller';

const app = express();
const port = process.env.PORT || 3000;

//Connect to database
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("[SERVER] Connected to database!");
})
.catch(() => {
  console.log("[SERVER] Unable to Connect to database!");
});

// Cors
app.use(cors());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application/json
app.use(bodyParser.json());
// Logger
app.use(morgan("dev"));

/**
 * 
 * ==== Routes ===
 */
app.use('/users', userRouter);


app.listen(port, () => {
  console.log(`[SERVER] Server is running on the port ${port}.`);
});