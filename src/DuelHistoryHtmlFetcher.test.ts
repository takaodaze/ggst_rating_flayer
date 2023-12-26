import { DuelHistoryHtmlFetcher } from "./DuelHistoryHtmlFetcher";

describe.skip(DuelHistoryHtmlFetcher.name, () => {
  const fetcher = new DuelHistoryHtmlFetcher("2ECF2BA58568939", "SO");

  it("fetch duel history", async () => {
    const result = await fetcher.fetchHistoryHtml();
    expect(result.length).toBeGreaterThan(0);
  });
});
