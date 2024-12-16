import { connect } from 'mongoose';
import { app } from '../app.js';

export const connectMongoDB = async () => {
  try {
    await connect(`${process.env.MONGODB_URI}`);
    app.listen(process.env.PORT, () => {
      console.log(`Server is Listening at Port : ${process.env.PORT}`);
    });
  } catch (e) {
    console.error('Failed to connect MongoDB Error: ', e);
  }
};
