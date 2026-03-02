// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedFed {

    struct Update {
        address hospital;
        bytes32 weightHash;
        uint256 contribution;
    }

    Update[] public updates;

    function submitUpdate(bytes32 _hash, uint256 _contribution) public {
        updates.push(Update(msg.sender, _hash, _contribution));
    }

    function getUpdatesCount() public view returns(uint) {
        return updates.length;
    }
}