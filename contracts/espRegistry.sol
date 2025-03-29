// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EspressoNameService {
  
    string public constant NAME_SUFFIX = ".esp";

   
    mapping(string => address) public nameToAddress;
   
    mapping(string => address) public ownerOfName;

    event NameRegistered(string indexed name, address indexed owner);
    event NameUpdated(string indexed name, address indexed newAddress);
    event PaymentMade(string indexed name, address indexed sender, uint256 amount);

  
    function _appendSuffix(string memory name) internal pure returns (string memory) {
        return string(abi.encodePacked(name, NAME_SUFFIX));
    }


    function registerName(string calldata name) external payable {
        // Append the suffix automatically
        string memory fullName = _appendSuffix(name);
        require(ownerOfName[fullName] == address(0), "Name already taken");
      

        ownerOfName[fullName] = msg.sender;
        nameToAddress[fullName] = msg.sender;
        emit NameRegistered(fullName, msg.sender);
    }

  
    function updateNameAddress(string calldata name, address newAddress) external {
        string memory fullName = _appendSuffix(name);
        require(ownerOfName[fullName] == msg.sender, "Not the owner of the name");
        nameToAddress[fullName] = newAddress;
        emit NameUpdated(fullName, newAddress);
    }


    function payToName(string calldata name) external payable {
        address payable recipient = payable(nameToAddress[name]);
        require(recipient != address(0), "Name not registered");
        require(msg.value > 0, "No ETH sent");

        (bool sent, ) = recipient.call{value: msg.value}("");
        require(sent, "Payment failed");
        emit PaymentMade(name, msg.sender, msg.value);
    }

  
    receive() external payable {}
}
