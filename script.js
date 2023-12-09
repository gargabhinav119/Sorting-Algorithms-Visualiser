const container = document.getElementById('container');
const bubbleSortButton = document.getElementById('bubbleSort');
const selectionSortButton = document.getElementById('selectionSort');
const insertionSortButton = document.getElementById('insertionSort');
const mergeSortButton = document.getElementById('mergeSort');
const quickSortButton = document.getElementById('quickSort');
const heapSortButton = document.getElementById('heapSort');
const allButtons = document.querySelector('.buttons');


bubbleSortButton.addEventListener('click', startSorting1);
selectionSortButton.addEventListener('click', startSorting2);
insertionSortButton.addEventListener('click', startSorting3);
mergeSortButton.addEventListener('click', startSorting4);
quickSortButton.addEventListener('click', startSorting5);
heapSortButton.addEventListener('click', startSorting6);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        updateVisualization(arr);
        await sleep(1000);
      }
    }
  }
}
async function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i+1; j < n; j++) {
      if (arr[j] <  arr[min]) {
        min = j;
        updateVisualization(arr);
        await sleep(1000);
      }
    }
        [arr[i], arr[min]] = [arr[min], arr[i]]; 
  }
  
}
async function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let temp = arr[i];
    let j = i-1;
    while(j>=0 && arr[j]>temp){
     arr[j+1] = arr[j]
        j--;
      }
      arr[j+1] = temp;
    }
}
async function mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        updateVisualization(arr);
        await sleep(1000);

        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);
        return merge(await mergeSort(left), await mergeSort(right));
    }

    async function merge(left, right) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
        
    }
    async function quickSort(array, start, end) {
        if (start < end) {
            const pivotIndex = await partition(array, start, end);
            await quickSort(array, start, pivotIndex - 1);
            await quickSort(array, pivotIndex + 1, end);
        }
    }

    async function partition(array, start, end) {
        const pivotValue = array[end];
        let pivotIndex = start;

        for (let i = start; i < end; i++) {
            if (array[i] < pivotValue) {
                [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
                pivotIndex++;
                updateVisualization(array);
               await sleep(1000);
            }
        }

        [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
        updateVisualization(array);
        await sleep(1000);
        return pivotIndex;
    }

    async function heapSort(array) {
        let n = array.length;

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(array, n, i);
        }

        for (let i = n - 1; i >= 0; i--) {
            [array[0], array[i]] = [array[i], array[0]];
            await heapify(array, i, 0);
            updateVisualization(array);
            await sleep(1000);
        }
    }

    async function heapify(array, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && array[left] > array[largest]) {
            largest = left;
        }

        if (right < n && array[right] > array[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            await heapify(array, n, largest);
        }
    }



function updateVisualization(arr) {
  container.innerHTML = '';
  for (const value of arr) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value * 10}px`;
    container.appendChild(bar);
  }
}

async function startSorting1() {
 allButtons.disabled = true;
  const values = Array.from({ length: 50 }, () => Math.floor(Math.random() * 40) + 1);
  updateVisualization(values);
  await bubbleSort(values);
 allButtons.disabled = false;
}
async function startSorting2() {
 allButtons.disabled = true;
  const values = Array.from({ length: 50 }, () => Math.floor(Math.random() * 40) + 1);
  updateVisualization(values);
  await selectionSort(values);
 allButtons.disabled = false;
}
async function startSorting3() {
  allButtons.disabled = true;
  const values = Array.from({ length: 50 }, () => Math.floor(Math.random() * 40) + 1);
  updateVisualization(values);
  await insertionSort(values);
  allButtons.disabled = false;
}
async function startSorting4() {
 allButtons.disabled = true;
  const values = Array.from({ length: 50 }, () => Math.floor(Math.random() * 40) + 1);
  updateVisualization(values);
  const sortedArray = await mergeSort(values);
  updateVisualization(sortedArray);
  await sleep(1000);
 allButtons.disabled = false;
}
async function startSorting5() {
  allButtons.disabled = true;
  const values = Array.from({ length: 50 }, () => Math.floor(Math.random() * 40) + 1);
  updateVisualization(values);
  await quickSort(values,0,values.length-1);
 allButtons.disabled = false;
}
async function startSorting6() {
 allButtons.disabled = true;
  const values = Array.from({ length: 50 }, () => Math.floor(Math.random() * 40) + 1);
  updateVisualization(values);
  await heapSort(values);
 allButtons.disabled = false;
}
