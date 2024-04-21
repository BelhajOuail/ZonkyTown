export interface Character {
    name: string | null;
    images: {
        icon: string | null;
        featured: string | null;
    };
    rarity: {
        value: string;
    };
    added: string;
}