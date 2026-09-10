/* SuspiciousStriker
Builds on Striker
Defects on the first round
*/

const STRIKES = 3;

export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["D", STRIKES];
    }

    if (memory < 0) {
        return ["D", memory - 1];
    } else if (history.at(-1).opponent === "D") {
        return ["D", memory - 1];
    } else {
        return ["C", memory];
    }
}

export let botName = "SuspiciousStriker"