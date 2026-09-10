/* GradualTitForTat
Builds on TitForTat
Maintains a betrayal counter, increases it whenever the opponent betrays*
When an opponent betrays*, defects however many times the opponent has betrayed
Apologizes with two unconditional cooperations
[*] Betrayals are defects when a cooperation is expected. Doesn't count defects during retaliation or apology rounds as betrayals
*/

export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", {betrayals: 0, retaliating: -2}];
    }

    if (memory.retaliating > 0) {
        return ["D", {betrayals: memory.betrayals, retaliating: memory.retaliating - 1}];
    } else if (memory.retaliating > -2) {
        return ["C", {betrayals: memory.betrayals, retaliating: memory.retaliating - 1}];
    } else if (history.at(-1).opponent === "D") {
        return ["D", {betrayals: memory.betrayals + 1, retaliating: memory.betrayals}];
    } else {
        return ["C", memory];
    }
}

export let botName = "GradualTitForTat";