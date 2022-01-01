let basePath = "https://raw.githubusercontent.com/kotakotik22/GitBurner/main/"

/** @param {NS} ns **/
export async function main(ns) {
	let files = JSON.parse(await (await fetch(basePath + "files.txt")).text())

	for (let file of files) {
		if (!
			await ns.wget((basePath + file).replace("//", "/"), "/gitburner/" + file, "home")
		) {
			ns.tprint("Could not download file " + file)
			return
		}
	}
}