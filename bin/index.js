#!/usr/bin/env node
var $85X2E$fs = require("fs");
var $85X2E$colorette = require("colorette");
var $85X2E$commander = require("commander");
var $85X2E$process = require("process");
var $85X2E$prompts = require("prompts");
var $85X2E$dayjs = require("dayjs");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


const $8cbd1eaec36e2e6d$var$addNewLine = (...message)=>[
        message.join(" "),
        "\n"
    ].join("");
const $8cbd1eaec36e2e6d$export$4ec46b9b3cbfa90d = (message)=>{
    return console.log($8cbd1eaec36e2e6d$var$addNewLine("❌", (0, $85X2E$colorette.redBright)(message)));
};
const $8cbd1eaec36e2e6d$export$8584db4328e417e4 = (message)=>{
    return console.log($8cbd1eaec36e2e6d$var$addNewLine("✅", (0, $85X2E$colorette.greenBright)(message)));
};
const $8cbd1eaec36e2e6d$export$c7032226c7cf3d7e = (message)=>{
    return console.log($8cbd1eaec36e2e6d$var$addNewLine("⚠️ ", (0, $85X2E$colorette.yellow)(message)));
};
const $8cbd1eaec36e2e6d$export$94593080f38cba85 = (message)=>{
    return console.log($8cbd1eaec36e2e6d$var$addNewLine("➡️ ", (0, $85X2E$colorette.blueBright)(message)));
};



let $ab524afc1251b862$export$edaba8d4c8315ba9;
(function(CLIOptions) {
    CLIOptions["SortOnly"] = "sortOnly";
})($ab524afc1251b862$export$edaba8d4c8315ba9 || ($ab524afc1251b862$export$edaba8d4c8315ba9 = {}));
(0, $85X2E$commander.program).option("-so, --sort-only");
(0, $85X2E$commander.program).parse();
const $ab524afc1251b862$export$41c562ebe57d11e2 = (0, $85X2E$commander.program).opts();




const $b230331649d86c72$export$ac06849afc88652c = "1.0.0";
const $b230331649d86c72$export$75ee7eed75a3ca85 = "1111-11-11";
const $b230331649d86c72$export$70f1a05ef05bbe0e = "yyyy-mm-dd";
const $b230331649d86c72$export$3f045e5308d39dc6 = "./cmh-config.json";


var $486eb4c372e6c705$exports = {};
$486eb4c372e6c705$exports = JSON.parse('{"vNextTemplate":"[vNext]","releaseTemplate":"v$version_placeholder $date_placeholder","majorTemplate":"[MAJOR]","minorTemplate":"[MINOR]","patchTemplate":"[PATCH]","useRegexInTemplates":false,"parseTemplatesToRegex":false,"dateFormat":"YYYY-MM-DD","bumpMinorByMajor":false,"bumpMinorByPatch":false,"sortChangelog":true,"changelogPath":"./changelog.md","displayExampleCommit":true}');


const $dbbd2011d5b106ce$var$getConfig = ()=>{
    let config = (0, (/*@__PURE__*/$parcel$interopDefault($486eb4c372e6c705$exports)));
    try {
        const userConfig = JSON.parse((0, $85X2E$fs.readFileSync)((0, $b230331649d86c72$export$3f045e5308d39dc6), "utf-8"));
        config = {
            ...config,
            ...userConfig
        };
    } catch (e) {
        (0, $8cbd1eaec36e2e6d$export$c7032226c7cf3d7e)(`Couldn't read user config from ${(0, $b230331649d86c72$export$3f045e5308d39dc6)}, using default config instead...`);
    }
    return config;
};
var $dbbd2011d5b106ce$export$2e2bcd8739ae039 = $dbbd2011d5b106ce$var$getConfig();





const $44498b34709b50cb$export$e94232959a208181 = (text)=>{
    const cleanedText = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const textWithNumbers = cleanedText.replace(/\d+/g, "\\d+");
    return new RegExp(textWithNumbers);
};


const $d1aa033ea3d13926$export$81a4d685968e6dfc = (template, compare)=>{
    if ((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).useRegexInTemplates) return Boolean(compare.match(new RegExp(template)));
    if ((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).parseTemplatesToRegex) return Boolean(compare.match((0, $44498b34709b50cb$export$e94232959a208181)(template)));
    return compare.includes(template);
};



let $02461ac332dfcb29$export$61f88f9e23a8bfec;
(function(ConfigPlaceholder) {
    ConfigPlaceholder["version"] = "$version_placeholder";
    ConfigPlaceholder["date"] = "$date_placeholder";
})($02461ac332dfcb29$export$61f88f9e23a8bfec || ($02461ac332dfcb29$export$61f88f9e23a8bfec = {}));


const $4a3cf6bd51a9aabc$export$58aa7f5f44abf923 = ()=>{
    const releaseTemplate = (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).releaseTemplate.split(" ");
    const dateIndex = releaseTemplate.findIndex((line)=>line.includes((0, $02461ac332dfcb29$export$61f88f9e23a8bfec).date));
    if (dateIndex === -1) return false;
    const versionIndex = releaseTemplate.findIndex((line)=>line.includes((0, $02461ac332dfcb29$export$61f88f9e23a8bfec).version));
    return dateIndex < versionIndex;
};


const $a8dc60a15150d424$export$1b7d2af405092014 = /\d+\.\d+\.\d+/g;


const $ef2f1bb1617f407c$var$getUpdatedVersion = (version, bump)=>{
    const nextVersion = {
        ...version
    };
    if ((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).bumpMinorByMajor && bump === "major") bump = "minor";
    else if ((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).bumpMinorByPatch && bump === "patch") bump = "minor";
    nextVersion[bump] += 1;
    if (bump === "major") nextVersion["minor"] = 0;
    if (bump === "major" || bump === "minor") nextVersion["patch"] = 0;
    return Object.values(nextVersion).join(".");
};
const $ef2f1bb1617f407c$export$81c6f82fa2331919 = (changelogChunks)=>{
    const dateFormatIncludesDots = (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).dateFormat.includes(".");
    const correctVersionIndex = dateFormatIncludesDots && (0, $4a3cf6bd51a9aabc$export$58aa7f5f44abf923)() ? 1 : 0;
    let latestReleaseVersion;
    try {
        const matchedVersion = [
            ...changelogChunks.latestReleaseHeader.matchAll((0, $a8dc60a15150d424$export$1b7d2af405092014))
        ];
        if (matchedVersion.length === 1 && dateFormatIncludesDots) {
            (0, $8cbd1eaec36e2e6d$export$4ec46b9b3cbfa90d)("Couldn't find version in latest release entry. Check your config");
            process.exit();
        }
        latestReleaseVersion = matchedVersion[correctVersionIndex];
    } catch (error) {
        (0, $8cbd1eaec36e2e6d$export$4ec46b9b3cbfa90d)("Couldn't find version in latest release entry. Check your config");
        process.exit();
    }
    const [latestReleaseMajor, latestReleaseMinor, latestReleasePatch] = latestReleaseVersion[0].split(".");
    const lastVersion = {
        major: parseInt(latestReleaseMajor),
        minor: parseInt(latestReleaseMinor),
        patch: parseInt(latestReleasePatch)
    };
    const majorFound = changelogChunks.vNext.find((line)=>(0, $d1aa033ea3d13926$export$81a4d685968e6dfc)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).majorTemplate, line));
    if (majorFound) return $ef2f1bb1617f407c$var$getUpdatedVersion(lastVersion, "major");
    const minorFound = changelogChunks.vNext.find((line)=>(0, $d1aa033ea3d13926$export$81a4d685968e6dfc)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).minorTemplate, line));
    if (minorFound) return $ef2f1bb1617f407c$var$getUpdatedVersion(lastVersion, "minor");
    const patchFound = changelogChunks.vNext.find((line)=>(0, $d1aa033ea3d13926$export$81a4d685968e6dfc)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).patchTemplate, line));
    if (patchFound) return $ef2f1bb1617f407c$var$getUpdatedVersion(lastVersion, "patch");
    (0, $8cbd1eaec36e2e6d$export$4ec46b9b3cbfa90d)("Couldn't find any changelog entry that fits into MAJOR/MINOR/PATCH criteria.");
    process.exit();
};













const $311b7d6d8e55fe72$export$227034c7a00fd68 = async (content)=>{
    return new Promise((resolve, reject)=>{
        (0, $85X2E$fs.writeFile)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).changelogPath, content, (err)=>{
            if (err) {
                (0, $8cbd1eaec36e2e6d$export$4ec46b9b3cbfa90d)(`Couldn't write changelog to ${(0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).changelogPath}. Check your config or anylize this error message`);
                console.error(err);
                reject(process.exit());
            }
            (0, $8cbd1eaec36e2e6d$export$8584db4328e417e4)(`Successfuly saved changes to ${(0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).changelogPath}`);
            resolve(process.exit());
        });
    });
};


let $3d3691e1ce0b849e$var$Choices;
(function(Choices) {
    Choices["Yes"] = "Yes";
    Choices["No"] = "No";
})($3d3691e1ce0b849e$var$Choices || ($3d3691e1ce0b849e$var$Choices = {}));
const $3d3691e1ce0b849e$export$a938f0c8ea4b7535 = async (data)=>{
    const response = await (0, ($parcel$interopDefault($85X2E$prompts)))({
        type: "select",
        name: "value",
        message: "Couldn't find vNext entry to replace it with proper version. Would you like to add vNext entry instead?",
        choices: [
            {
                title: $3d3691e1ce0b849e$var$Choices.Yes,
                value: $3d3691e1ce0b849e$var$Choices.Yes
            },
            {
                title: $3d3691e1ce0b849e$var$Choices.No,
                value: $3d3691e1ce0b849e$var$Choices.No
            }
        ]
    });
    if (response.value === $3d3691e1ce0b849e$var$Choices.No) (0, ($parcel$interopDefault($85X2E$process))).exit();
    const changelogWithVNextAdded = [
        (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).vNextTemplate,
        data
    ].join("\n");
    await (0, $311b7d6d8e55fe72$export$227034c7a00fd68)(changelogWithVNextAdded);
};




const $359d2f9e44af69a7$var$isMajor = (line)=>(0, $d1aa033ea3d13926$export$81a4d685968e6dfc)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).majorTemplate, line);
const $359d2f9e44af69a7$var$isMinor = (line)=>(0, $d1aa033ea3d13926$export$81a4d685968e6dfc)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).minorTemplate, line);
const $359d2f9e44af69a7$var$isPatch = (line)=>(0, $d1aa033ea3d13926$export$81a4d685968e6dfc)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).patchTemplate, line);
const $359d2f9e44af69a7$var$isTemplateLine = (line)=>$359d2f9e44af69a7$var$isMajor(line) || $359d2f9e44af69a7$var$isMinor(line) || $359d2f9e44af69a7$var$isPatch(line);
const $359d2f9e44af69a7$var$majorCompareFn = (a, b)=>{
    if ($359d2f9e44af69a7$var$isMajor(a) && !$359d2f9e44af69a7$var$isMajor(b)) return -1;
    if (!$359d2f9e44af69a7$var$isMajor(a) && $359d2f9e44af69a7$var$isMajor(b)) return 1;
    return 0;
};
const $359d2f9e44af69a7$var$minorCompareFn = (a, b)=>{
    if ($359d2f9e44af69a7$var$isMinor(a) && $359d2f9e44af69a7$var$isPatch(b)) return -1;
    if ($359d2f9e44af69a7$var$isPatch(a) && $359d2f9e44af69a7$var$isMinor(b)) return 1;
    return 0;
};
const $359d2f9e44af69a7$export$62f2192059252b2f = (vNext)=>{
    const startIndex = vNext.findIndex((line)=>$359d2f9e44af69a7$var$isTemplateLine(line));
    const vNextCopy = [
        ...vNext.slice(startIndex)
    ];
    const chunks = [];
    while(vNextCopy.length > 0){
        const startIndex = vNextCopy.findIndex($359d2f9e44af69a7$var$isTemplateLine);
        const endIndex = vNextCopy.findIndex((line, index)=>$359d2f9e44af69a7$var$isTemplateLine(line) && index !== startIndex);
        if (startIndex === -1 || endIndex === -1) {
            if (vNextCopy.length > 0) {
                const reverseVNext = [
                    ...vNextCopy
                ];
                reverseVNext.reverse();
                const lastNotNewLineIndex = reverseVNext.findIndex((line)=>line.trim().match(/[^\n\r]/));
                if (lastNotNewLineIndex === -1) {
                    chunks.push(vNextCopy.splice(0, vNextCopy.length));
                    break;
                }
                chunks.push(vNextCopy.splice(0, vNextCopy.length - lastNotNewLineIndex));
            }
            break;
        }
        chunks.push(vNextCopy.splice(startIndex, endIndex === -1 ? 1 : endIndex - startIndex));
    }
    chunks.sort((a, b)=>$359d2f9e44af69a7$var$majorCompareFn(a[0], b[0]));
    chunks.sort((a, b)=>$359d2f9e44af69a7$var$minorCompareFn(a[0], b[0]));
    return [
        ...vNext.slice(0, startIndex),
        ...chunks.flat(),
        ...vNextCopy
    ];
};


const $ce9b4c382e4e132f$export$c9f33bc612d5c4ef = async (changelogData)=>{
    const lines = changelogData.split("\n");
    const vNextIndex = lines.findIndex((line)=>(0, $d1aa033ea3d13926$export$81a4d685968e6dfc)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).vNextTemplate, line));
    if (vNextIndex === -1) await (0, $3d3691e1ce0b849e$export$a938f0c8ea4b7535)(changelogData);
    const latestReleaseTemplate = (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).releaseTemplate.replace((0, $02461ac332dfcb29$export$61f88f9e23a8bfec).version, (0, $b230331649d86c72$export$ac06849afc88652c)).replace((0, $02461ac332dfcb29$export$61f88f9e23a8bfec).date, (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).dateFormat.replace(/[A-Za-z0-9]/g, "1"));
    const latestReleaseIndex = lines.findIndex((line)=>line.match((0, $44498b34709b50cb$export$e94232959a208181)(latestReleaseTemplate)));
    const vNextChunk = lines.slice(vNextIndex, latestReleaseIndex);
    const vNext = (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).sortChangelog ? (0, $359d2f9e44af69a7$export$62f2192059252b2f)(vNextChunk) : vNextChunk;
    return {
        vNext: vNext,
        latestReleaseHeader: lines[latestReleaseIndex],
        fullLog: (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).sortChangelog ? [
            ...vNext,
            ...lines.slice(latestReleaseIndex)
        ].join("\n") : changelogData
    };
};








const $50a23704e23e8ec2$export$14e5b97737ae64cd = (template, headerConfig)=>{
    if (!headerConfig.version) {
        (0, $8cbd1eaec36e2e6d$export$4ec46b9b3cbfa90d)(`Couldn't find vNext or lastest version.`);
        process.exit();
    }
    const replaceVersion = template.replace((0, $02461ac332dfcb29$export$61f88f9e23a8bfec).version, headerConfig.version);
    const releaseHeader = headerConfig.isDateInTemplate ? replaceVersion.replace((0, $02461ac332dfcb29$export$61f88f9e23a8bfec).date, (0, ($parcel$interopDefault($85X2E$dayjs)))().format((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).dateFormat)) : replaceVersion;
    if ((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).displayExampleCommit) (0, $8cbd1eaec36e2e6d$export$94593080f38cba85)(`Example commit msg: ${releaseHeader}`);
    return releaseHeader;
};



const $e9c53ff4f741c35a$export$eb72eb17eaa79c14 = (data, version)=>{
    const vNextTemplate = (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).useRegexInTemplates ? new RegExp((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).vNextTemplate) : (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).vNextTemplate;
    const isDateInTemplate = (0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).releaseTemplate.includes((0, $02461ac332dfcb29$export$61f88f9e23a8bfec).date);
    return data.replace(vNextTemplate, (0, $50a23704e23e8ec2$export$14e5b97737ae64cd)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).releaseTemplate, {
        version: version,
        isDateInTemplate: isDateInTemplate
    }));
};


(0, $85X2E$fs.readFile)((0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).changelogPath, "utf8", async (err, data)=>{
    if (err) {
        (0, $8cbd1eaec36e2e6d$export$4ec46b9b3cbfa90d)(`Couldn't find or read ${(0, $dbbd2011d5b106ce$export$2e2bcd8739ae039).changelogPath}. Check your config`);
        console.error(err);
        process.exit(1);
    }
    const requiredChangelogChunks = await (0, $ce9b4c382e4e132f$export$c9f33bc612d5c4ef)(data);
    const releaseVersion = (0, $ef2f1bb1617f407c$export$81c6f82fa2331919)(requiredChangelogChunks);
    if ((0, $ab524afc1251b862$export$41c562ebe57d11e2)[(0, $ab524afc1251b862$export$edaba8d4c8315ba9).SortOnly]) await (0, $311b7d6d8e55fe72$export$227034c7a00fd68)(requiredChangelogChunks.fullLog);
    await (0, $311b7d6d8e55fe72$export$227034c7a00fd68)((0, $e9c53ff4f741c35a$export$eb72eb17eaa79c14)(requiredChangelogChunks.fullLog, releaseVersion));
});


//# sourceMappingURL=index.js.map
