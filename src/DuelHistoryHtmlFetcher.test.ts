import { DuelHistoryHtmlFetcher } from "./DuelHistoryHtmlFetcher";

describe(DuelHistoryHtmlFetcher.name, () => {
  const fetcher = new DuelHistoryHtmlFetcher("2ECF2BA58568939", "SO");
  it("fetch duel history", async () => {
    expect(async () => {
      await fetcher.fetchHistoryHtml();
    }).not.toThrow();
  });
});
