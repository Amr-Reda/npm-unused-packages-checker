const { CLIEngine } = require('eslint');

const check = (ignoredPaths) => {
    let cliConfig = {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
        baseConfig: {
            parser: "@typescript-eslint/parser",
            env: {
                node: true,
                es6: true
            },
            parserOptions: {
                "sourceType": "module",
                ecmaVersion: 10,
                ecmaFeatures: {
                    jsx: true
                }
            },
            plugins: [
                "package-detection"
            ],
            rules: {
                "package-detection/package-detection": 2
            },
            ignorePatterns: ignoredPaths
        },
        useEslintrc: false,
    }

    const cli = new CLIEngine(cliConfig)
    try {
        let report = cli.executeOnFiles(['../'])
        //console.log(JSON.stringify(report,null,2)); 
        return report
    } catch (error) {
        // if (error.message.indexOf('No files matching') == -1) {
        //     //TODO: report problem in the rules
        // }
        return {
            results: []
        }
    }
}

module.exports = check