/** Prober.
Plays a probe sequence to see if the opponent will respond to defections.
If not, plays AlwaysDefect, otherwise plays standard TitForTat.
*/

export default function bot({ history, memory }) {
    if (history.length < 5) {
        return [["C", "D", "D", "C", "C"][history.length], null];
    } else if (history.length == 5) {
        if ("D" in history.map(turn => turn.opponent)) {
            return [history.at(-1), true];
        } else {
            return ["D", false];
        }
    }

    if (memory) {
        return [history.at(-1), true];
    } else {
        return ["D", false];
    }
}

export let botName = "Prober";