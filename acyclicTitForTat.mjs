/* AcyclicTitForTat.
Builds on TitForTat.
If Opponent and Self are unaligned, can randomly choose to use opposite move than opponent.
*/

const ATTEMPT_CORRECT = 0.8


export default function bot({ history }) {
    if (history.length === 0) {
        return ["C", null];
    }

    let lastRound = history.at(-1);

    if (history.length === 1 || lastRound.opponent === lastRound.self && Math.random() > ATTEMPT_CORRECT) {
        return [lastRound.opponent, null];
    } else {
        return [lastRound.opponent === "C" ? "D" : "C", null];
    }
}

export let botName = "AcyclicTitForTat"