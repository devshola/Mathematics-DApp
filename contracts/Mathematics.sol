// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Mathematics {
    error InvalidInput(string message);

    uint256[] primeNumbers;
    uint256[] oddNumbers;
    uint256[] evenNumbers;

    event Primes(uint256[] primes);
    event Odds(uint256[] odds);
    event Evens(uint256[] evens);

    function countPrimes(uint256 limit) public returns (uint256) {
        if (limit < 2) revert InvalidInput("Limit must be at least 2");

        uint256 primeCount = 0;
        for (uint256 i = 2; i <= limit; i++) {
            if (isPrime(i)) {
                primeNumbers.push(i);
                primeCount++;
            }
        }

        assert(primeCount >= 0);

        emit Primes(primeNumbers);

        delete primeNumbers;

        return primeCount;
    }

    function countOdds(uint256 limit) public returns (uint256) {
        uint256 oddCount = 0;
        for (uint256 i = 1; i <= limit; i++) {
            if (i % 2 == 1) {
                oddNumbers.push(i);
                oddCount++;
            }
        }

        assert(oddCount >= 0);

        emit Odds(oddNumbers);

        delete oddNumbers;

        return oddCount;
    }

    function countEvens(uint256 limit) public returns (uint256) {
        uint256 evenCount = 0;
        for (uint256 i = 1; i <= limit; i++) {
            if (i % 2 == 0) {
                evenNumbers.push(i);
                evenCount++;
            }
        }

        assert(evenCount >= 0);

        emit Evens(evenNumbers);

        delete evenNumbers;

        return evenCount;
    }

    function isPrime(uint256 number) private pure returns (bool) {
        require(number > 1, "Number must be greater than 1");

        if (number == 2) return true;
        if (number % 2 == 0) return false;

        for (uint256 i = 3; i * i <= number; i += 2) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }
}
