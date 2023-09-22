// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library ArrayLib {
    function sortArray(uint[] storage arr) internal {
        for (uint i = 0; i < arr.length - 1; i++) {
            for (uint j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                }
            }
        }
    }


function removeDuplicatesFromArray(uint[] storage arr) internal {
        if (arr.length <= 1) {
            return;
        }

        uint[] memory newArray = new uint[](arr.length);

        for (uint i = 0; i < arr.length; i++) {
            bool isItemDuplicate = false;
            for (uint j = 0; j < newArray.length; j++) {
                if (arr[i] == newArray[j]) {
                    isItemDuplicate = true;
                    break;
                }
            }
            if (!isItemDuplicate) {
                newArray[i] = arr[i];
            }
        }

        // Clear the original array
        while (arr.length > 0) {
            arr.pop();
        }

        // Copy back unique elements to the original array
        for (uint i = 0; i < newArray.length; i++) {
            if(newArray[i] != 0) {
                arr.push(newArray[i]);
            }
            
        }
    }

}