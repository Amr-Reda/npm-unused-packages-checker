const { CLIEngine } = require('eslint');
const fs = require('fs');
const path = require('path');

const check = (ignoredPaths) => {
    console.log('====================================');
    console.log(__dirname);
    console.log('====================================');
    let cliConfig = {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
        resolvePluginsRelativeTo: '/home/runner/work/_actions/Amr-Reda/npm-unused-packages-checker/master/src',
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

    const testFolder = '/home/runner/work/with-packagelock/with-packagelock/';
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
        
        let report = cli.executeOnFiles(['/home/runner/work/with-packagelock/with-packagelock/'])
        //console.log(JSON.stringify(report,null,2)); 
        return report
    } catch (error) {
        
        if (error.message.indexOf('No files matching') == -1) {
            //TODO: report problem in the rules
            console.log(error);
        }else{
            console.log(error);
        }
        return {
            results: []
        }
    }
}

module.exports = check