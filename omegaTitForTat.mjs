/* OmegaTitForTat (Credit: Slany, Kienreich).
Builds on TitForTat.
Maintains a randomness score, and when it exceeds a threshold switches to an AlwaysDefect strategy.
Maintains a deadlock score, and when it exceeds a threshold cooperates for one turn and resets the deadlock score.
*/

const RANDOM_THRESHOLD = 10;
const DEADLOCK_THRESHOLD = 4;

export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", {randomness: 0, deadlock: 0, triggered: false}];
    } else if (memory.triggered) {
        return ["D", memory];
    }

    let randomness = memory.randomness;
    let deadlock = memory.deadlock;

    let lastRound = history.at(-1);

    if (history.length > 1) {
        if (history.at(-2).opponent != lastRound.opponent) {
            randomness += 1;
        }
    }
    if (lastRound.opponent != lastRound.you) {
        randomness += 1;
        deadlock += 1;
    } else if (lastRound.you === "C") {
        randomness = Math.max(randomness - 1, 0);
        deadlock = 0;
    } else {
        deadlock = 0;
    }
    
    if (deadlock > DEADLOCK_THRESHOLD) {
        return ["C", {randomness: randomness, deadlock: 0, triggered: false}];
    } else if (randomness > RANDOM_THRESHOLD) {
        return ["D", {randomness: randomness, deadlock: deadlock, triggered: true}];
    } else {
        return [lastRound.opponent, {randomness: randomness, deadlock: deadlock, triggered: false}];
    }
}

export let botName = "OmegaTitForTat";