import { $testUtils } from "../test-utils/testUtils";
import { getRequiredChangelogChunks } from "./getRequiredChangelogChunks";
import { sortChangelog } from "./sortChangelog";

afterAll(() => {
  $testUtils.resetConfig();
});

const mockedChangelog = `
# [vNext]

[MINOR] Minor change
    - minor change description

[MAJOR] Major change
    - major change description
    - major change description
    - major change description

[PATCH] Patch change
[MAJOR] Major change

[MINOR] Minor change

# v5.1.1 2023-01-21
`;

const mockedSortedChangelog = `
# [vNext]

[MAJOR] Major change
    - major change description
    - major change description
    - major change description

[MAJOR] Major change

[MINOR] Minor change
    - minor change description

[MINOR] Minor change
[PATCH] Patch change

# v5.1.1 2023-01-21
`;

describe("sortChangelog", () => {
  test("sorting", async () => {
    $testUtils.overrideConfigValues({
      releaseTemplate: "v$version_placeholder $date_placeholder",
    });
    const changelogChunks = await getRequiredChangelogChunks(mockedChangelog);
    const sortedChanglogChunks = await getRequiredChangelogChunks(
      mockedSortedChangelog
    );
    const sortedChangelog = sortChangelog(changelogChunks.vNext);

    expect(sortedChangelog).toEqual(sortedChanglogChunks.vNext);
  });
});
