import atm_abi from "../artifacts/contracts/Mathematics.sol/Mathematics.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Page() {
  const [ethWallet, setEthWallet] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  const [primeNum, setPrimeNum] = useState("");
  const [oddNum, setOddNum] = useState("");
  const [evenNum, setEvenNum] = useState("");
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const [oddNumbers, setOddNumbers] = useState([]);
  const [evenNumbers, setEvenNumbers] = useState([]);

  const contractAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getContract();
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);

    const smartContract = new ethers.Contract(
      contractAddress,
      atmABI,
      provider.getSigner()
    );

    setContract(smartContract);
  };

  const countPrimes = async (lim) => {
    if (contract) {
      const tx = await contract.countPrimes(lim);
      const result = await tx.wait();

      const event = result.events.find((event) => event.event === "Primes");
      console.log(event);

      const primeNum = event.args.primes;
      setPrimeNumbers(primeNum);
    }
  };

  const countOdds = async (limi) => {
    if (contract) {
      const tx = await contract.countOdds(limi);
      const result = await tx.wait();

      const event = result.events.find((event) => event.event === "Odds");

      console.log(event);

      setOddNumbers(event.args.odds);
    }
  };
  const countEvens = async (limit) => {
    if (contract) {
      const tx = await contract.countEvens(limit);
      const result = await tx.wait();

      const event = result.events.find((event) => event.event === "Evens");
      console.log(event);

      setEvenNumbers(event.args.evens);
    }
  };

  const initUser = () => {
    const buttonStyle = {
      backgroundColor: "#0C7C59", // Cool green color
      color: "white",
      padding: "15px 32px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
      margin: "4px 2px",
      cursor: "pointer",
      borderRadius: "12px", // Curved edges
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", // Shadow
      border: "none",
      justifyContent: "center",
    };

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button style={buttonStyle} onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    return (
      <div className="container">
        <div>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              countPrimes(primeNum);
            }}
          >
            <button type="submit" className="button">
              Count Primes
            </button>
            <input
              type="number"
              value={primeNum}
              onChange={(e) => setPrimeNum(e.target.value)}
              placeholder="Input limit number"
              className="input"
            />
          </form>

          <p>{`${primeNumbers}`}</p>
        </div>

        <div className="separator"></div>

        <div>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              countOdds(oddNum);
            }}
          >
            <button type="submit" className="button">
              Count Odds
            </button>
            <input
              type="number"
              value={oddNum}
              onChange={(e) => setOddNum(e.target.value)}
              placeholder="Input limit number"
              className="input"
            />
          </form>

          <p>{`${oddNumbers}`}</p>
        </div>

        <div className="separator"></div>

        <div>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              countEvens(evenNum);
            }}
          >
            <button type="submit" className="button">
              Count Evens
            </button>
            <input
              type="number"
              value={evenNum}
              onChange={(e) => setEvenNum(e.target.value)}
              placeholder="Input limit number"
              className="input"
            />
          </form>

          <p>{`${evenNumbers}`}</p>
        </div>

        <style jsx>{`
          .container {
            text-align: center;
            padding: 20px;
            background-color: #bac1b8;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
          }

          .account-info {
            font-size: 1.2em;
            margin-bottom: 20px;
          }

          .balance-info {
            font-size: 1.5em;
            margin: 20px 0;
            color: #333;
          }

          .button {
            background-color: #0c7c59;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 10px 0;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
          }

          .button:hover {
            background-color: #0c7c59;
          }

          .form {
            margin: 20px 0;
          }

          .separator {
            width: 100%;
            height: 1px;
            background-color: #58a4b0;
            margin: 15px 0;
          }

          .input {
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: calc(100% - 22px);
            font-size: 1em;
          }
        `}</style>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <div className="box">
        <header className="header">
          <h1>Understanding Mathematics</h1>
        </header>
        {initUser()}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .box {
          border: 2px solid #58a4b0;
          border-radius: 10px;
          padding: 20px;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .header {
          background-color: #d64933; /* Complementary color to #4CAF50 */
          color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .header h1 {
          margin: 0;
          font-size: 2em;
          font-weight: bold;
        }
      `}</style>
    </main>
  );
}
