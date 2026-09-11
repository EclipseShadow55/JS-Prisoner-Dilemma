/* SuspiciousTitForTat.
Builds on TitForTat.
Defects on the first round.
*/

export default function bot({ history }) {
    if (history.length === 0) {
        return ["D", null];
    }

    return [history.at(-1).opponent, null];
}

export let botName = "suspiciousTitForTat"