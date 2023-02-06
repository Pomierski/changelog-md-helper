import prompts from "prompts";
import { promptAddVNext } from "./promptAddVNext";
import { writeToChangelog } from "./writeToChangelog";

jest.mock("prompts");

afterAll(() => jest.restoreAllMocks());

describe("promptAddVNext", () => {
  it("should add vNext on top of the changelog", async () => {
    const changelogWithoutVNext = `# v5.1.1 2023-01-21`;
    const changelogWithVNext = ["[vNext]", "# v5.1.1 2023-01-21"].join("\n");

    (prompts as unknown as jest.Mock).mockReturnValueOnce({ value: "Yes" });
    await promptAddVNext(changelogWithoutVNext);

    expect(writeToChangelog).toBeCalledWith(changelogWithVNext);
  });
});
