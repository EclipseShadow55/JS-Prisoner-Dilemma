/* GenerousTitForTat.
Builds on TitForTat.
Has a chance to unconditionally cooperate each turn.
*/

const CHANCE_COOPERATE = 0.8

export default function bot({ history }) {
    if (history.length === 0) {
        return ["C", null];
    }

    return [(Math.random() > CHANCE_COOPERATE) ? "C" : history.at(-1).opponent, null];
}

export let botName = "GenerousTitForTat";