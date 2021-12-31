import { fileListFile, repoListFile, cleanArgs, getArgValue, getCurrentDirectory } from "/gitburner/lib.js"

/** @type {NS} ns */
let ns

/** @param {NS} ns **/
export async function main(ns_) {
    ns = ns_
    let args = cleanArgs(ns.args)
    let currentDir = getCurrentDirectory()
    if (args < 1 && currentDir == null) {
        ns.tprint("Repository not provided")
        return
    }
    let repoList = ns.read(repoListFile)
    /** @type {Object.<string, string>} */
    let repos = {}
    if (repoList != '') repos = JSON.parse(repoList)
    let repoData = args[0]?.split("/")
    let author = repoData?.at(0)
    let repo = repoData?.at(1)
    let branch = getArgValue(ns.args, "main", "branch", "b")
    if ((author == undefined || repo == undefined) && currentDir != null) {
        let key = Object.keys(repos).find((p) => repos[p] == currentDir + "/")
        if(key == undefined) {
            ns.tprint("Could not find repository at current directory")
            return
        }
        repoData = key.split("@")[1].split("/")
        author = repoData[0]
        repo = repoData[1]
        ns.tprint(author, repo)
        branch = key.split("@")[0]
    } else {
        ns.tprint("Invalid repository")
        return
    }
    let repoKey = branch + "@" + repoData.join("/")
    if (!Object.keys(repos).includes(repoKey)) {
        ns.tprint(`Could not find ${repoKey}`)
        return
    }
    ns.print(`Pushing to ${repoKey}`)
    await push({ author, repo, branch }, getArgValue(ns.args, undefined, "message", "m"), repos[repoKey])
    // await push({author: "kotakotik22", repo: "BitBurnerGithubTest", branch: "main"})
}

/**
 * @param {string} path
 * @param {RequestInit} options
 * @return {Promise<Response>}
 */
function apiRequest(path, options = undefined) {
    let p = "https://api.github.com/" + path
    ns.print("Making API request to path " + p)
    return fetch(p, options)
}

/**
 * @param {Branch} branch
 * @param {string?} message
 * @param {string} path
 * @return {Promise<object>}
 */
export async function push(branch, message, path) {
    let updated = 0
    for (let file of JSON.parse(ns.read((path + fileListFile).replace("//", "/")))) {
        let p = `repos/${branch.author}/${branch.repo}/contents/${file}`
        let response = await (await apiRequest(`${p}?ref=${branch.branch}`)).json()
        let sha = response.sha
        let content = btoa(ns.read((path + file).replace("//", "/"))).trim()
        // ns.tprint(content)
        // ns.tprint(btoa(atob(response.content?.trim?.())))
        // continue
        // this is horrible but who cares
        if (btoa(atob(response.content?.trim?.())) == content) {
            ns.print(`Not updating file ${file} because it has not been changed`)
            continue
        }
        let uResponse = await apiRequest(p, {
            method: "PUT",
            body: JSON.stringify({
                sha,
                branch: branch.branch,
                message: (message == undefined ? "" : `${message} - `) + "update " + file + "\n\nAutomatically committed by GitBurner",
                content
            }),
            headers: new Headers({
                "Authorization": `token ${localStorage.gitburner_github_token}`
            })
        })
        updated++
        ns.print("Result of updating file " + file + ": " + await uResponse.text())
    }
    ns.tprint(`Done! Updated ${updated} files`)
    // TODO: delete files that have been deleted locally
}