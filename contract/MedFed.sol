// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ModelRegistry {

    struct ModelUpdate {
        string modelHash;
        uint256 timestamp;
    }

    ModelUpdate[] public updates;

    function storeModelHash(string memory _hash) public {
        updates.push(ModelUpdate(_hash, block.timestamp));
    }

    function getUpdate(uint index) public view returns (string memory, uint256) {
        ModelUpdate memory m = updates[index];
        return (m.modelHash, m.timestamp);
    }

    function totalUpdates() public view returns (uint256) {
        return updates.length;
    }
}