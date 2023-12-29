// 直近の30件ぐらいが保存できれば十分
// 新しいデータ30件がきたら、古いデータ30件を削除する

import { readFileSync, writeFileSync } from "fs";
import { z } from "zod";
import { DuelData } from "./Schema/DuelData";

const DuelDataHistoryJson = z.object({
  history: z.array(DuelData),
});

export class FileDuelHistoryRepository {
  constructor(private readonly filePath: string) {}

  private parseFile() {
    const text = readFileSync(this.filePath, { encoding: "utf8" });
    const subscribeList = DuelDataHistoryJson.parse(JSON.parse(text));
    return subscribeList.history;
  }
  private saveFile(history: z.infer<typeof DuelData>[]) {
    const parsed = DuelDataHistoryJson.parse({ history: history });
    const text = JSON.stringify(parsed);
    writeFileSync(this.filePath, text);
  }

  getAll() {
    const history = this.parseFile();
    return history;
  }

  replace(history: z.infer<typeof DuelData>[]) {
    this.deleteAll();
    this.save(history);
  }

  private deleteAll() {
    this.saveFile([]);
  }
  private save(history: z.infer<typeof DuelData>[]) {
    this.saveFile(history);
  }
}
