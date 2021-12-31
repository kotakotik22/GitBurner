export const fileListFile = "files.txt"
export const repoListFile = "/gitburner/repos.txt"

/** 
 * @param {(string|number)[]} args
 * @return {(string|number)[]}
 */
export function cleanArgs(args) {
	let n = []
	let skipNext = false
	for(let arg of args) {
		if(skipNext) {
			skipNext = false
			continue
		}
		if(arg.toString().startsWith("-")) {
			skipNext = true
		} else n.push(arg)
	}
	return n	
}

/**
 * @param {(string|number)[]} args
 * @param {string} name
 * @param {string} char
 * @param {string|number} defaultt
 * @return {(string|number)?}
 */
export function getArgValue(args, defaultt, name, char) {
	let index = args.findIndex((a) => a == `-${char}` || a == `--${name}`)
   	return (index == -1) ? defaultt : args[index + 1]
}

// thanks phil
/**
 * @return {string?}
 */
export function getCurrentDirectory() {
	return eval("document").querySelector('.MuiFormControl-root p')?.innerText?.match?.(/~(.*)\]/)?.[1]
}

/**
 * Represents a branch on a specific repo
 * @typedef {{author: string, repo: string, branch: string}} Branch
 */