import { z } from "zod";
import { Subscribe } from "./Schema/Subscribe";
import { readFileSync, writeFileSync } from "fs";

const SubscribeJson = z.object({
  subscribeList: z.array(Subscribe),
});

export class FileSubscribeRepo {
  constructor(private readonly filePath: string) {}

  private parseFile() {
    const text = readFileSync(this.filePath, { encoding: "utf8" });
    const subscribeList = SubscribeJson.parse(JSON.parse(text));
    return subscribeList.subscribeList;
  }
  private saveFile(list: z.infer<typeof Subscribe>[]) {
    const parsed = SubscribeJson.parse({ subscribeList: list });
    const text = JSON.stringify(parsed);
    writeFileSync(this.filePath, text);
  }

  /**
   * 同一の行が入ってしまう可能性があるが、所詮はテスト用のリポジトリなので気にしない
   */
  add(subscribe: z.infer<typeof Subscribe>) {
    const list = this.parseFile();
    list.push(subscribe);
    this.saveFile(list);
  }

  getAll() {
    const list = this.parseFile();
    return list;
  }
  // update(subscribe) {}
}
