const core = require('@actions/core');
const Check = require('./src/check');
const ResultHandler = require('./src/resultHandler');

try {

    let ignoredPaths = core.getInput('IGNORE_PATHS');
    let ignoredPackages = core.getInput('IGNORE_PACKAGES');

    if (ignoredPaths) ignoredPaths = JSON.parse(ignoredPaths)
    if (ignoredPackages) ignoredPackages = JSON.parse(ignoredPackages)

    let result = Check(ignoredPaths)
    let packages = ResultHandler(result, ignoredPackages)

    let NOT_USED_PACKAGES = []
    for (const package in packages) {
        const element = packages[package];
        console.log('- IN ' + package);
        console.log('  > UNUSED PACKAGES: [ ' + element.unUsedPackages + ' ]');
        console.log('  > USED PACKAGES: [ ' + element.usedPackages + ' ]');
        
        NOT_USED_PACKAGES.push(...element.unUsedPackages)
    }
    core.setOutput("NOT_USED_PACKAGES", JSON.stringify(NOT_USED_PACKAGES));
    
} catch (error) {
    core.setFailed(error.message);
}