import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  holopinApiUrl: "https://www.holopin.io/api/sticker/share",
  apiKey: process.env.HOLOPIN_API_KEY,

  clientApiKeys: process.env.CLIENT_API_KEYS
    ? process.env.CLIENT_API_KEYS.split(",")
    : ["default-dev-key"],
};
