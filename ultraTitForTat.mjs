/* UltraTitForTat
Builds on OmegaTitForTat (Credit: Slany & Kienreich)
Adds probing and basic classification
At the start of a match decides on a random probe round
If the opponent is judged to be AlwaysDefect, ignores all other logic and switches to AlwaysDefect
Plays OmegaTitForTat until probe round is reached
When probe round is reached, plays a simple probe sequence to judge whether the opponent is reactive
If the opponent is reactive to all defections, plays OmegaTitForTat
If the opponent is not reactive to one defection but is to multiple, tests the water for a few rounds with alternating defection and cooperation
If the opponent is not responsive to the alternating sequence, continues with that, otherwise plays OmegaTitForTat
If the opponent is not responsive to the probe as a whole, plays AlwaysDefect
*/

const RANDOM_THRESHOLD = 10;
const DEADLOCK_THRESHOLD = 4;
const PROBE_SEQUENCE = ["D", "C", "C", "D", "D", "C", "C", "C"];


export default function bot({ history, memory }) {
    if (history.length < 0) {
        return ["C", {randomness: 0, deadlock: 0, triggered: false, probetime: Math.floor(Math.random())}];
    } else if (history.length < PROBE_SEQUENCE.length) {

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
    }
    
    if (deadlock > DEADLOCK_THRESHOLD) {
        return ["C", {randomness: randomness, deadlock: 0, triggered: false}];
    } else if (randomness > RANDOM_THRESHOLD) {
        return ["D", {randomness: randomness, deadlock: deadlock, triggered: true}];
    } else {
        return [lastRound.opponent, {randomness: randomness, deadlock: deadlock, triggered: false}];
    }
}

export let botName = "UltraTitForTat";