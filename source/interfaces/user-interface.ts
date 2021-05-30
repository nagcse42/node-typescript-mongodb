import { Document } from 'mongoose';

interface UserInterface extends Document {
    username: string,
    password: string
}

export default UserInterface;