/* SuddenTrigger.
Builds on Trigger.
On opponent defection, retaliates and has a chance to trigger, switching to AlwaysDefect.
*/

const TRIGGER_CHANCE = 0.1

export default function bot({ history, memory }) {
    if (history.length === 0) {
        return ["C", false];
    }
    if (memory || history.at(-1).opponent === "D") {
        return ["D", memory || (Math.random() < TRIGGER_CHANCE)];
    } else {
        return ["C", false];
    }
}

export let botName = "SuddenTrigger"