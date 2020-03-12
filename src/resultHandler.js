const fs = require('fs');
const path = require('path')

const resultHandler = (report) => {

    // get all dependencies names that used by developer code
    let packages = []
    for (const key in report.results) {
        const file = report.results[key]

        file.messages.map((ruleObj) => {         

            if (ruleObj.ruleId != 'package-detection/package-detection') return

            if (!packages.includes(ruleObj.message)) packages.push(ruleObj.message)

        })
    }

    // get all files paths in the repo
    // then filter paths to package.json files only
    // !let repoFullPath = __dirname + '/../'
    let repoFullPath = process.cwd()
    let allFilesPaths = getAllFiles(repoFullPath)
    let allPackagesJsonPaths = []
    for (const filePath of allFilesPaths) {
        if (filePath.lastIndexOf('package.json') == filePath.length - 12) {
            allPackagesJsonPaths.push(filePath)
        }
    }
    
    // read all the package.json of the repo
    // then get the dependencies in the package.json and compare it with package required in the code
    let results = {}
    for (let packageJsonPath of allPackagesJsonPaths) {
        let packageDependencies = getPackages(packageJsonPath)
        packageJsonPath = packageJsonPath.replace(repoFullPath, '')

        // get used dependencies in the package.json
        for (const pkg of packages) {
            if (packageDependencies && packageDependencies[pkg]) {
                if (!results[packageJsonPath]) {                    
                    results[packageJsonPath] = {
                        usedPackages: [],
                        unUsedPackages: []
                    }
                }
                results[packageJsonPath].usedPackages.push(pkg)
            }
        }

        // get unused dependencies in the package.json
        for (const pkgName in packageDependencies) {
            if (results[packageJsonPath] && !results[packageJsonPath].usedPackages.includes(pkgName)) {
                results[packageJsonPath].unUsedPackages.push(pkgName)
            }
        }
        
    }
    
    return results;
}

const getPackages = (filePath) => {
    try {
        let content = fs.readFileSync(filePath, 'utf8')
        content = JSON.parse(content)
        return content.dependencies
    } catch (error) {
        console.log(error);
        
        return
    }
}

/**
 * Find all files inside a dir, recursively.
 * @function getAllFiles
 * @param  {string} dir Dir path string.
 * @return {string[]} Array with all file names that are inside the directory.
 */
const getAllFiles = dir =>
	fs.readdirSync(dir).reduce((files, file) => {
		const name = path.join(dir, file)
		const isDirectory = fs.statSync(name).isDirectory()
		return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name]
	}, [])


module.exports = resultHandler
