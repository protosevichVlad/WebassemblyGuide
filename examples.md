# WebAssembly

[WasmFiddle](https://wasdk.github.io/WasmFiddle/)

## Calculatin and dispaly the first 10 digits of Fibonacci
```
//fib.c
int fib(int n) {
  if (n == 0 || n == 1) return 1;
  return fib(n - 1) + fib(n - 1);
}
```
```
//script.js 
let wasmModule = new WebAssembly.Module(wasmCode);
let wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);
let fib = wasmInstance.exports.fib;
let numberDigits = 10;

for (let i = 0; i < numberDigits; i += 1) {
  log(fib(i));
}
```
## Working with arrays
```
//script.js
let wasmModule = new WebAssembly.Module(wasmCode);
let wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);

function getRandomInt(max) {
 return Math.floor(Math.random() * Math.floor(max));
}

let pointer = wasmInstance.exports.getPointerArray();

let array = new Float32Array(wasmInstance.exports.memory.buffer, pointer, 10);

for (var i = 0; i < array.length; i++) {
 array[i] = getRandomInt(100);
}
log('array: ');
log(array);
log('\nsum: ');
log(wasmInstance.exports.sum(pointer, array.length));

wasmInstance.exports.quickSortR(pointer, array.length);
log('\nsortArray: ');
log(array);
```
```
//array.c
float array[100];

float* getPointerArray() {
  return &array[0];
}

float sum(float* arr, float size) {
  float result = 0;
  for (int i = 0; i < size; i++) {
    result += arr[i];
  }
  return result;
}

void quickSortR(float* a, long N) {
  long i = 0;
  long j = N - 1; 	
  float temp, p;
  p = a[N >> 1];
  do {
    while ( a[i] < p ) i++;
    while ( a[j] > p ) j--;
    if (i <= j) {
      temp = a[i]; 
      a[i] = a[j]; 
      a[j] = temp;
      i++; 
      j--;
    }
  } while ( i<=j );
  if ( j > 0 ) quickSortR(a, j);
  if ( N > i ) quickSortR(a + i, N - i);
}
```