// ============================================
// SORTING ALGORITHMS IN JAVASCRIPT
// ============================================

// ============================================
// 1. BUBBLE SORT
// ============================================
// Bubble sort is a simple sorting algorithm that repeatedly steps through the list,
// compares adjacent elements, and swaps them if they're in the wrong order.
// Time Complexity: O(n²) in worst and average case
// Space Complexity: O(1) - sorts in place
function bubbleSort(arr) {
  // Get the length of the array
  const n = arr.length;
  
  // Outer loop: controls how many passes we make through the array
  for (let i = 0; i < n - 1; i++) {
    // Inner loop: compares adjacent elements
    for (let j = 0; j < n - i - 1; j++) {
      // Compare current element with the next element
      if (arr[j] > arr[j + 1]) {
        // Swap elements if the first is greater than the second
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// ============================================
// 2. SELECTION SORT
// ============================================
// Selection sort divides the array into a sorted and unsorted portion,
// repeatedly finding the minimum element from the unsorted portion
// and moving it to the sorted portion.
// Time Complexity: O(n²) in all cases
// Space Complexity: O(1) - sorts in place
function selectionSort(arr) {
  // Get the length of the array
  const n = arr.length;
  
  // Outer loop: controls the position of the sorted portion
  for (let i = 0; i < n - 1; i++) {
    // Assume the current element is the minimum
    let minIndex = i;
    
    // Inner loop: search for the actual minimum in the unsorted portion
    for (let j = i + 1; j < n; j++) {
      // Update minIndex if we find a smaller element
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the minimum element with the element at position i
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}

// ============================================
// 3. INSERTION SORT
// ============================================
// Insertion sort builds a sorted array one element at a time by taking elements
// from the unsorted portion and inserting them into the correct position
// in the sorted portion.
// Time Complexity: O(n²) in worst case, O(n) in best case
// Space Complexity: O(1) - sorts in place
function insertionSort(arr) {
  // Start from the second element (index 1) since the first element is trivially sorted
  for (let i = 1; i < arr.length; i++) {
    // Store the current element to be inserted
    const key = arr[i];
    
    // Start comparing with elements to the left
    let j = i - 1;
    
    // Move all elements greater than key one position to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert the key at its correct position
    arr[j + 1] = key;
  }
  return arr;
}

// ============================================
// 4. MERGE SORT
// ============================================
// Merge sort is a divide-and-conquer algorithm that divides the array into halves,
// recursively sorts each half, and then merges the sorted halves back together.
// Time Complexity: O(n log n) in all cases
// Space Complexity: O(n) - requires additional space for merging
function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Find the middle point of the array
  const mid = Math.floor(arr.length / 2);
  
  // Recursively sort the left half
  const left = mergeSort(arr.slice(0, mid));
  
  // Recursively sort the right half
  const right = mergeSort(arr.slice(mid));
  
  // Merge the sorted halves and return the result
  return merge(left, right);
}

// Helper function to merge two sorted arrays
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from left and right arrays and add the smaller one
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements from left array
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  
  // Add remaining elements from right array
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }
  
  return result;
}

// ============================================
// 5. QUICK SORT
// ============================================
// Quick sort is a divide-and-conquer algorithm that selects a pivot element,
// partitions the array around the pivot, and recursively sorts the partitions.
// Time Complexity: O(n log n) average, O(n²) worst case
// Space Complexity: O(log n) due to recursion depth
function quickSort(arr) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Select a pivot element (using the middle element)
  const pivot = arr[Math.floor(arr.length / 2)];
  
  // Partition array into three parts: less, equal, and greater than pivot
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);
  
  // Recursively sort left and right partitions, then combine
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// ============================================
// EXAMPLE USAGE
// ============================================
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", testArray);
console.log("Bubble Sort:", bubbleSort([...testArray]));
console.log("Selection Sort:", selectionSort([...testArray]));
console.log("Insertion Sort:", insertionSort([...testArray]));
console.log("Merge Sort:", mergeSort([...testArray]));
console.log("Quick Sort:", quickSort([...testArray]));
