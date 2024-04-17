export interface fortnite {
    status: number;
    data:   Data;
}

export interface Data {
    br:          Br[];
    tracks:      Track[];
    instruments: Instrument[];
    cars:        Car[];
    lego:        Lego[];
    legoKits:    LegoKit[];
}

export interface Br {
    id:                      string;
    name:                    string;
    description:             string;
    type:                    Rarity;
    rarity:                  Rarity;
    series:                  Series | null;
    set:                     Set | null;
    introduction:            Introduction | null;
    images:                  BrImages;
    variants:                Variant[] | null;
    searchTags:              string[] | null;
    gameplayTags:            string[] | null;
    metaTags:                string[] | null;
    showcaseVideo:           null | string;
    dynamicPakId:            null | string;
    displayAssetPath:        null | string;
    definitionPath:          null | string;
    path:                    string;
    added:                   Date;
    shopHistory:             Date[] | null;
    itemPreviewHeroPath?:    string;
    customExclusiveCallout?: string;
    unlockRequirements?:     string;
    exclusiveDescription?:   string;
    builtInEmoteIds?:        string[];
}

export interface BrImages {
    smallIcon: null | string;
    icon:      null | string;
    featured:  null | string;
    lego:      LegoClass | null;
    other:     Other | null;
}

export interface LegoClass {
    small: string;
    large: string;
    wide:  null;
}

export interface Other {
    background?: string;
    coverart?:   string;
    decal?:      string;
}

export interface Introduction {
    chapter:      string;
    season:       string;
    text:         Text;
    backendValue: number;
}

export enum Text {
    IntroducedInChapter1Season1 = "Introduced in Chapter 1, Season 1.",
    IntroducedInChapter1Season2 = "Introduced in Chapter 1, Season 2.",
    IntroducedInChapter1Season3 = "Introduced in Chapter 1, Season 3.",
    IntroducedInChapter1Season4 = "Introduced in Chapter 1, Season 4.",
    IntroducedInChapter1Season5 = "Introduced in Chapter 1, Season 5.",
    IntroducedInChapter1Season6 = "Introduced in Chapter 1, Season 6.",
    IntroducedInChapter1Season7 = "Introduced in Chapter 1, Season 7.",
    IntroducedInChapter1Season8 = "Introduced in Chapter 1, Season 8.",
    IntroducedInChapter1Season9 = "Introduced in Chapter 1, Season 9.",
    IntroducedInChapter1SeasonX = "Introduced in Chapter 1, Season X.",
    IntroducedInChapter2Season1 = "Introduced in Chapter 2, Season 1.",
    IntroducedInChapter2Season2 = "Introduced in Chapter 2, Season 2.",
    IntroducedInChapter2Season3 = "Introduced in Chapter 2, Season 3.",
    IntroducedInChapter2Season4 = "Introduced in Chapter 2, Season 4.",
    IntroducedInChapter2Season5 = "Introduced in Chapter 2, Season 5.",
    IntroducedInChapter2Season6 = "Introduced in Chapter 2, Season 6.",
    IntroducedInChapter2Season7 = "Introduced in Chapter 2, Season 7.",
    IntroducedInChapter2Season8 = "Introduced in Chapter 2, Season 8.",
    IntroducedInChapter3Season1 = "Introduced in Chapter 3, Season 1.",
    IntroducedInChapter3Season2 = "Introduced in Chapter 3, Season 2.",
    IntroducedInChapter3Season3 = "Introduced in Chapter 3, Season 3.",
    IntroducedInChapter3Season4 = "Introduced in Chapter 3, Season 4.",
    IntroducedInChapter4Season1 = "Introduced in Chapter 4, Season 1.",
    IntroducedInChapter4Season2 = "Introduced in Chapter 4, Season 2.",
    IntroducedInChapter4Season3 = "Introduced in Chapter 4, Season 3.",
    IntroducedInChapter4Season4 = "Introduced in Chapter 4, Season 4.",
    IntroducedInChapter4SeasonOG = "Introduced in Chapter 4, Season OG.",
    IntroducedInChapter5Season1 = "Introduced in Chapter 5, Season 1.",
    IntroducedInChapter5Season2 = "Introduced in Chapter 5, Season 2.",
}

export interface Rarity {
    value:        PurpleValue;
    displayValue: DisplayValueEnum;
    backendValue: RarityBackendValue;
}

export enum RarityBackendValue {
    AthenaBackpack = "AthenaBackpack",
    AthenaCharacter = "AthenaCharacter",
    AthenaDance = "AthenaDance",
    AthenaEmoji = "AthenaEmoji",
    AthenaGlider = "AthenaGlider",
    AthenaItemWrap = "AthenaItemWrap",
    AthenaLoadingScreen = "AthenaLoadingScreen",
    AthenaMusicPack = "AthenaMusicPack",
    AthenaPet = "AthenaPet",
    AthenaPetCarrier = "AthenaPetCarrier",
    AthenaPickaxe = "AthenaPickaxe",
    AthenaSkyDiveContrail = "AthenaSkyDiveContrail",
    AthenaSpray = "AthenaSpray",
    AthenaToy = "AthenaToy",
    BannerToken = "BannerToken",
    EFortRarityCommon = "EFortRarity::Common",
    EFortRarityEpic = "EFortRarity::Epic",
    EFortRarityLegendary = "EFortRarity::Legendary",
    EFortRarityMythic = "EFortRarity::Mythic",
    EFortRarityRare = "EFortRarity::Rare",
    EFortRarityUnattainable = "EFortRarity::Unattainable",
    EFortRarityUncommon = "EFortRarity::Uncommon",
    JunoBuildingProp = "JunoBuildingProp",
    JunoBuildingSet = "JunoBuildingSet",
    SparksAura = "SparksAura",
    SparksBass = "SparksBass",
    SparksDrum = "SparksDrum",
    SparksGuitar = "SparksGuitar",
    SparksKeyboard = "SparksKeyboard",
    SparksMic = "SparksMic",
    VehicleCosmeticsBody = "VehicleCosmetics_Body",
    VehicleCosmeticsBooster = "VehicleCosmetics_Booster",
    VehicleCosmeticsDriftTrail = "VehicleCosmetics_DriftTrail",
    VehicleCosmeticsSkin = "VehicleCosmetics_Skin",
    VehicleCosmeticsWheel = "VehicleCosmetics_Wheel",
}

export enum DisplayValueEnum {
    AIIronManEmote = "AI Iron Man Emote",
    Aura = "Aura",
    BackBling = "Back Bling",
    Banner = "Banner",
    Bass = "Bass",
    Boost = "Boost",
    Build = "Build",
    BuiltInEmote = "Built-In Emote",
    CarBody = "Car Body",
    Character = "Character",
    Common = "Common",
    Contrail = "Contrail",
    DarkSeries = "DARK SERIES",
    DcSeries = "DC SERIES",
    Decal = "Decal",
    DecorBundle = "Decor Bundle",
    Drums = "Drums",
    Emote = "Emote",
    Emoticon = "Emoticon",
    Epic = "Epic",
    FrozenSeries = "Frozen Series",
    GamingLegendsSeries = "Gaming Legends Series",
    Glider = "Glider",
    Guitar = "Guitar",
    HarvestingTool = "Harvesting Tool",
    IconSeries = "Icon Series",
    Keytar = "Keytar",
    LamborghiniSeries = "LAMBORGHINI SERIES",
    LavaSeries = "Lava Series",
    Legendary = "Legendary",
    LoadingScreen = "Loading Screen",
    LobbyMusic = "Lobby Music",
    MarvelSeries = "MARVEL SERIES",
    MclarenSeries = "MCLAREN SERIES",
    Microphone = "Microphone",
    Music = "Music",
    MusicPack = "Music Pack",
    Mythic = "Mythic",
    NoBackBling = "No Back Bling",
    Null = "null",
    Outfit = "Outfit",
    Pet = "PET",
    Pickaxe = "Pickaxe",
    Rare = "Rare",
    Service = "Service",
    ShadowSeries = "Shadow Series",
    SlurpSeries = "Slurp Series",
    Social = "Social",
    Spray = "Spray",
    StarWarsSeries = "Star Wars Series",
    TestSpray = "Test Spray",
    Toy = "Toy",
    Trail = "Trail",
    Unattainable = "Unattainable",
    Uncommon = "Uncommon",
    ValueBuiltInEmote = "Built-in Emote",
    ValuePet = "Pet",
    Wheels = "Wheels",
    Wrap = "Wrap",
}

export enum PurpleValue {
    Aura = "aura",
    Backpack = "backpack",
    Banner = "banner",
    Bass = "bass",
    Body = "body",
    Booster = "booster",
    Common = "common",
    Contrail = "contrail",
    Dark = "dark",
    Dc = "dc",
    Drifttrail = "drifttrail",
    Drum = "drum",
    Emoji = "emoji",
    Emote = "emote",
    Epic = "epic",
    Frozen = "frozen",
    Gaminglegends = "gaminglegends",
    Glider = "glider",
    Guitar = "guitar",
    Icon = "icon",
    Keyboard = "keyboard",
    Lamborghini = "lamborghini",
    Lava = "lava",
    Legendary = "legendary",
    Legoprop = "legoprop",
    Legoset = "legoset",
    Loadingscreen = "loadingscreen",
    Marvel = "marvel",
    Mic = "mic",
    Music = "music",
    Mythic = "mythic",
    Outfit = "outfit",
    Pet = "pet",
    Petcarrier = "petcarrier",
    Pickaxe = "pickaxe",
    Rare = "rare",
    Shadow = "shadow",
    Skin = "skin",
    Slurp = "slurp",
    Spray = "spray",
    Starwars = "starwars",
    Toy = "toy",
    Uncommon = "uncommon",
    Wheel = "wheel",
    Wrap = "wrap",
}

export interface Series {
    value:        DisplayValueEnum;
    image:        null | string;
    colors:       Color[];
    backendValue: SeriesBackendValue;
}

export enum SeriesBackendValue {
    CUBESeries = "CUBESeries",
    ColumbusSeries = "ColumbusSeries",
    CreatorCollabSeries = "CreatorCollabSeries",
    DCUSeries = "DCUSeries",
    FrozenSeries = "FrozenSeries",
    LavaSeries = "LavaSeries",
    MarvelSeries = "MarvelSeries",
    PlatformSeries = "PlatformSeries",
    SeriesLamborghini = "Series_Lamborghini",
    SeriesMcLaren = "Series_McLaren",
    ShadowSeries = "ShadowSeries",
    SlurpSeries = "SlurpSeries",
}

export enum Color {
    A500A8Ff = "a500a8ff",
    A7A2B3Ff = "a7a2b3ff",
    B30102Ff = "b30102ff",
    B3A3A2Ff = "b3a3a2ff",
    C7C2D6Ff = "c7c2d6ff",
    Ce00Aeff = "ce00aeff",
    D60203Ff = "d60203ff",
    D6C3C2Ff = "d6c3c2ff",
    D8Edffff = "d8edffff",
    Dc240Fff = "dc240fff",
    Ddd7Edff = "ddd7edff",
    Ed1C24Ff = "ed1c24ff",
    Edd8D7Ff = "edd8d7ff",
    Face36Ff = "face36ff",
    Ff4Fc5Ff = "ff4fc5ff",
    Ffd800Ff = "ffd800ff",
    Ffffffff = "ffffffff",
    The000F2Bff = "000f2bff",
    The001F47Ff = "001f47ff",
    The003169Ff = "003169ff",
    The003F82Ff = "003f82ff",
    The004C71Ff = "004c71ff",
    The0053A9Ff = "0053a9ff",
    The0059Edff = "0059edff",
    The007Af1Ff = "007af1ff",
    The009Bd4Ff = "009bd4ff",
    The00C3F1Ff = "00c3f1ff",
    The025253Ff = "025253ff",
    The040A14Ff = "040a14ff",
    The050500Ff = "050500ff",
    The0A1833Ff = "0a1833ff",
    The0D0027Ff = "0d0027ff",
    The110128Ff = "110128ff",
    The171717Ff = "171717ff",
    The1B91Ffff = "1b91ffff",
    The1C8Bdaff = "1c8bdaff",
    The1Df9F7Ff = "1df9f7ff",
    The2555B2Ff = "2555b2ff",
    The280102Ff = "280102ff",
    The28085Fff = "28085fff",
    The2Bc9Caff = "2bc9caff",
    The320761Ff = "320761ff",
    The37Daadff = "37daadff",
    The392038Ff = "392038ff",
    The3E1398Ff = "3e1398ff",
    The3F0043Ff = "3f0043ff",
    The450E04Ff = "450e04ff",
    The4A4A4Aff = "4a4a4aff",
    The5328D6Ff = "5328d6ff",
    The5Cf2F3Ff = "5cf2f3ff",
    The5D005EFF = "5d005eff",
    The5E197Bff = "5e197bff",
    The610709Ff = "610709ff",
    The7F200Dff = "7f200dff",
    The8078Ffff = "8078ffff",
    The86Ddffff = "86ddffff",
    The999999Ff = "999999ff",
    The9A0035Ff = "9a0035ff",
}

export interface Set {
    value:        string;
    text:         string;
    backendValue: string;
}

export interface Variant {
    channel: Channel;
    type:    null | string;
    options: Option[];
}

export enum Channel {
    ClothingColor = "ClothingColor",
    Corruption = "Corruption",
    Emissive = "Emissive",
    Hair = "Hair",
    JerseyColor = "JerseyColor",
    Material = "Material",
    Mesh = "Mesh",
    Numeric = "Numeric",
    Particle = "Particle",
    Parts = "Parts",
    Pattern = "Pattern",
    PetTemperament = "PetTemperament",
    ProfileBanner = "ProfileBanner",
    Progressive = "Progressive",
    RichColor = "RichColor",
    RichColor2 = "RichColor2",
    Secondary = "Secondary",
    Slot = "Slot",
}

export interface Option {
    tag:                 string;
    name:                null | string;
    image:               string;
    unlockRequirements?: string;
}

export interface Car {
    id:            string;
    vehicleId:     string;
    name:          string;
    description:   string;
    type:          Rarity;
    rarity:        Rarity;
    images:        CarImages;
    series:        Series | null;
    gameplayTags:  string[];
    path:          string;
    showcaseVideo: null;
    added:         Date;
    shopHistory:   Date[] | null;
}

export interface CarImages {
    small: string;
    large: string;
}

export interface Instrument {
    id:            string;
    name:          string;
    description:   string;
    type:          Rarity;
    rarity:        Rarity;
    images:        CarImages;
    series:        Series | null;
    gameplayTags:  string[] | null;
    path:          string;
    showcaseVideo: null;
    added:         Date;
    shopHistory:   Date[] | null;
}

export interface Lego {
    id:               string;
    cosmeticId:       string;
    soundLibraryTags: SoundLibraryTag[] | null;
    images:           LegoClass;
    path:             string;
    added:            Date;
}

export enum SoundLibraryTag {
    SoundLibraryIDClothingTypeArmorLeather = "SoundLibrary.ID.ClothingType.ArmorLeather",
    SoundLibraryIDClothingTypeArmorMetal = "SoundLibrary.ID.ClothingType.ArmorMetal",
    SoundLibraryIDClothingTypeGearTactical = "SoundLibrary.ID.ClothingType.GearTactical",
    SoundLibraryIDClothingTypeGeneric = "SoundLibrary.ID.ClothingType.Generic",
    SoundLibraryIDClothingTypeRobot = "SoundLibrary.ID.ClothingType.Robot",
    SoundLibraryIDClothingTypeScales = "SoundLibrary.ID.ClothingType.Scales",
    SoundLibraryIDHandTypeBare = "SoundLibrary.ID.HandType.Bare",
    SoundLibraryIDHandTypeGlove = "SoundLibrary.ID.HandType.Glove",
    SoundLibraryIDHandTypeRobot = "SoundLibrary.ID.HandType.Robot",
    SoundLibraryIDJunoNPCVOFNRogueFBow = "SoundLibrary.ID.Juno.NPC.VO.FNRogue_F_Bow",
    SoundLibraryIDJunoNPCVOFNRogueMSword = "SoundLibrary.ID.Juno.NPC.VO.FNRogue_M_Sword",
    SoundLibraryIDJunoNPCVOFNSuburbianMPickaxe = "SoundLibrary.ID.Juno.NPC.VO.FNSuburbian_M_Pickaxe",
    SoundLibraryIDJunoNPCVOSkullTrooper = "SoundLibrary.ID.Juno.NPC.VO.SkullTrooper",
    SoundLibraryIDStepTypeBarefoot = "SoundLibrary.ID.StepType.Barefoot",
    SoundLibraryIDStepTypeBarefootHeavy = "SoundLibrary.ID.StepType.BarefootHeavy",
    SoundLibraryIDStepTypeBootsCombat = "SoundLibrary.ID.StepType.BootsCombat",
    SoundLibraryIDStepTypeBootsHeeled = "SoundLibrary.ID.StepType.BootsHeeled",
    SoundLibraryIDStepTypeBootsMetal = "SoundLibrary.ID.StepType.BootsMetal",
    SoundLibraryIDStepTypeSandal = "SoundLibrary.ID.StepType.Sandal",
    SoundLibraryIDStepTypeShoesDress = "SoundLibrary.ID.StepType.ShoesDress",
    SoundLibraryIDStepTypeShoesSneakers = "SoundLibrary.ID.StepType.ShoesSneakers",
    SoundLibraryJunoIDPersonaAdventurerFemale = "SoundLibrary.Juno.ID.Persona.Adventurer.Female",
    SoundLibraryJunoIDPersonaAdventurerMale = "SoundLibrary.Juno.ID.Persona.Adventurer.Male",
    SoundLibraryJunoIDPersonaDreamerFemale = "SoundLibrary.Juno.ID.Persona.Dreamer.Female",
    SoundLibraryJunoIDPersonaExplorerFemale = "SoundLibrary.Juno.ID.Persona.Explorer.Female",
    SoundLibraryJunoIDPersonaExplorerMale = "SoundLibrary.Juno.ID.Persona.Explorer.Male",
    SoundLibraryJunoIDPersonaFNBengalBasher = "SoundLibrary.Juno.ID.Persona.FN.BengalBasher",
    SoundLibraryJunoIDPersonaFNJules = "SoundLibrary.Juno.ID.Persona.FN.Jules",
    SoundLibraryJunoIDPersonaFNMeowscles = "SoundLibrary.Juno.ID.Persona.FN.Meowscles",
    SoundLibraryJunoIDPersonaFemale04 = "SoundLibrary.Juno.ID.Persona.Female.04",
    SoundLibraryJunoIDPersonaFemale05 = "SoundLibrary.Juno.ID.Persona.Female.05",
    SoundLibraryJunoIDPersonaHomesteaderFemale = "SoundLibrary.Juno.ID.Persona.Homesteader.Female",
    SoundLibraryJunoIDPersonaMale05 = "SoundLibrary.Juno.ID.Persona.Male.05",
}

export interface LegoKit {
    id:           string;
    name:         string;
    type:         Rarity;
    gameplayTags: string[];
    images:       CarImages;
    path:         string;
    added:        Date;
    shopHistory:  Date[] | null;
}

export interface Track {
    id:           string;
    devName:      string;
    title:        string;
    artist:       string;
    album:        null | string;
    releaseYear:  number;
    bpm:          number;
    duration:     number;
    difficulty:   Difficulty;
    gameplayTags: GameplayTag[] | null;
    genres:       Genre[] | null;
    albumArt:     string;
    added:        Date;
    shopHistory:  Date[] | null;
}

export interface Difficulty {
    vocals:       number;
    guitar:       number;
    bass:         number;
    plasticBass:  number;
    drums:        number;
    plasticDrums: number;
}

export enum GameplayTag {
    JamLoopIsUnpitchedBeat = "Jam-LoopIsUnpitched-Beat",
}

export enum Genre {
    Country = "Country",
    DanceElectronic = "DanceElectronic",
    Pop = "Pop",
    RapHipHop = "RapHipHop",
    RnB = "RnB",
    Rock = "Rock",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWelcome(json: string): Welcome {
        return cast(JSON.parse(json), r("Welcome"));
    }

    public static welcomeToJson(value: Welcome): string {
        return JSON.stringify(uncast(value, r("Welcome")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Welcome": o([
        { json: "status", js: "status", typ: 0 },
        { json: "data", js: "data", typ: r("Data") },
    ], false),
    "Data": o([
        { json: "br", js: "br", typ: a(r("Br")) },
        { json: "tracks", js: "tracks", typ: a(r("Track")) },
        { json: "instruments", js: "instruments", typ: a(r("Instrument")) },
        { json: "cars", js: "cars", typ: a(r("Car")) },
        { json: "lego", js: "lego", typ: a(r("Lego")) },
        { json: "legoKits", js: "legoKits", typ: a(r("LegoKit")) },
    ], false),
    "Br": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "type", js: "type", typ: r("Rarity") },
        { json: "rarity", js: "rarity", typ: r("Rarity") },
        { json: "series", js: "series", typ: u(r("Series"), null) },
        { json: "set", js: "set", typ: u(r("Set"), null) },
        { json: "introduction", js: "introduction", typ: u(r("Introduction"), null) },
        { json: "images", js: "images", typ: r("BrImages") },
        { json: "variants", js: "variants", typ: u(a(r("Variant")), null) },
        { json: "searchTags", js: "searchTags", typ: u(a(""), null) },
        { json: "gameplayTags", js: "gameplayTags", typ: u(a(""), null) },
        { json: "metaTags", js: "metaTags", typ: u(a(""), null) },
        { json: "showcaseVideo", js: "showcaseVideo", typ: u(null, "") },
        { json: "dynamicPakId", js: "dynamicPakId", typ: u(null, "") },
        { json: "displayAssetPath", js: "displayAssetPath", typ: u(null, "") },
        { json: "definitionPath", js: "definitionPath", typ: u(null, "") },
        { json: "path", js: "path", typ: "" },
        { json: "added", js: "added", typ: Date },
        { json: "shopHistory", js: "shopHistory", typ: u(a(Date), null) },
        { json: "itemPreviewHeroPath", js: "itemPreviewHeroPath", typ: u(undefined, "") },
        { json: "customExclusiveCallout", js: "customExclusiveCallout", typ: u(undefined, "") },
        { json: "unlockRequirements", js: "unlockRequirements", typ: u(undefined, "") },
        { json: "exclusiveDescription", js: "exclusiveDescription", typ: u(undefined, "") },
        { json: "builtInEmoteIds", js: "builtInEmoteIds", typ: u(undefined, a("")) },
    ], false),
    "BrImages": o([
        { json: "smallIcon", js: "smallIcon", typ: u(null, "") },
        { json: "icon", js: "icon", typ: u(null, "") },
        { json: "featured", js: "featured", typ: u(null, "") },
        { json: "lego", js: "lego", typ: u(r("LegoClass"), null) },
        { json: "other", js: "other", typ: u(r("Other"), null) },
    ], false),
    "LegoClass": o([
        { json: "small", js: "small", typ: "" },
        { json: "large", js: "large", typ: "" },
        { json: "wide", js: "wide", typ: null },
    ], false),
    "Other": o([
        { json: "background", js: "background", typ: u(undefined, "") },
        { json: "coverart", js: "coverart", typ: u(undefined, "") },
        { json: "decal", js: "decal", typ: u(undefined, "") },
    ], false),
    "Introduction": o([
        { json: "chapter", js: "chapter", typ: "" },
        { json: "season", js: "season", typ: "" },
        { json: "text", js: "text", typ: r("Text") },
        { json: "backendValue", js: "backendValue", typ: 0 },
    ], false),
    "Rarity": o([
        { json: "value", js: "value", typ: r("PurpleValue") },
        { json: "displayValue", js: "displayValue", typ: r("DisplayValueEnum") },
        { json: "backendValue", js: "backendValue", typ: r("RarityBackendValue") },
    ], false),
    "Series": o([
        { json: "value", js: "value", typ: r("DisplayValueEnum") },
        { json: "image", js: "image", typ: u(null, "") },
        { json: "colors", js: "colors", typ: a(r("Color")) },
        { json: "backendValue", js: "backendValue", typ: r("SeriesBackendValue") },
    ], false),
    "Set": o([
        { json: "value", js: "value", typ: "" },
        { json: "text", js: "text", typ: "" },
        { json: "backendValue", js: "backendValue", typ: "" },
    ], false),
    "Variant": o([
        { json: "channel", js: "channel", typ: r("Channel") },
        { json: "type", js: "type", typ: u(null, "") },
        { json: "options", js: "options", typ: a(r("Option")) },
    ], false),
    "Option": o([
        { json: "tag", js: "tag", typ: "" },
        { json: "name", js: "name", typ: u(null, "") },
        { json: "image", js: "image", typ: "" },
        { json: "unlockRequirements", js: "unlockRequirements", typ: u(undefined, "") },
    ], false),
    "Car": o([
        { json: "id", js: "id", typ: "" },
        { json: "vehicleId", js: "vehicleId", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "type", js: "type", typ: r("Rarity") },
        { json: "rarity", js: "rarity", typ: r("Rarity") },
        { json: "images", js: "images", typ: r("CarImages") },
        { json: "series", js: "series", typ: u(r("Series"), null) },
        { json: "gameplayTags", js: "gameplayTags", typ: a("") },
        { json: "path", js: "path", typ: "" },
        { json: "showcaseVideo", js: "showcaseVideo", typ: null },
        { json: "added", js: "added", typ: Date },
        { json: "shopHistory", js: "shopHistory", typ: u(a(Date), null) },
    ], false),
    "CarImages": o([
        { json: "small", js: "small", typ: "" },
        { json: "large", js: "large", typ: "" },
    ], false),
    "Instrument": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "type", js: "type", typ: r("Rarity") },
        { json: "rarity", js: "rarity", typ: r("Rarity") },
        { json: "images", js: "images", typ: r("CarImages") },
        { json: "series", js: "series", typ: u(r("Series"), null) },
        { json: "gameplayTags", js: "gameplayTags", typ: u(a(""), null) },
        { json: "path", js: "path", typ: "" },
        { json: "showcaseVideo", js: "showcaseVideo", typ: null },
        { json: "added", js: "added", typ: Date },
        { json: "shopHistory", js: "shopHistory", typ: u(a(Date), null) },
    ], false),
    "Lego": o([
        { json: "id", js: "id", typ: "" },
        { json: "cosmeticId", js: "cosmeticId", typ: "" },
        { json: "soundLibraryTags", js: "soundLibraryTags", typ: u(a(r("SoundLibraryTag")), null) },
        { json: "images", js: "images", typ: r("LegoClass") },
        { json: "path", js: "path", typ: "" },
        { json: "added", js: "added", typ: Date },
    ], false),
    "LegoKit": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("Rarity") },
        { json: "gameplayTags", js: "gameplayTags", typ: a("") },
        { json: "images", js: "images", typ: r("CarImages") },
        { json: "path", js: "path", typ: "" },
        { json: "added", js: "added", typ: Date },
        { json: "shopHistory", js: "shopHistory", typ: u(a(Date), null) },
    ], false),
    "Track": o([
        { json: "id", js: "id", typ: "" },
        { json: "devName", js: "devName", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "artist", js: "artist", typ: "" },
        { json: "album", js: "album", typ: u(null, "") },
        { json: "releaseYear", js: "releaseYear", typ: 0 },
        { json: "bpm", js: "bpm", typ: 0 },
        { json: "duration", js: "duration", typ: 0 },
        { json: "difficulty", js: "difficulty", typ: r("Difficulty") },
        { json: "gameplayTags", js: "gameplayTags", typ: u(a(r("GameplayTag")), null) },
        { json: "genres", js: "genres", typ: u(a(r("Genre")), null) },
        { json: "albumArt", js: "albumArt", typ: "" },
        { json: "added", js: "added", typ: Date },
        { json: "shopHistory", js: "shopHistory", typ: u(a(Date), null) },
    ], false),
    "Difficulty": o([
        { json: "vocals", js: "vocals", typ: 0 },
        { json: "guitar", js: "guitar", typ: 0 },
        { json: "bass", js: "bass", typ: 0 },
        { json: "plasticBass", js: "plasticBass", typ: 0 },
        { json: "drums", js: "drums", typ: 0 },
        { json: "plasticDrums", js: "plasticDrums", typ: 0 },
    ], false),
    "Text": [
        "Introduced in Chapter 1, Season 1.",
        "Introduced in Chapter 1, Season 2.",
        "Introduced in Chapter 1, Season 3.",
        "Introduced in Chapter 1, Season 4.",
        "Introduced in Chapter 1, Season 5.",
        "Introduced in Chapter 1, Season 6.",
        "Introduced in Chapter 1, Season 7.",
        "Introduced in Chapter 1, Season 8.",
        "Introduced in Chapter 1, Season 9.",
        "Introduced in Chapter 1, Season X.",
        "Introduced in Chapter 2, Season 1.",
        "Introduced in Chapter 2, Season 2.",
        "Introduced in Chapter 2, Season 3.",
        "Introduced in Chapter 2, Season 4.",
        "Introduced in Chapter 2, Season 5.",
        "Introduced in Chapter 2, Season 6.",
        "Introduced in Chapter 2, Season 7.",
        "Introduced in Chapter 2, Season 8.",
        "Introduced in Chapter 3, Season 1.",
        "Introduced in Chapter 3, Season 2.",
        "Introduced in Chapter 3, Season 3.",
        "Introduced in Chapter 3, Season 4.",
        "Introduced in Chapter 4, Season 1.",
        "Introduced in Chapter 4, Season 2.",
        "Introduced in Chapter 4, Season 3.",
        "Introduced in Chapter 4, Season 4.",
        "Introduced in Chapter 4, Season OG.",
        "Introduced in Chapter 5, Season 1.",
        "Introduced in Chapter 5, Season 2.",
    ],
    "RarityBackendValue": [
        "AthenaBackpack",
        "AthenaCharacter",
        "AthenaDance",
        "AthenaEmoji",
        "AthenaGlider",
        "AthenaItemWrap",
        "AthenaLoadingScreen",
        "AthenaMusicPack",
        "AthenaPet",
        "AthenaPetCarrier",
        "AthenaPickaxe",
        "AthenaSkyDiveContrail",
        "AthenaSpray",
        "AthenaToy",
        "BannerToken",
        "EFortRarity::Common",
        "EFortRarity::Epic",
        "EFortRarity::Legendary",
        "EFortRarity::Mythic",
        "EFortRarity::Rare",
        "EFortRarity::Unattainable",
        "EFortRarity::Uncommon",
        "JunoBuildingProp",
        "JunoBuildingSet",
        "SparksAura",
        "SparksBass",
        "SparksDrum",
        "SparksGuitar",
        "SparksKeyboard",
        "SparksMic",
        "VehicleCosmetics_Body",
        "VehicleCosmetics_Booster",
        "VehicleCosmetics_DriftTrail",
        "VehicleCosmetics_Skin",
        "VehicleCosmetics_Wheel",
    ],
    "DisplayValueEnum": [
        "AI Iron Man Emote",
        "Aura",
        "Back Bling",
        "Banner",
        "Bass",
        "Boost",
        "Build",
        "Built-In Emote",
        "Car Body",
        "Character",
        "Common",
        "Contrail",
        "DARK SERIES",
        "DC SERIES",
        "Decal",
        "Decor Bundle",
        "Drums",
        "Emote",
        "Emoticon",
        "Epic",
        "Frozen Series",
        "Gaming Legends Series",
        "Glider",
        "Guitar",
        "Harvesting Tool",
        "Icon Series",
        "Keytar",
        "LAMBORGHINI SERIES",
        "Lava Series",
        "Legendary",
        "Loading Screen",
        "Lobby Music",
        "MARVEL SERIES",
        "MCLAREN SERIES",
        "Microphone",
        "Music",
        "Music Pack",
        "Mythic",
        "No Back Bling",
        "null",
        "Outfit",
        "PET",
        "Pickaxe",
        "Rare",
        "Service",
        "Shadow Series",
        "Slurp Series",
        "Social",
        "Spray",
        "Star Wars Series",
        "Test Spray",
        "Toy",
        "Trail",
        "Unattainable",
        "Uncommon",
        "Built-in Emote",
        "Pet",
        "Wheels",
        "Wrap",
    ],
    "PurpleValue": [
        "aura",
        "backpack",
        "banner",
        "bass",
        "body",
        "booster",
        "common",
        "contrail",
        "dark",
        "dc",
        "drifttrail",
        "drum",
        "emoji",
        "emote",
        "epic",
        "frozen",
        "gaminglegends",
        "glider",
        "guitar",
        "icon",
        "keyboard",
        "lamborghini",
        "lava",
        "legendary",
        "legoprop",
        "legoset",
        "loadingscreen",
        "marvel",
        "mic",
        "music",
        "mythic",
        "outfit",
        "pet",
        "petcarrier",
        "pickaxe",
        "rare",
        "shadow",
        "skin",
        "slurp",
        "spray",
        "starwars",
        "toy",
        "uncommon",
        "wheel",
        "wrap",
    ],
    "SeriesBackendValue": [
        "CUBESeries",
        "ColumbusSeries",
        "CreatorCollabSeries",
        "DCUSeries",
        "FrozenSeries",
        "LavaSeries",
        "MarvelSeries",
        "PlatformSeries",
        "Series_Lamborghini",
        "Series_McLaren",
        "ShadowSeries",
        "SlurpSeries",
    ],
    "Color": [
        "a500a8ff",
        "a7a2b3ff",
        "b30102ff",
        "b3a3a2ff",
        "c7c2d6ff",
        "ce00aeff",
        "d60203ff",
        "d6c3c2ff",
        "d8edffff",
        "dc240fff",
        "ddd7edff",
        "ed1c24ff",
        "edd8d7ff",
        "face36ff",
        "ff4fc5ff",
        "ffd800ff",
        "ffffffff",
        "000f2bff",
        "001f47ff",
        "003169ff",
        "003f82ff",
        "004c71ff",
        "0053a9ff",
        "0059edff",
        "007af1ff",
        "009bd4ff",
        "00c3f1ff",
        "025253ff",
        "040a14ff",
        "050500ff",
        "0a1833ff",
        "0d0027ff",
        "110128ff",
        "171717ff",
        "1b91ffff",
        "1c8bdaff",
        "1df9f7ff",
        "2555b2ff",
        "280102ff",
        "28085fff",
        "2bc9caff",
        "320761ff",
        "37daadff",
        "392038ff",
        "3e1398ff",
        "3f0043ff",
        "450e04ff",
        "4a4a4aff",
        "5328d6ff",
        "5cf2f3ff",
        "5d005eff",
        "5e197bff",
        "610709ff",
        "7f200dff",
        "8078ffff",
        "86ddffff",
        "999999ff",
        "9a0035ff",
    ],
    "Channel": [
        "ClothingColor",
        "Corruption",
        "Emissive",
        "Hair",
        "JerseyColor",
        "Material",
        "Mesh",
        "Numeric",
        "Particle",
        "Parts",
        "Pattern",
        "PetTemperament",
        "ProfileBanner",
        "Progressive",
        "RichColor",
        "RichColor2",
        "Secondary",
        "Slot",
    ],
    "SoundLibraryTag": [
        "SoundLibrary.ID.ClothingType.ArmorLeather",
        "SoundLibrary.ID.ClothingType.ArmorMetal",
        "SoundLibrary.ID.ClothingType.GearTactical",
        "SoundLibrary.ID.ClothingType.Generic",
        "SoundLibrary.ID.ClothingType.Robot",
        "SoundLibrary.ID.ClothingType.Scales",
        "SoundLibrary.ID.HandType.Bare",
        "SoundLibrary.ID.HandType.Glove",
        "SoundLibrary.ID.HandType.Robot",
        "SoundLibrary.ID.Juno.NPC.VO.FNRogue_F_Bow",
        "SoundLibrary.ID.Juno.NPC.VO.FNRogue_M_Sword",
        "SoundLibrary.ID.Juno.NPC.VO.FNSuburbian_M_Pickaxe",
        "SoundLibrary.ID.Juno.NPC.VO.SkullTrooper",
        "SoundLibrary.ID.StepType.Barefoot",
        "SoundLibrary.ID.StepType.BarefootHeavy",
        "SoundLibrary.ID.StepType.BootsCombat",
        "SoundLibrary.ID.StepType.BootsHeeled",
        "SoundLibrary.ID.StepType.BootsMetal",
        "SoundLibrary.ID.StepType.Sandal",
        "SoundLibrary.ID.StepType.ShoesDress",
        "SoundLibrary.ID.StepType.ShoesSneakers",
        "SoundLibrary.Juno.ID.Persona.Adventurer.Female",
        "SoundLibrary.Juno.ID.Persona.Adventurer.Male",
        "SoundLibrary.Juno.ID.Persona.Dreamer.Female",
        "SoundLibrary.Juno.ID.Persona.Explorer.Female",
        "SoundLibrary.Juno.ID.Persona.Explorer.Male",
        "SoundLibrary.Juno.ID.Persona.FN.BengalBasher",
        "SoundLibrary.Juno.ID.Persona.FN.Jules",
        "SoundLibrary.Juno.ID.Persona.FN.Meowscles",
        "SoundLibrary.Juno.ID.Persona.Female.04",
        "SoundLibrary.Juno.ID.Persona.Female.05",
        "SoundLibrary.Juno.ID.Persona.Homesteader.Female",
        "SoundLibrary.Juno.ID.Persona.Male.05",
    ],
    "GameplayTag": [
        "Jam-LoopIsUnpitched-Beat",
    ],
    "Genre": [
        "Country",
        "DanceElectronic",
        "Pop",
        "RapHipHop",
        "RnB",
        "Rock",
    ],
};
