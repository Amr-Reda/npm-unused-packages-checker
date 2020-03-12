const fs = require('fs');
const path = require('path')

const resultHandler = (report) => {
    let repoFullPath = process.cwd()
    // let repoFullPath = __dirname + '/../'
    // // let repoFullPath = __dirname
    let usedPackages = []
    let packages = []

    for (const key in report.results) {
        const file = report.results[key]

        let filePath = file.filePath.replace(repoFullPath, '');

        file.messages.map((ruleObj) => {         

            if (ruleObj.ruleId != 'package-detection/package-detection') return

            if (!packages.includes(ruleObj.message)) packages.push(ruleObj.message)

        })
    }

    let allFilesPaths = getAllFiles(repoFullPath)

    let allPackagesJsonPaths = []
    for (const filePath of allFilesPaths) {
        if (filePath.lastIndexOf('package.json') == filePath.length - 12) {
            allPackagesJsonPaths.push(filePath)
        }
    }
    
    for (const packageJsonPath of allPackagesJsonPaths) {
        let packageDependencies = getPackages(packageJsonPath)

        for (const pkg of packages) {
            if (packageDependencies && packageDependencies[pkg]) {
                usedPackages.push({
                    package_name: pkg,
                    package_manager_path: packageJsonPath.replace(repoFullPath, '')
                })
            }
        }
        
    }

    return usedPackages;
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
