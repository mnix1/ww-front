export const MEMORY = 'memory';
export const LOGIC = 'logic';
export const PERCEPTIVITY = 'perceptivity';
export const COUNTING = 'counting';
export const COMBINING_FACTS = 'combiningFacts';
export const PATTERN_RECOGNITION = 'patternRecognition';
export const IMAGINATION = 'imagination';

export const SPEED = 'speed';
export const REFLEX = 'reflex';
export const CONCENTRATION = 'concentration';
export const CONFIDENCE = 'confidence';
export const INTUITION = 'intuition';

// function func(x, pk, px1, px2, px3, pj ) {
//     return (Math.log(px1 * x + 1) * pk)/ (pj + Math.log(px2 * x + px3) * pk);
// }
//
// function test(iter, squareDiff, maxPk, maxPx1, maxPx2, maxPx3,maxPj) {
//     const x = [1,10, 100, 1000, 10000, 100000];
//     const y = [.1,.33, .5, .7, .8, .85];
//
//     let minDiff = 10;
//     let minDiffP;
//     for (let i = 0; i < iter; i++) {
//         const pk = Math.random() * maxPk;
//         const px1 = Math.random()* maxPx1;
//         const px2 = Math.random()* maxPx2;
//         const px3 = Math.random()* maxPx3;
//         const pj = Math.random()* maxPj;
//         let diff = 0;
//         for (let t = 0; t < x.length; t++) {
//             const ans = func(x[t], pk, px1, px2,px3,pj);
//             const wantedY = y[t];
//             const diffY=ans-wantedY;
//             if(squareDiff){
//                 diff += diffY * diffY;
//             } else {
//                 diff += Math.abs(diffY);
//             }
//         }
//         if (diff < minDiff) {
//             minDiff = diff;
//             minDiffP = {pk, px1,px2,px3, pj};
//         }
//         // console.log(i, diff, minDiff, minDiffP );
//     }
//     const arr = [];
//     for (let t = 0; t < x.length; t++) {
//         const ans = func(x[t], minDiffP.pk, minDiffP.px1,minDiffP.px2,minDiffP.px3, minDiffP.pj);
//         arr.push(ans);
//     }
//     console.log(arr, y);
//     console.log( minDiff, minDiffP);
// }