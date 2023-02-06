import { $testUtils } from "../test-utils/testUtils";
import { ConfigPlaceholder } from "../types/configPlaceholder";
import { getRequiredChangelogChunks } from "./getRequiredChangelogChunks";

afterAll(() => {
  $testUtils.resetConfig();
});

describe("getRequiredChangelogChunks", () => {
  it("should return proper chunks of changelog", async () => {
    $testUtils.overrideConfigValues({
      vNextTemplate: "vNext",
      releaseTemplate: `${ConfigPlaceholder.version} ${ConfigPlaceholder.date}`,
      sortChangelog: false,
    });

    const vNextChunkMock = `vNext
        - [MAJOR] major patch
        - [MINOR] minor patch
            - minor patch description
    
        
        additional description
    `;

    const latestReleaseHeaderMock = "1.0.0 2023-02-02";

    const changelogMock = `${vNextChunkMock}
    ${latestReleaseHeaderMock}`;

    const requiredChangelogChunks = await getRequiredChangelogChunks(
      changelogMock
    );

    expect(requiredChangelogChunks.vNext.join("\n")).toBe(vNextChunkMock);
    expect(requiredChangelogChunks.latestReleaseHeader.trim()).toBe(
      latestReleaseHeaderMock
    );
    expect(requiredChangelogChunks.fullLog).toBe(changelogMock);
  });
});
