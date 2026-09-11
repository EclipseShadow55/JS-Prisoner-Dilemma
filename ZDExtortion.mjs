/* ZDExtortion (Credit: Press, Dyson).
Calculates cooperation probabilities for every possible last round result.
Uses equations that enforce a positive linear relationship between the its and the opponent's points.
Makes cooperation the mathematically best option.
*/


const COEFFICIENT = 2
const TEMPTATION = 3
const REWARD = 2
const PUNISHMENT = 1
const SUCKER = 0

export default function bot({ history }) {
    if (history.length === 0) {
        return ["C", null];
    }

    let lastRound = history.at(-1);

    let pCoop = calculateExtortion(lastRound.you + lastRound.opponent);

    return [Math.random() < pCoop ? "C" : "D", null];
}

function calculateExtortion(result) {
    const phi = Math.min(1 / ((REWARD - PUNISHMENT) + COEFFICIENT * (PUNISHMENT - SUCKER)), 1 / (COEFFICIENT * (TEMPTATION - PUNISHMENT) + COEFFICIENT * (PUNISHMENT - SUCKER)))
    
    let probabilities = {
        "CC": 1 - phi * (COEFFICIENT - 1) * (REWARD - PUNISHMENT),
        "CD": 1 - phi * (COEFFICIENT * (TEMPTATION - PUNISHMENT) + (PUNISHMENT - SUCKER)),
        "DC": phi * ((TEMPTATION - PUNISHMENT) + COEFFICIENT * (PUNISHMENT - SUCKER)),
        "DD": 0
    };

    return probabilities[result];
}


export let botName = "ZDExtortion";