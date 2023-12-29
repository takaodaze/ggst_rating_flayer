import { PlayerPageFetcher } from "./PlayerPageFetcher";

describe.skip(PlayerPageFetcher.name, () => {
  const fetcher = new PlayerPageFetcher("2ECF2BA58568939");

  it("fetch player page", async () => {
    const result = await fetcher.fetch();
    expect(result.length).toBeGreaterThan(0);
  });
});
