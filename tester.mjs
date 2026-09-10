import { writeFileSync } from 'node:fs';

import AC, {botName as ACName} from './alwaysCooperate.mjs';
import AD, {botName as ADName} from './alwaysDefect.mjs';
import TFT, {botName as TFTName} from './titForTat.mjs';
import STFT, {botName as STFTName} from './suspiciousTitForTat.mjs';
import ATFT, {botName as ATFTName} from './acyclicTitForTat.mjs';
import TR, {botName as TRName} from './trigger.mjs';
import STR, {botName as STRName} from './suddenTrigger.mjs';
import ST, {botName as STName} from './striker.mjs';
import TS, {botName as TSName} from './tolerantStriker.mjs';
import SS, {botName as SSName} from './suspiciousStriker.mjs';
import RAND, {botName as RANDName} from './random.mjs';
import TFTT, {botName as TFTTName} from './titForTwoTats.mjs';
import GTFT, {botName as GTFTName} from './generousTitForTat.mjs';
import PAV, {botName as PAVName} from './pavlov.mjs';
import PRB, {botName as PRBName} from './prober.mjs';
import GRTFT, {botName as GRTFTName} from './gradualTitForTat.mjs';
import GRPAV, {botName as GRPAVName} from './gradualPavlov.mjs';
import ZDE, {botName as ZDEName} from './ZDExtortion.mjs';
import OTFT, {botName as OTFTName} from './omegaTitForTat.mjs';


function match(bot1, bot2, rounds=500, scoring={DD: [1, 1], CD: [0, 3], DC: [3, 0], CC: [2, 2]}) {
    let hist1 = [];
    let hist2 = [];
    let mem1 = null;
    let mem2 = null;

    let score1 = 0;
    let score2 = 0;

    for (let i = 0; i < rounds; i++) {
        let [move1, memo1] = bot1({memory: mem1, history: hist1})
        let [move2, memo2] = bot2({memory: mem2, history: hist2})
        
        mem1 = memo1;
        mem2 = memo2;

        let [add1, add2] = scoring[move1 + move2]
        score1 += add1;
        score2 += add2;
        
        hist1.push({you: move1, opponent: move2});
        hist2.push({you: move2, opponent: move1});
    }

    return [score1 / rounds, score2 / rounds]
}


function tournament(bots, names) {
    let final_scoretable = Object.fromEntries(names.map(
        name => [name,
            Object.fromEntries(names.filter(
                item => item !== name).map(
                    other_name => [other_name, {self: null, other: null}]
                ))]));
    
    for (let ind1 = 0; ind1 < bots.length; ind1++) {
        for (let ind2 = ind1 + 1; ind2 < bots.length; ind2++) {
            let [bot1res, bot2res] = match(bots[ind1], bots[ind2]);
            
            if (final_scoretable[names[ind1]][names[ind2]] === undefined) {
                console.log(ind1, ind2);
                console.log(names[ind1]);
                console.log(names[ind2]);
                console.log(final_scoretable);
            }
            final_scoretable[names[ind1]][names[ind2]].self = bot1res;
            final_scoretable[names[ind1]][names[ind2]].other = bot2res;
            
            final_scoretable[names[ind2]][names[ind1]].self = bot2res;
            final_scoretable[names[ind2]][names[ind1]].other = bot1res;
        }
    }
    let final_score = [];

    for (let selfName in final_scoretable) {
        let self_total = 0;
        let opp_total = 0;

        for (let oppName in final_scoretable[selfName]) {
            self_total += final_scoretable[selfName][oppName].self
            opp_total += final_scoretable[selfName][oppName].other
        }

        final_scoretable[selfName]["self_total"] = self_total / names.length;
        final_scoretable[selfName]["opp_total"] = opp_total / names.length;
        final_scoretable[selfName]["ratio"] = self_total / opp_total;

        final_score.push(self_total / names.length);
    }

    let leaderboard = names.map((name, i) => [name, final_score[i]]);

    leaderboard.sort((a, b) => b[1] - a[1])

    return [leaderboard, final_scoretable]
}


let [board, results] = tournament(
    [AC, AD, TFT, STFT, ATFT, TR, STR, ST, TS, SS, RAND, TFTT, GTFT, PAV, PRB, GRTFT, GRPAV, ZDE, OTFT],
    [ACName, ADName, TFTName, STFTName, ATFTName, TRName, STRName, STName, TSName, SSName, RANDName, TFTTName, GTFTName, PAVName, PRBName, GRTFTName, GRPAVName, ZDEName, OTFTName]
);

for (let i = 0; i < board.length; i++) {
    console.log(`${i + 1}) ${board[i][0]} - ${board[i][1]}`)
}

try {
    writeFileSync("results.json", JSON.stringify(results, null, 4), 'utf-8');
} catch (error) {
    console.error("Error writing results:", error);
}