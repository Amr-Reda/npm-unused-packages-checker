const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const Check = require('./src/check');
const ResultHandler = require('./src/resultHandler');
const path = require('path');

try {
    // // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput('who-to-greet');
    // console.log(`Hello ${nameToGreet}!`);
    const ignoredPaths = core.getInput('IGNORE_PATHS');
    const ignoredPackages = core.getInput('IGNORE_PACKAGES');

    let result = Check(ignoredPaths)
    let usedPackages = ResultHandler(result)
    console.log('=======usedPackages=============================');
    console.log(usedPackages);
    console.log('====================================');
    core.setOutput("NOT_USED_PACKAGES", "test");
    
    // const testFolder = './';
    // // console.log('github.context.workflow ', github.context.);
    // // console.log('github.context.repo ', github.context.repo.repo);
    // // const content = fs.readFileSync(testFolder, 'utf8')
    // // console.log('=ff===================================');
    // // console.log(content);
    // fs.readdirSync(testFolder).forEach(file => {
    //     console.log('file ',file);
    // });
    // console.log('====================================');
    // let dir = path.join(__dirname, testFolder)
    // fs.readdirSync('/').forEach(file => {
    //   console.log('file2 ',file);
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