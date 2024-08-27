// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event CoinFlipped(address indexed player, uint256 amount, bool won);

    function flipCoin(bool _guess) public payable {
        require(msg.value > 0, "Bet must be greater than 0");

        bool outcome = block.timestamp % 2 == 0;

        if (outcome == _guess) {
            uint256 winnings = msg.value * 2;
            payable(msg.sender).transfer(winnings);
            emit CoinFlipped(msg.sender, winnings, true);
        } else {
            emit CoinFlipped(msg.sender, msg.value, false);
        }
    }

    receive() external payable {}
}
