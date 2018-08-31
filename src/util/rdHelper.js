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


// function testFunc(wS, c, d, h) {
//     const k = (wS + c) / 2;
//     const l = (4 - d) * 0.05 + (k - 0.5) * 4 / 5 + 0.5 + (h ? 0.1 : 0);
//     const r = _.random(0, 1, true);
//     const knowAnswer = l > r;
//     // console.log('left', l1 + l2, 'right', r, 'knowAnswer', knowAnswer);
//     return knowAnswer;
// }
//
// function testFunc2(wS, i, d, h) {
//     const k = (2*wS + i)/2;
//     const l = (4 - d) * 0.1 + (k - 0.5) * 4 / 5 + 0.5 + (h ? 0.1 : 0);
//     const r = _.random(0, 1, true);
//     const knowAnswer = l > r;
//     // console.log('left', l1 + l2, 'right', r, 'knowAnswer', knowAnswer);
//     return knowAnswer;
// }
//
// function test() {
//     let k = 0;
//     let n = 0;
//     for (let i = 0; i < 10000; i++) {
//         if (testFunc2(0.2, 0.2, 1, false)) {
//             k++;
//         } else {
//             n++;
//         }
//     }
//     console.log('sum', k * 100 / (k + n));
// }
//
// test();

// function f1(arg) {
//     return Math.log(1.87 * arg + 1) * 12.9 / (83.25 + Math.log(0.025 * arg + 51.24) * 12.9);
// }
//
// // function newX(x) {
// //     const f = f1(x);
// //     const k = 1 - f;
// //     const dx = x * Math.pow(k,5) + k;
// //     return x + dx;
// // }
// function newX(x) {
//     const f = f1(x);
//     const k = 1 - f;
//     const dx = x * Math.pow(k, 6) + k;
//     return x + dx;
// }
//
// function test() {
//     const x = [0, 1, 10, 100, 1000, 10000, 100000];
//     const y = x.map(e => newX(e));
//     console.log(x, y);
//     let t = 0;
//     const arrT = [t];
//     for (let i = 0; i < 50; i++) {
//         t = newX(t);
//         // if(i%100===0){
//             arrT.push(t);
//         // }
//     }
//     const fArrT = arrT.map(e => f1(e));
//     console.log(arrT, fArrT)
//     // const output = fArrT.join('\n')
//     // console.log(output);
// }
//
// test();