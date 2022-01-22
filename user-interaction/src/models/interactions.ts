import mongoose from 'mongoose';

interface InteractionAttrs {
    content: string;
    interactions?: {
        reads: number;
        likes: number;
        total?: number;
    };
}


interface InteractionModel extends mongoose.Model<InteractionDoc> {
    build(attrs: InteractionAttrs): InteractionDoc;
    like(id: string, count?: number): Promise<InteractionDoc>;
    read(id: string, count?: number): Promise<InteractionDoc>;
}

interface InteractionDoc extends mongoose.Document {
    content: string;
    interactions?: {
        reads: number;
        likes: number;
        total?: number;
    }
}

const InteractionSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            trim: true,
            default: '',
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

enum EInteraction {
    Like = 1,
    Unlike = -1,
    Read = 1
}

InteractionSchema.statics.like = function like(id: string, count = EInteraction.Like) {
    return new Promise(
        async (resolve, reject) => {
            try {
                const result = await this.updateOne(
                    { "content": new mongoose.mongo.ObjectId(id) },
                    { "$inc": { "interactions.likes": count, "interactions.total": count } }
                );

                resolve(result);
            } catch (error: any) {
                reject(error.message);
            }
        }
    )
};

InteractionSchema.statics.read = function read(id: string, count = EInteraction.Read) {
    return new Promise(
        async (resolve, reject) => {
            try {
                const result = await this.updateOne(
                    { "content": new mongoose.mongo.ObjectId(id) },
                    { "$inc": { "interactions.reads": count, "interactions.total": count } }
                );

                resolve(result);
            } catch (error: any) {
                reject(error.message);
            }
        }
    )
}

InteractionSchema.statics.build = (attrs: InteractionAttrs) => {
    return new Interaction(attrs);
};

const Interaction = mongoose.model<InteractionDoc, InteractionModel>('Interaction', InteractionSchema);

export { Interaction, InteractionDoc, InteractionModel };
