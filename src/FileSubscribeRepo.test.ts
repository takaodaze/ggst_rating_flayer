import { resolve } from "path";
import { FileSubscribeRepo } from "./FileSubscribeRepo";
import { readFileSync, writeFileSync } from "fs";

const testFilePath = resolve(__dirname, "./test/subscribe.json");
const resetTestFile = () => {
  const initData = {
    subscribeList: [],
  };
  writeFileSync(testFilePath, JSON.stringify(initData));
};

describe(FileSubscribeRepo.name, () => {
  beforeEach(() => {
    resetTestFile();
  });
  afterEach(() => {
    resetTestFile();
  });

  test("add", () => {
    const repo = new FileSubscribeRepo(testFilePath);

    repo.add({ character: "SO", playerId: "2ECF2BA58568939" });
    repo.add({ character: "AN", playerId: "2ECF2BA58568939" });
    const actual = readFileSync(testFilePath, { encoding: "utf8" });
    const expected =
      '{"subscribeList":[{"playerId":"2ECF2BA58568939","character":"SO"},{"playerId":"2ECF2BA58568939","character":"AN"}]}';
    expect(actual).toEqual(expected);
  });

  test("getAll", () => {
    const repo = new FileSubscribeRepo(testFilePath);
    writeFileSync(
      testFilePath,
      '{"subscribeList":[{"playerId":"2ECF2BA58568939","character":"SO"},{"playerId":"2ECF2BA58568939","character":"AN"}]}',
    );

    const list = repo.getAll();
    expect(list.length).toEqual(2);
    expect(list[0].character).toEqual("SO");
    expect(list[0].playerId).toEqual("2ECF2BA58568939");
    expect(list[1].character).toEqual("AN");
    expect(list[1].playerId).toEqual("2ECF2BA58568939");
  });
});
