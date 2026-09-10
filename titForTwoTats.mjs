/* TitForTwoTats
Builds on TitForTat
Only retaliates after two consecutive defections
*/

export default function bot({ history }) {
    if (history.length < 2) {
        return ["C", null];
    }

    if (history.at(-1).opponent === "D" && history.at(-2).opponent === "D") {
        return ["D", null];
    }
    return ["C", null];
}

export let botName = "TitForTwoTats";