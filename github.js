import { cleanArgs } from "/gitburner/lib.js"

/** @param {NS} ns **/
export async function main(ns) {
	/** @type {(number|string)[]} */
    let args = cleanArgs(ns.args)
	let op = args[0]
	let opArgs = [...ns.args]
	opArgs.shift()
	let toExec = ""
	switch(op?.toLowerCase?.()) {
		case "get":
			toExec = "read.js"
			break
		case "push":
			toExec = "write.js"
			break
		default:
			ns.tprint(`There is no operation "${op}", available: "get", "push"`)
			return
	}
	ns.run("/gitburner/" + toExec, 1, ...opArgs)
}