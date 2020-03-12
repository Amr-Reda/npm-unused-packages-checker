const { CLIEngine } = require('eslint');
const fs = require('fs');
const path = require('path');

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

    const testFolder = path.join(__dirname, './');
    // console.log('github.context.workflow ', github.context.);
    // console.log('github.context.repo ', github.context.repo.repo);
    // const content = fs.readFileSync(testFolder, 'utf8')
    // console.log('=ff===================================');
    // console.log(content);
    fs.readdirSync(testFolder).forEach(file => {
        console.log('file=> ',file);
    });

    const cli = new CLIEngine(cliConfig)
    try {
        
        let report = cli.executeOnFiles([path.join(__dirname, './')])
        //console.log(JSON.stringify(report,null,2)); 
        return report
    } catch (error) {
        
        if (error.message.indexOf('No files matching') == -1) {
            //TODO: report problem in the rules
        }else{
            console.log(error);
        }
        return {
            results: []
        }
    }
}

module.exports = check