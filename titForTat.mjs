/* TitForTat.
Cooperates on the first round.
After, plays opponent's last move.
*/

export default function bot({ history }) {
    if (history.length === 0) {
        return ["C", null];
    }

    return [history.at(-1).opponent, null];
}

export let botName = "TitForTat";