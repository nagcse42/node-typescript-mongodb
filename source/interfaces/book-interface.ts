import { Document } from 'mongoose';

interface Book extends Document {
    title: string;
    author: string;
    extraInfo: string;
}

export default Book;