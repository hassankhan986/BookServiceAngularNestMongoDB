import { Document, Schema } from 'mongoose';

export interface Book extends Document {

   title: string;

  author: string;

  genre: string;

}
export const BookInterface = new Schema<Book>(
  {
    // Correctly specify type for _id
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
  },
  { _id: true },
);
