import { Content } from "../models/content";

enum ContentEvents {
    Like = 'ContentLiked',
    UnLike = 'ContentUnLiked',
    Read = 'ContentRead'
}

const DecreaseBy = -1
type Event = { type: string, data: { _id: string } | any };

const EventService = async (event: Event) => {
    const { type, data } = event;
    console.log("Event:", type);

    switch (type) {
        case ContentEvents.Like: {
            await Content.like(data._id);
            break;
        };
        case ContentEvents.UnLike: {
            await Content.like(data._id, DecreaseBy);
            break;
        };
        case ContentEvents.Read: {
            await Content.read(data._id);
            break;
        }
    }
}

export default EventService;