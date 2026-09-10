/* Trigger
Cooperates until defected against, then plays AlwaysDefect
 */

export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", false];
    }

    if (memory || history.at(-1).opponent === "D") {
        return ["D", memory];
    } else {
        return ["C", false];
    }
}

export let botName = "Trigger"