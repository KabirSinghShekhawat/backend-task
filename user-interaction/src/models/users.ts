import mongoose from 'mongoose';

interface UserAttrs {
    user: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
    user: string;
}

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        trim: true,
        required: true
    }
}
);

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User };
