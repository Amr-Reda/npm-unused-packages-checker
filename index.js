const core = require('@actions/core');
const github = require('@actions/github');
const Check = require('./src/check');
const ResultHandler = require('./src/resultHandler');

try {
    // // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput('who-to-greet');
    // console.log(`Hello ${nameToGreet}!`);
    const ignoredPaths = core.getInput('IGNORE_PATHS');
    const ignoredPackages = core.getInput('IGNORE_PACKAGES');
    console.log('===ignoredPaths=================================');
    console.log(ignoredPaths);
    console.log('====ignoredPackages================================');
    console.log(ignoredPackages);
    console.log('====================================');

    let result = Check(ignoredPaths)
    let packages = ResultHandler(result, ignoredPackages)
    console.log('=======packages=============================');
    console.log(packages);
    console.log('====================================');
    // console.log('=======unUsedPackages=============================');
    // console.log(packages.unUsedPackages);
    // console.log('====================================');
    let NOT_USED_PACKAGES = []
    for (const package in packages) {
        const element = packages[package];
        NOT_USED_PACKAGES.push(...element.unUsedPackages)
    }
    core.setOutput("NOT_USED_PACKAGES", NOT_USED_PACKAGES);
    
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