/* TolerantStriker
Builds on Striker
Cooperates while strikes remain
*/

export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", 0];
    }

    if (memory < -3) {
        return ["D", memory];
    } else if (history.at(-1).opponent === "D") {
        return ["C", memory - 1];
    } else {
        return ["C", memory];
    }
}

export let botName = "TolerantStriker"