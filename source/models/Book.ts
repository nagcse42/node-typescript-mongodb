import mongoose, { Schema } from 'mongoose';
import BookInterface from '../interfaces/book-interface';

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        extraInfo: { type: String }
    },
    {
        timestamps: true
    }
);

BookSchema.post<BookInterface>('save', function () {
    this.extraInfo = `Telugu Movies Books #Telugu, #TeluguMovie #Tollywood`
})

export default mongoose.model<BookInterface>('Book', BookSchema);