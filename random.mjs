/* Random.
Randomly choses between cooperating and defecting.
*/

const CHANCE_COOPERATE = 0.5

export default function bot() {
    return [(Math.random() > CHANCE_COOPERATE) ? "C" : "D", null];
}

export let botName = "Random";