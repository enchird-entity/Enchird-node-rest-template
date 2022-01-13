import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface User {
  username: string;
  email: string;
  nicNumber?: string; // National ID card number
  address?: String;
  phoneNumber?: string;
  uid: String;  // Firebase authentication uid
  photoURL?: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
    username: { 
      type: String, 
      required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    uid: String,
    address: String,
    nicNumber: String,
    phoneNumber: String,
    photoURL: String
});

// 3. Create a Model.
export default model<User>('User', schema);