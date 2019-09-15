pragma solidity ^0.5.1;

contract Hasher{
    /** @dev Give the commitement. Must only be called locally.
     *  @param _c The move.
     *  @param _salt The salt to increase entropy.
     */
    function hash(uint8 _c, uint256 _salt) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(_c,_salt));
    }
}