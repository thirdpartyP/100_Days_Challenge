// Create the grid with 100 boxes
const grid = document.getElementById('grid');

// Initialize local storage and last interaction timestamp
let lastInteraction = localStorage.getItem('lastInteraction');
let selectedBoxes = JSON.parse(localStorage.getItem('selectedBoxes')) || [];

const createGrid = () => {
    for (let i = 1; i <= 100; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerText = i;

        // Check if the box was previously selected
        if (selectedBoxes.includes(i)) {
            box.classList.add('selected');
        }

        // Add click event to select/deselect the box
        box.addEventListener('click', () => {
            box.classList.toggle('selected');

            if (box.classList.contains('selected')) {
                selectedBoxes.push(i);
            } else {
                selectedBoxes = selectedBoxes.filter(boxNumber => boxNumber !== i);
            }

            // Update local storage with new selections and last interaction
            localStorage.setItem('selectedBoxes', JSON.stringify(selectedBoxes));
            updateLastInteraction();
        });

        grid.appendChild(box);
    }
};

// Update last interaction timestamp
const updateLastInteraction = () => {
    lastInteraction = Date.now();
    localStorage.setItem('lastInteraction', lastInteraction);
};

// Reset the grid and local storage
const resetGrid = () => {
    localStorage.removeItem('selectedBoxes');
    selectedBoxes = [];
    localStorage.removeItem('lastInteraction');
    lastInteraction = null;
    grid.innerHTML = '';
    createGrid();
};

// Check if 24 hours have passed since the last interaction
const checkForReset = () => {
    if (lastInteraction) {
        const currentTime = Date.now();
        const timeDifference = currentTime - lastInteraction;
        const oneDay = 24 * 60 * 60 * 1000;

        if (timeDifference >= oneDay) {
            resetGrid();
        }
    }
};

// Initial setup
createGrid();
setInterval(checkForReset, 1000 * 60 * 60);  // Check every hour for reset
