// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "../IERC998ERC721TopDown.sol"

contract Portfolio is IERC998ERC721TopDown {
    /// Logic for rootOwnerOf(uint256 _tokenId)
    /// If the token is a bottom-up composable and has a parent token then call rootOwnerOf for the parent token.
    ///     If the call was successful then the returned address is the rootOwner.
    ///     Otherwise call rootOwnerOfChild for the parent token.
    ///         If the call was successful then the returned address is the rootOwner.
    ///         Otherwise get the owner address of the token and that is the rootOwner.
    /// Otherwise call rootOwnerOfChild for the token
    ///     If the call was successful then the returned address is the rootOwner.
    ///     Otherwise get the owner address of the token and that is the rootOwner.
    /// @notice Get the root owner of tokenId.
    /// @param _tokenId The token to query for a root owner address
    /// @return rootOwner The root owner at the top of tree of tokens and ERC998 magic value.
    /// swithed from pubic to external
    function rootOwnerOf(uint256 _tokenId) external view returns (bytes32 rootOwner) {
        address rootOwner = address(rootOwnerOf(_tokenId));

    };

}
