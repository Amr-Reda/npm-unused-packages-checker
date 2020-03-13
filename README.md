# NPM Unused Packages Checker Action

Github action check for dependencies in package.json that not used in the code.

## Inputs

### `IGNORE_PATTERNS`

**Optional** List of Glob patterns for paths to ignore. Default `[]`.

### `IGNORE_PACKAGES`

**Optional** List of packages that exist in package.json and not used in the code to ignore and mark them as used. Default `[]`.

## Outputs

### `NOT_USED_PACKAGES`

List of packages in package.json and not used in the code.

## Example usage

```yml
- uses: actions/checkout@v1
- name: packages check
  uses: Amr-Reda/npm-unused-packages-checker@v1
  with:
    IGNORE_PACKAGES:  '["jade"]'
    IGNORE_PATHS:  '["/test"]'
```

## TODO:

- [ ] Generate pull request to remove unused package from package.json