import { resolve } from "path";
import { FileSubscribeRepo } from "./FileSubscribeRepo";

const subscribeStoreFilePath = resolve(__dirname, "../subscribe.json");
const subscribeRepo = new FileSubscribeRepo(subscribeStoreFilePath);
subscribeRepo.add({
  playerId: "2EC41599176F389",
  character: "AX",
});
