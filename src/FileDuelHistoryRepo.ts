// 直近の30件ぐらいが保存できれば十分
// 新しいデータ30件がきたら、古いデータ30件を削除する

import { readFileSync, writeFileSync } from "fs";
import { z } from "zod";
import { DuelData } from "./Schema/DuelData";

const E = DuelData.extend({
  duelDate: z.string().datetime(),
});
const DuelDataHistoryJson = z.object({
  history: z.array(E),
});

export class FileDuelHistoryRepository {
  constructor(private readonly filePath: string) {}

  private parseFile(): z.infer<typeof DuelData>[] {
    const text = readFileSync(this.filePath, { encoding: "utf8" });
    const json = JSON.parse(text);
    const parsedJson = DuelDataHistoryJson.parse(json);
    const duelHistory = parsedJson.history.map((data) => ({
      ...data,
      duelDate: new Date(data.duelDate),
    }));
    return duelHistory;
  }
  private saveFile(history: z.infer<typeof E>[]) {
    const parsed = DuelDataHistoryJson.parse({ history: history });
    const text = JSON.stringify(parsed);
    writeFileSync(this.filePath, text);
  }

  getAll(): z.infer<typeof DuelData>[] {
    const history = this.parseFile();
    return history;
  }

  replace(history: z.infer<typeof DuelData>[]): void {
    this.deleteAll();
    this.save(history);
  }

  private deleteAll(): void {
    this.saveFile([]);
  }
  private save(history: z.infer<typeof DuelData>[]): void {
    this.saveFile(
      history.map((data) => ({
        ...data,
        duelDate: data.duelDate.toISOString(),
      })),
    );
  }
}
