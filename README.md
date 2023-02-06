# changelog-md-helper

The changelog-md-helper is a tool for maintaining a changelog file for a software project. The library provides functions for setting the correct Semantic Versioning (SemVer) version on top of the changelog and sorting the entries within the file.

The library is designed to make it easy for developers to keep their changelog file organized and up-to-date, ensuring that the changelog accurately reflects the development history of the project.

By using this library, developers can save time and reduce the risk of manual errors when updating their changelog file.

## Usage

Add changelog helper to your dependencies

```js
npm install --save-dev changelog-md-helper
yarn add --dev changelog-md-helper
```

Add changelog helper as your package.json script

```json
"scripts": {
    "changelog:release": "changelog-md-helper",
    "changelog:sort": "changelog-md-helper --sort-only"
}
```

```ts
yarn changelog:release
// or
yarn changelog:sort
```

## Config 

You can find default values for changelog in [default-config.json](https://github.com/Pomierski/xyz/blob/main/src/default-config.json). *Remember that default values will be used for all options that weren't set*

- `vNextTemplate`: This is the string template that will be used to find and represent the next version that is yet to be released.

- `releaseTemplate`: This is the string template that will be used to represent a released version, with $version_placeholder to be replaced by the version number and $date_placeholder to be replaced by the release date.

- `majorTemplate`: This is the string template that will be used to find a major version change in the changelog.

- `minorTemplate`: This is the string template that will be used to find a minor version change in the changelog.

- `patchTemplate`: This is the string template that will be used to find a patch version change in the changelog.

- `useRegexInTemplates`: This is a boolean value that indicates whether regular expressions can be used in the templates.

- `parseTemplatesToRegex`: This is a boolean value that indicates whether the templates should be parsed as regular expressions.

- `dateFormat`: This is a string that specifies the date format to be used in the releaseTemplate. 
    - day.js is being used for handling date: https://day.js.org/docs/en/display/format

- `bumpMinorByMajor`: This is a boolean value that indicates whether a minor version should be bumped when a major version is bumped.

- `bumpMinorByPatch`: This is a boolean value that indicates whether a minor version should be bumped when a patch version is bumped.

- `sortChangelog`: This is a boolean value that indicates whether the changelog should be sorted in a particular order.

- `changelogPath`: This is a string that specifies the path to the changelog file.

- `displayExampleCommit`: This is a boolean value that indicates whether an example commit should be displayed.

## Options

- `[-so, --sort-only]` option allows the user to sort the changelog without setting a new version header. This option is meant for situations where the user wants to reorganize the existing entries in the changelog, but does not want to release a new version.


### Special thanks
  
- ChatGPT for this readme.md :P