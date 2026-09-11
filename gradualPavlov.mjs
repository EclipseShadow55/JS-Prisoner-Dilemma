/* GradualPavlov.
Builds on Pavlov.
Maintains a chance to cooperate, decreases it if lost last round, increases it if it won.
*/

const CORRECT_FACTOR = 5

export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", 1];
    }

    let lastRound = history.at(-1)

    let probability = memory;
    if (lastRound.self === "C" && lastRound.opponent === "C") {
        probability = Math.min(memory + 1 / CORRECT_FACTOR, 1); 
    } else if (lastRound.self === "C" && lastRound.opponent === "D") {
        probability = Math.max(memory - 2 / CORRECT_FACTOR, 0);
    } else if (lastRound.self === "D" && lastRound.opponent === "C") {
        probability = Math.min(memory + 2 / CORRECT_FACTOR, 1);
    } else if (lastRound.self === "D" && lastRound.opponent === "D") {
        probability = Math.max(memory - 1 / CORRECT_FACTOR, 1);
    }

    return [Math.random() < probability ? "C" : "D", probability];
}

export let botName = "GradualPavlov";