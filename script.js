var wasmCode = new Uint8Array([0,97,115,109,1,0,0,0,1,144,128,128,128,0,3,96,0,1,127,96,2,127,125,1,125,96,2,127,127,0,3,132,128,128,128,0,3,0,1,2,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,175,128,128,128,0,4,6,109,101,109,111,114,121,2,0,15,103,101,116,80,111,105,110,116,101,114,65,114,114,97,121,0,0,3,115,117,109,0,1,10,113,117,105,99,107,83,111,114,116,82,0,2,10,213,130,128,128,0,3,132,128,128,128,0,0,65,16,11,214,128,128,128,0,3,1,125,1,127,1,125,67,0,0,0,0,33,4,2,64,32,1,67,0,0,0,0,95,32,1,32,1,92,114,13,0,67,0,0,0,0,33,4,65,1,33,3,3,64,32,4,32,0,42,2,0,146,33,4,32,3,178,33,2,32,3,65,1,106,33,3,32,0,65,4,106,33,0,32,2,32,1,93,13,0,11,11,32,4,11,235,129,128,128,0,4,1,125,2,127,2,125,6,127,3,64,32,0,65,4,106,33,4,32,0,65,124,106,33,3,32,1,65,127,106,33,7,32,0,32,1,65,1,116,65,124,113,106,42,2,0,33,2,65,0,33,8,3,64,32,3,32,8,65,2,116,106,33,9,32,8,33,10,3,64,32,10,65,1,106,33,10,32,9,65,4,106,34,9,42,2,0,34,5,32,2,93,13,0,11,32,10,65,127,106,33,8,32,4,32,7,65,2,116,106,33,11,32,7,33,12,3,64,32,12,65,127,106,33,12,32,11,65,124,106,34,11,42,2,0,34,6,32,2,94,13,0,11,2,64,32,8,32,12,65,1,106,34,7,74,13,0,32,9,32,6,56,2,0,32,11,32,5,56,2,0,32,12,33,7,32,10,33,8,11,32,8,32,7,76,13,0,11,2,64,32,7,65,1,72,13,0,32,0,32,7,16,2,11,2,64,32,1,32,8,76,13,0,32,1,32,8,107,33,1,32,0,32,8,65,2,116,106,33,0,12,1,11,11,11]);
var wasmImports = {

};  

let wasmModule = new WebAssembly.Module(wasmCode);
let wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


let pointer = wasmInstance.exports.getPointerArray();

let array =  new Float32Array(wasmInstance.exports.memory.buffer, pointer, 10000);

for (var i = 0; i < array.length; i++) {
  array[i] = getRandomInt(10000);
}

let copyArray = array.slice();
let timeStart;
let timeEnd;

console.log('array: ');
console.log(copyArray);
console.log('\nsum: ');
console.log(wasmInstance.exports.sum(pointer, array.length));

wasmInstance.exports.quickSortR(pointer, array.length);
console.log('\nsortArray: ');
console.log(array);