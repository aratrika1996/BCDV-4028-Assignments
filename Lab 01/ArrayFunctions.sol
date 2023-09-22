// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ArrayLib.sol";

contract ArrayFunctions {
    using ArrayLib for uint[];

    uint[] public inputArray;

    constructor(uint[] memory initialArray) {
        inputArray = initialArray;
    }

    function sortArray() public {
        inputArray.sortArray();
    }

    function removeDuplicatesFromArray() public {
        inputArray.removeDuplicatesFromArray();
        
    }

    function getArray() public view returns (uint[] memory) {
        return inputArray;
    }
}