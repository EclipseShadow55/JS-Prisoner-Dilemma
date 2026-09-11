/* Striker.
Starts with a certain number of strikes, decreasing it each time the opponent defects.
While strikes remain, retaliates but can still go back to mutual cooperation.
After strikes are out, switches to AlwaysDefect.
*/

const STRIKES = 3;

export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", STRIKES];
    }

    if (memory < 0) {
        return ["D", memory - 1];
    } else if (history.at(-1).opponent === "D") {
        return ["D", memory - 1];
    } else {
        return ["C", memory];
    }
}

export let botName = "Striker"