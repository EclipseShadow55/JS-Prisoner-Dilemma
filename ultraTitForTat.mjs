/* UltraTitForTat.
Builds on OmegaTitForTat (Credit: Slany, Kienreich).
Adds probing and basic classification.
At the start of a match decides on a random probe round.
If the opponent is judged to be AlwaysDefect, ignores all other logic and switches to AlwaysDefect.
Plays OmegaTitForTat until probe round is reached.
When probe round is reached, plays a simple probe sequence to judge whether the opponent is reactive.
If the opponent is reactive to all defections, plays OmegaTitForTat.
If the opponent is not reactive to one defection but is to multiple, tests the water for a few rounds with alternating defection and cooperation.
If the opponent is not responsive to the alternating sequence, continues with that, otherwise plays OmegaTitForTat.
If the opponent is not responsive to the probe as a whole, plays AlwaysDefect.
*/

const RANDOM_THRESHOLD = 10;
const DEADLOCK_THRESHOLD = 4;
const HARD_DEFECT_THRESHOLD = 8;

const MIN_PROBE_ROUND = 10;
const MAX_PROBE_ROUND = 15;
const PROBE_SEQUENCE = ["D", "C", "C", "D", "D", "C"];
const REVIEW_COUNT = 2


export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", {randomness: 0, deadlock: 0, hard_defect: 0, triggered: false, alternating: false, probing: true, apologizing: false, reviewing: -1, probe_round: Math.floor(Math.random() * (MAX_PROBE_ROUND - MIN_PROBE_ROUND)) + MIN_PROBE_ROUND}];
    } else if (memory.triggered) {
        return ["D", memory];
    } else if (memory.alternating) {
        if (history.at(-1).opponent === "D") {
            memory.alternating = false;
            return ["C", memory];
        } else {
            return [history.at(-1).you === "D" ? "C" : "D", memory];
        }
    } else if (memory.probing && history.length >= memory.probe_round && history.length < memory.probe_round + PROBE_SEQUENCE.length) { // Play probe sequence
        if (history.at(-1).opponent === "D") {
            memory.probing = false;
            memory.reviewing = false;
            memory.apologizing = true;
            return ["C", memory];
        }
        memory.reviewing = REVIEW_COUNT;
        return [PROBE_SEQUENCE[history.length - memory.probe_round], memory];
    } else if (memory.apologizing) { // Check results
        memory.apologizing = false;
        return ["C", memory];
    } else if (memory.reviewing > 0) {
        if (history.at(-1).opponent === "D") {
            memory.reviewing = -1;
            memory.alternating = true;
            return ["C", memory];
        }
        memory.reviewing -= 1;
        return ["C", memory];
    } else if (memory.reviewing === 0) {
        memory.triggered = true;
        return ["D", memory];
    }

    let lastRound = history.at(-1);

    if (history.length > 1) {
        if (history.at(-2).opponent != lastRound.opponent) {
            memory.randomness += 1;
        }
    }
    if (lastRound.opponent != lastRound.you) {
        memory.randomness += 1;
        memory.deadlock += 1;
    } else if (lastRound.you === "C") {
        memory.randomness = Math.max(memory.randomness - 1, 0);
    }
    if (lastRound.opponent == "D") {
        memory.hard_defect += 1
    } else {
        memory.hard_defect = 0
    }
    
    if (memory.deadlock > DEADLOCK_THRESHOLD) {
        memory.deadlock = 0;
        return ["C", memory];
    } else if (memory.randomness > RANDOM_THRESHOLD || memory.hard_defect > HARD_DEFECT_THRESHOLD) {
        memory.triggered = true;
        return ["D", memory];
    } else {
        return [lastRound.opponent, memory];
    }
}

export let botName = "UltraTitForTat";