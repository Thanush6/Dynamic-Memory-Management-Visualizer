const heapDiv = document.getElementById("heap");
const sizeInput = document.getElementById("sizeInput");
const allocBtn = document.getElementById("allocBtn");
const freeBtn = document.getElementById("freeBtn");

// total heap = 100%
let heap = [
  { size: 100, allocated: false }
];

// Render heap visually
function renderHeap() {
  heapDiv.innerHTML = "";

  heap.forEach(block => {
    const div = document.createElement("div");
    div.classList.add("block");
    div.classList.add(block.allocated ? "allocated" : "free");
    div.style.width = block.size + "%";
    heapDiv.appendChild(div);
  });
}

// First-Fit malloc simulation
function allocateMemory(size) {
  for (let i = 0; i < heap.length; i++) {
    if (!heap[i].allocated && heap[i].size >= size) {
      const remaining = heap[i].size - size;

      const allocatedBlock = {
        size: size,
        allocated: true
      };

      const freeBlock = {
        size: remaining,
        allocated: false
      };

      heap.splice(i, 1, allocatedBlock);
      if (remaining > 0) heap.splice(i + 1, 0, freeBlock);

      return;
    }
  }
  alert("Not enough memory (Heap full / fragmentation)");
}

// free() last allocated block
function freeMemory() {
  for (let i = heap.length - 1; i >= 0; i--) {
    if (heap[i].allocated) {
      heap[i].allocated = false;
      mergeFreeBlocks();
      return;
    }
  }
}

// Merge adjacent free blocks
function mergeFreeBlocks() {
  for (let i = 0; i < heap.length - 1; i++) {
    if (!heap[i].allocated && !heap[i + 1].allocated) {
      heap[i].size += heap[i + 1].size;
      heap.splice(i + 1, 1);
      i--;
    }
  }
}

// Event Listeners
allocBtn.addEventListener("click", () => {
  const size = parseInt(sizeInput.value);
  if (!size || size <= 0 || size > 100) {
    alert("Enter valid size (1–100)");
    return;
  }
  allocateMemory(size);
  renderHeap();
});

freeBtn.addEventListener("click", () => {
  freeMemory();
  renderHeap();
});

// Initial render
renderHeap();
