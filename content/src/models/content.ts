import mongoose from 'mongoose';


interface ContentAttrs {
    title: string;
    story: string;
    date_published: Date;
    user: string;
    interactions: {
        reads: number;
        likes: number;
    }
}


interface ContentModel extends mongoose.Model<ContentDoc> {
    build(attrs: ContentAttrs): ContentDoc;
}

interface ContentDoc extends mongoose.Document {
    title: string;
    story: string;
    date_published: Date;
    user: string;
    interactions: {
        reads: number;
        likes: number;
    }
}

const contentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            default: '',
            maxlength: 150,
            required: true
        },
        story: {
            type: String,
            trim: true,
            default: '',
            required: true
        },
        date_published: {
            type: Date,
            required: true,
            default: Date.now()
        },
        user: {
            type: String,
            trim: true,
            required: true
        },
        interactions: {
            reads: {
                type: Number,
                min: 0,
                default: 0,
            },
            likes: {
                type: Number,
                min: 0,
                default: 0,
            }
        }
    }
);

contentSchema.statics.build = (attrs: ContentAttrs) => {
    return new Content(attrs);
};

const Content = mongoose.model<ContentDoc, ContentModel>('Content', contentSchema);

export default Content;
