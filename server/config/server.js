const IS_DEV = process.env.NODE_ENV === "development";

export const STATIC_PATH = IS_DEV ? `../build/client` : `../client`;

export const PORT = Number(process.env.PORT) || 3000;
