const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
    // // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput('who-to-greet');
    // console.log(`Hello ${nameToGreet}!`);

    core.setOutput("NOT_USED_PACKAGES", "test");
    
    const testFolder = '/home/runner/work/with-packagelock/with-packagelock';
    console.log('github.context.workflow ', github.context.workflow);
    console.log(github.context.repo.repo);
    
    fs.readdirSync(testFolder).forEach(file => {
      console.log(file);
    });
    // fs.readdirSync('/').forEach(file => {
    //   console.log(file);
    // });
    //   // Get the JSON webhook payload for the event that triggered the workflow
    //   const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`);
    
} catch (error) {
    core.setFailed(error.message);
}