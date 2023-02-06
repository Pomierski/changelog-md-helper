import { Config } from "../config";
import { $testUtils } from "../test-utils/testUtils";
import { ConfigPlaceholder } from "../types/configPlaceholder";
import { getReleaseVersion } from "./getReleaseVersion";
import { getRequiredChangelogChunks } from "./getRequiredChangelogChunks";

afterEach(() => {
  $testUtils.resetConfig();
});

const getChangelogMocks = async (config: Config, releaseTemplate: string) => {
  const changelogWithMajorChunksMock = await getRequiredChangelogChunks(`
    ${config.vNextTemplate}

    ${config.majorTemplate}

    ${releaseTemplate}
`);

  const changelogWithMinorChunksMock = await getRequiredChangelogChunks(`
    ${config.vNextTemplate}

    ${config.minorTemplate}

    ${releaseTemplate}
`);

  const changelogWithPatchChunksMock = await getRequiredChangelogChunks(`
    ${config.vNextTemplate}

    ${config.patchTemplate}

    ${releaseTemplate}
`);

  return {
    changelogWithMajorChunksMock,
    changelogWithMinorChunksMock,
    changelogWithPatchChunksMock,
  };
};

describe("getReleaseVersion", () => {
  it("should return next major version", async () => {
    const { config } = $testUtils.getConfig();
    const { changelogWithMajorChunksMock } = await getChangelogMocks(
      config,
      "v5.4.0 2022-02-02"
    );

    expect(getReleaseVersion(changelogWithMajorChunksMock)).toBe("6.0.0");
  });
  it("should return next minor version", async () => {
    const { config } = $testUtils.getConfig();
    const { changelogWithMinorChunksMock } = await getChangelogMocks(
      config,
      "v5.4.0 2022-02-02"
    );

    expect(getReleaseVersion(changelogWithMinorChunksMock)).toBe("5.5.0");
  });
  it("should return next patch version", async () => {
    const { config } = $testUtils.getConfig();
    const { changelogWithPatchChunksMock } = await getChangelogMocks(
      config,
      "v5.4.0 2022-02-02"
    );

    expect(getReleaseVersion(changelogWithPatchChunksMock)).toBe("5.4.1");
  });
  it("should return next minor version for major change if config.bumpMinorByMajor is set to true", async () => {
    const { config } = $testUtils.getConfig();
    const { changelogWithMajorChunksMock } = await getChangelogMocks(
      config,
      "v5.4.0 2022-02-02"
    );

    $testUtils.overrideConfigValues({ bumpMinorByMajor: true });

    expect(getReleaseVersion(changelogWithMajorChunksMock)).toBe("5.5.0");
  });
  it("should return next minor version for patch change if config.bumpMinorByPatch is set to true", async () => {
    const { config } = $testUtils.overrideConfigValues({
      bumpMinorByPatch: true,
    });

    const { changelogWithPatchChunksMock } = await getChangelogMocks(
      config,
      "v5.4.0 2022-02-02"
    );

    expect(getReleaseVersion(changelogWithPatchChunksMock)).toBe("5.5.0");
  });
  describe("Date position in template", () => {
    it("should distinguish date format with dots from version", async () => {
      const { config } = $testUtils.overrideConfigValues({
        dateFormat: "YYYY.MM.DD",
        releaseTemplate: `${ConfigPlaceholder.date} v${ConfigPlaceholder.version}`,
      });

      const { changelogWithPatchChunksMock } = await getChangelogMocks(
        config,
        "2022.02.02 v5.4.0"
      );

      expect(getReleaseVersion(changelogWithPatchChunksMock)).toBe("5.4.1");
    });

    it("should handle template without date", async () => {
      const { config } = $testUtils.overrideConfigValues({
        dateFormat: "",
        releaseTemplate: `v${ConfigPlaceholder.version}`,
      });

      const { changelogWithPatchChunksMock } = await getChangelogMocks(
        config,
        "v5.4.0"
      );

      expect(getReleaseVersion(changelogWithPatchChunksMock)).toBe("5.4.1");
    });
  });
});
