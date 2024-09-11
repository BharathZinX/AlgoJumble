const pseudocodeQuestions = [
    {
        title: "Kadane’s Algorithm",
        pseudocode: [
            "Start",
            "Initialize max_current and max_global to the first element of the array",
            "For each element from the second element to the end of the array:",
            "Update max_current to the maximum of the current element and max_current + current element",
            "Update max_global to the maximum of max_global and max_current",
            "Return max_global",
            "Stop"
        ],
        jumbledPseudocode: [
            "Start",
            "Update max_global to the maximum of max_global and max_current",
            "Return max_global",
            "For each element from the second element to the end of the array:",
            "Update max_current to the maximum of the current element and max_current + current element",
            "Initialize max_current and max_global to the first element of the array",
            "Stop"
        ]
    },
    {
        title: "Depth-First Search (DFS) in a Graph",
        pseudocode: [
            "Start",
            "Initialize a stack and mark all nodes as unvisited",
            "Push the starting node onto the stack and mark it as visited",
            "While the stack is not empty:",
            "Pop a node from the stack and process it",
            "For each unvisited neighbor of the popped node, push it onto the stack and mark it as visited",
            "Stop"
        ],
        jumbledPseudocode: [
            "Start",
            "Push the starting node onto the stack and mark it as visited",
            "Pop a node from the stack and process it",
            "For each unvisited neighbor of the popped node, push it onto the stack and mark it as visited",
            "Initialize a stack and mark all nodes as unvisited",
            "While the stack is not empty:",
            "Stop"
        ]
    },
    {
        title: "Binary Search",
        pseudocode: [
            "Start",
            "Set low to 0 and high to the length of the array minus 1",
            "While low is less than or equal to high:",
            "Calculate mid as the average of low and high",
            "If the target is equal to the element at mid, return mid",
            "If the target is less than the element at mid, set high to mid - 1",
            "Otherwise, set low to mid + 1",
            "If the target is not found, return -1",
            "Stop"
        ],
        jumbledPseudocode: [
            "Start",
            "Calculate mid as the average of low and high",
            "Set low to 0 and high to the length of the array minus 1",
            "If the target is not found, return -1",
            "If the target is equal to the element at mid, return mid",
            "While low is less than or equal to high:",
            "If the target is less than the element at mid, set high to mid - 1",
            "Otherwise, set low to mid + 1",
            "Stop"
        ]
    },
    {
        title: "Merging Two Sorted Arrays",
        pseudocode: [
            "Start",
            "Initialize pointers i and j to 0 for both arrays",
            "Initialize an empty result array",
            "While both pointers are within bounds of their respective arrays:",
            "Compare elements at pointers i and j",
            "Append the smaller element to the result array and advance the pointer",
            "Append remaining elements from either array to the result array",
            "Return the result array",
            "Stop"
        ],
        jumbledPseudocode: [
            "Start",
            "Append remaining elements from either array to the result array",
            "Initialize pointers i and j to 0 for both arrays",
            "Initialize an empty result array",
            "While both pointers are within bounds of their respective arrays:",
            "Append the smaller element to the result array and advance the pointer",
            "Compare elements at pointers i and j",
            "Return the result array",
            "Stop"
        ]
    },
    {
        title: "Finding the Longest Palindromic Substring",
        pseudocode: [
            "Start",
            "Initialize start and max_length to 0",
            "For each character in the string:",
            "Expand around the character and check for odd-length palindromes",
            "Expand around the gap between this character and the next character for even-length palindromes",
            "Update start and max_length based on the longest palindrome found",
            "Extract and return the substring from start with length max_length",
            "Stop"
        ],
        jumbledPseudocode: [
            "Start",
            "Initialize start and max_length to 0",
            "Expand around the gap between this character and the next character for even-length palindromes",
            "For each character in the string:",
            "Extract and return the substring from start with length max_length",
            "Expand around the character and check for odd-length palindromes",
            "Update start and max_length based on the longest palindrome found",
            "Stop"
        ]
    },
    {
        title: "Finding the Minimum Value in an Array",
        pseudocode: [
            "Start",
            "Set min = array[0]",
            "For each element in the array:",
            "If the current element < min, update min",
            "Return min",
            "Stop"
        ],
        jumbledPseudocode: [
            "Start",
            "Set min = array[0]",
            "Return min",
            "For each element in the array:",
            "If the current element < min, update min",
            "Stop"
        ]
    }
];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function getRandomQuestions() {
    const shuffled = shuffle([...pseudocodeQuestions]);
    return shuffled.slice(0, 5);
}

function displayQuestions() {
    const selectedQuestions = getRandomQuestions();
    const quizzesContainer = document.getElementById('quizzes');
    
    quizzesContainer.innerHTML = ''; // Clear previous quizzes

    selectedQuestions.forEach((question, index) => {
        const quizDiv = document.createElement('div');
        quizDiv.classList.add('quiz');
        quizDiv.innerHTML = `
            <h2>${question.title}</h2>
            <ul id="pseudocode-list-${index + 1}" class="pseudocode-list">
                ${question.jumbledPseudocode.map((line, i) => `<li id="line-${index + 1}-${i}" draggable="true">${line}</li>`).join('')}
            </ul>
            <button id="check-answer-${index + 1}">Check Answer</button>
            <p id="result-message-${index + 1}"></p>
        `;
        quizzesContainer.appendChild(quizDiv);

        // Add event listener for the Check Answer button
        document.getElementById(`check-answer-${index + 1}`).addEventListener('click', () => {
            validateSolution(question.pseudocode, `pseudocode-list-${index + 1}`, `result-message-${index + 1}`);
        });
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggedElement = document.getElementById(id);
    const targetElement = e.target;

    if (targetElement.tagName === 'LI' && draggedElement !== targetElement) {
        const parent = targetElement.parentNode;
        parent.insertBefore(draggedElement, targetElement.nextSibling);
    }
}

function validateSolution(correctOrder, listId, resultMessageId) {
    const items = Array.from(document.querySelectorAll(`#${listId} li`));
    const userOrder = items.map(item => item.textContent);

    const resultMessage = document.getElementById(resultMessageId);

    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
        resultMessage.textContent = "Congratulations! You've unscrambled the pseudocode correctly.";
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = "Oops! That's not correct. Try again.";
        resultMessage.style.color = 'red';
    }
}

// Timer logic
function startTimer() {
    const timerDisplay = document.getElementById('timer-display');
    let timeRemaining = 10 * 60; // 10 minutes in seconds

    const timer = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer);
            alert("Oops, times out!");
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    displayQuestions();
    startTimer();

    // Initialize drag and drop
    document.querySelectorAll('.pseudocode-list li').forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', drop);
    });
});
