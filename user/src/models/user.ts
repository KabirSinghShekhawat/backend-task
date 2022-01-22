import mongoose from 'mongoose';

interface UserAttrs {
    first_name: string;
    last_name: string;
    email_id: string;
    phone_number: string;
}


interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    first_name: string;
    last_name: string;
    email_id: string;
    phone_number: string;
}

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            default: '',
            maxlength: 50,
            required: true
        },
        last_name: {
            type: String,
            trim: true,
            default: '',
            maxlength: 50,
            required: true
        },
        email_id: {
            type: String,
            trim: true,
            required: true
        },
        phone_number: {
            type: String,
            trim: true,
            minlength: 10,
            maxlength: 10,
            required: true
        }
    }
);

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User, UserDoc };