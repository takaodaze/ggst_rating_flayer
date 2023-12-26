const testFunc = (a: number, b: number) => {
  return a + b;
};

describe("sample", () => {
  it("testFunc(a,b)", () => {
    expect(testFunc(3, 5)).toEqual(8);
  });
});
