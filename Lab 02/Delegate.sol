// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractA
{
    // Define a state variable "valueA" for contract A
    uint256  public valueA;

    // function to set value to the state variable "valueA"    
    function setValueOfA(uint256 _valueA) public
    {
        valueA = _valueA;
    }
}

contract ContractB
{
    // Define a state variable "valueB" for contract B
    uint256 public valueB = 10;

    // function to set state variable "valueB" of contract B using contract A's function through delegate call 
    function  callSetValueOfA(address _addressOfContractA) public
    {
        // setting 100 to valueB by calling "setValueOfA() function from contract A
        (bool success,) = _addressOfContractA.delegatecall(abi.encodeWithSignature("setValueOfA(uint256)", 100));

        // If not successful, then delegate call failed
        require(success, " Delegate Call failed");
    }
}
