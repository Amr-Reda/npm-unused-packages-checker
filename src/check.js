const { CLIEngine } = require('eslint');

const check = (ignoredPaths) => {

    let cliConfig = {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
        cwd: __dirname,
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
        let report = cli.executeOnFiles([process.cwd() + '/'])
        return report
    } catch (error) {
        
        if (error.message.indexOf('No files matching') != -1) {
            console.log(error);
        }

        return {
            results: []
        }
    }
}

module.exports = check