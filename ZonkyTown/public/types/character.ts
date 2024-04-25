import { ObjectId } from "mongodb";

export interface Character {
    _id: ObjectId;
    id: string;
    name: string;
    description: string;
    type: {
        value: string;
        displayValue: string;
    };
    images: {
        icon: string | null;
        featured: string | null;
    };
    rarity: {
        value: string;
    };
    introduction: {
        chapter: string | null;
        season: string;

    }
    added: string;
    variants: string | null;
}