/* Pavlov
Plays AlwaysCooperate/AlwaysDefect until the opponent plays something different, then switches to the other
*/

export default function bot({ history }) {
    if (history.length === 0) {
        return ["C", null];
    }

    if (history.at(-1).opponent === history.at(-1).self) {
        return [history.at(-1).self, null];
    } else {
        return [history.at(-1).self === "C" ? "D" : "D", null];
    }
}

export let botName = "Pavlov";