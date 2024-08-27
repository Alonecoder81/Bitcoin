const express = require("express");
const cors = require("cors"); 
const { ethers } = require("ethers");
require("dotenv").config();

const app = express(); // Initialize app here

app.use(cors()); // Now you can use cors middleware
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
  "function flipCoin(bool _guess) public payable",
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

app.post("/flip", async (req, res) => {
  const { guess, amount } = req.body;

  try {
    const tx = await contract.flipCoin(guess, { value: ethers.utils.parseEther(amount) });
    await tx.wait();
    res.send({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Express server running on port 3001");
});
