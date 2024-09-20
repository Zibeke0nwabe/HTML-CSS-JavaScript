document.addEventListener('DOMContentLoaded', function() {
    const balanceDisplay = document.getElementById('balance');
    const form = document.getElementById('lottoForm');
    const message = document.getElementById('message');

    // Initialize balance from localStorage or default to R10.00
    let balance = parseFloat(localStorage.getItem('balance')) || 10.00;
    const ticketPrice = 3.00;
    const jackpot = 10000000.00; // 10 million
    updateBalanceDisplay();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (balance < ticketPrice) {
            message.textContent = "Insufficient funds. Please add more money to play.";
            return;
        }

        const userNumbers = Array.from(document.querySelectorAll('.number-input')).map(input => parseInt(input.value));
        if (new Set(userNumbers).size !== 6) {
            message.textContent = "Please enter 6 unique numbers.";
            return;
        }

        // Deduct ticket price
        balance -= ticketPrice;

        const winningNumbers = generateRandomNumbers();
        const matches = getMatchingNumbers(userNumbers, winningNumbers);

        // Increase balance if the user won
        let prize = calculatePrize(matches);
        if (prize > 0) {
            balance += prize;
        }
        // Saving the balance to local storage
        localStorage.setItem('balance', balance.toFixed(2));
        updateBalanceDisplay();
        // Displaying results
        message.textContent = `You matched ${matches.length} numbers. ${
            prize > 0 ? `You won R${prize.toFixed(2)}!` : "Better luck next time!"
        } Winning numbers: ${winningNumbers.join(', ')}`;
    });

    // Function to add R10 to the balance
    function addTicket() {
        balance += 10;
        localStorage.setItem('balance', balance.toFixed(2));
        updateBalanceDisplay();
    /*A simple function users need to just click 
    the button nothing serious for now */
    }

    // A function to create 6 random numbers ranging from 1 to 59
    function generateRandomNumbers() {
        let numbers = [];
        while (numbers.length < 6) {
            let num = Math.floor(Math.random() * 59) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers;
    }

    function getMatchingNumbers(userNumbers, winningNumbers) {
        return userNumbers.filter(num => winningNumbers.includes(num));
    }

    // Calculating the prize based on matches
    function calculatePrize(matches) {
        let prize = 0;
        if (matches.length === 3) {
            prize = jackpot * 0.06;
        } else if (matches.length === 4) {
            prize = jackpot * 0.20;
        } else if (matches.length === 5) {
            prize = jackpot * 0.40;
        } else if (matches.length === 6) {
            prize = jackpot * 1.00;
        }
        return prize;
    }

    // Updating the balance display
    function updateBalanceDisplay() {
        balanceDisplay.textContent = `R${balance.toFixed(2)}`;
    }
});
