import mongoose from 'mongoose';

interface ContentAttrs {
    title: string;
    story: string;
    date_published: Date;
    user: string;
    interactions?: {
        reads: number;
        likes: number;
        total?: number;
    };
}


interface ContentModel extends mongoose.Model<ContentDoc> {
    build(attrs: ContentAttrs): ContentDoc;
    like(id: string, count?: number): Promise<ContentDoc>;
    read(id: string, count?: number): Promise<ContentDoc>;
}

interface ContentDoc extends mongoose.Document {
    title: string;
    story: string;
    date_published: Date;
    user: string;
    interactions?: {
        reads: number;
        likes: number;
        total?: number;
    }
}

const ContentSchema = new mongoose.Schema(
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
            default: Date.now(),
            required: true
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
                default: 0
            },
            likes: {
                type: Number,
                min: 0,
                default: 0
            },
            total: {
                type: Number,
                min: 0,
                default: 0
            }
        }
    }
);

enum Interaction {
    Like = 1,
    Unlike = -1,
    Read = 1
}

ContentSchema.statics.like = function like(id: string, count = Interaction.Like) {
    return new Promise(
        async (resolve, reject) => {
            try {
                const result = await this.updateOne(
                    { "_id": new mongoose.mongo.ObjectId(id) },
                    { "$inc": { "interactions.likes": count, "interactions.total": count } }
                );

                resolve(result);
            } catch (error: any) {
                reject(error.message);
            }
        }
    )
};

ContentSchema.statics.read = function read(id: string, count = Interaction.Read) {
    return new Promise(
        async (resolve, reject) => {
            try {
                const result = await this.updateOne(
                    { "_id": new mongoose.mongo.ObjectId(id) },
                    { "$inc": { "interactions.reads": count, "interactions.total": count } }
                );

                resolve(result);
            } catch (error: any) {
                reject(error.message);
            }
        }
    )
}

ContentSchema.statics.build = (attrs: ContentAttrs) => {
    return new Content(attrs);
};

const Content = mongoose.model<ContentDoc, ContentModel>('Content', ContentSchema);

export { Content, ContentDoc };
