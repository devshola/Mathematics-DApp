 
# Mathematics

Mathematics is a simple smart contract with a functional DApp integrated with the smart contract. The smart contract is an education platform that teaches a user about mathematics. If a user wants to know how many prime numbers, even numbers or odd numbers are between 1 and a certain number, the smart contract accurately tells that with the help of the functioning DApp.

## Description
This program is a Dapp created using a javascript framework to connect to the blockchain - ethers.js and some javascript codes.

## Smart Contract
```javascript
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
```

# Getting Started

## Installing

- Clone the project by typing ```git clone https://github.com/devshola/Mathematics-DApp``` in your terminal.
- After cloning the project, ```cd``` into the project and type ```npm i``` to install all dependencies for the project
- Deploy your contract on your preferred chain, preferably on Avalanche. Set up your hardhat.config file to be able to deploy on your preferred network. run ```npx hardhat run scripts/deploy.js --network <YOUR_NETWORK>``` to deploy
- Once your contract is deployed, copy the contract address and head to index.js, add the contract address here
  ```javascript
     const contractAddress = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";
  ```
- When the contract address is added, run ```npm run dev``` to start your frontend
- Once the front-end is up, interact with the contract.

## Authors

Samuel Shola

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
