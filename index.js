const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const Check = require('./src/check');

try {
    // // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput('who-to-greet');
    // console.log(`Hello ${nameToGreet}!`);
    const ignoredPaths = core.getInput('IGNORE_PATHS');
    const ignoredPackages = core.getInput('IGNORE_PACKAGES');

    let result = Check(ignoredPaths)
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    core.setOutput("NOT_USED_PACKAGES", "test");
    
    const testFolder = __dirname + '/package.json';
    // console.log('github.context.workflow ', github.context.);
    // console.log('github.context.repo ', github.context.repo.repo);
    const content = fs.readFileSync(testFolder, 'utf8')
    console.log('=ff===================================');
    console.log(content);
    console.log('====================================');
    // fs.readdirSync(testFolder).forEach(file => {
    //   console.log('file ',file);
    // });
    // fs.readdirSync('/').forEach(file => {
    //   console.log(file);
    // });
    //   // Get the JSON webhook payload for the event that triggered the workflow
    //   const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`);
    
} catch (error) {
    core.setFailed(error.message);
}