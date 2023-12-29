import { readFileSync } from "fs";
import { resolve } from "path";

const secretJsonPath = resolve(__dirname, "../secret.json");
const json = JSON.parse(readFileSync(secretJsonPath, { encoding: "utf8" }));
export const DISCORD_TOKEN = json.discordToken;
