// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BookMarketplace {

  struct Book {
    uint id; // 32
    uint price; // 32
    bytes32 proof; // 32
    address owner; // 20
  }

  bool public isStopped = false;

  // mapping of bookHash to Book data
  mapping(bytes32 => Book) private ownedBooks;

  // mapping of bookID to bookHash
  mapping(uint => bytes32) private ownedBookHash;

  // number of all books + id of the book
  uint private totalOwnedBooks;

  address payable private owner;

  constructor() {
    setContractOwner(msg.sender);
  }

  /// Sender is not book owner!
  error SenderIsNotBookOwner();

  /// Book is not created
  error BookIsNotCreated();

  /// Book has already a Owner!
  error BookHasOwner();

  /// Only owner has an access!
  error OnlyOwner();

  modifier onlyOwner() {
      if (msg.sender != getContractOwner()) {
          revert OnlyOwner();
      }
      _;
  }

  modifier onlyWhenNotStopped() {
    require(!isStopped);
    _;
  }

  modifier onlyWhenStopped() {
    require(isStopped);
    _;
  }

  receive() external payable {}

  function withdraw(uint amount) external onlyOwner onlyWhenNotStopped{
    (bool success, ) = owner.call{value: amount}("");
    require(success, "Transfer faild");
  }

  function emergencyWithdraw() external onlyWhenStopped onlyOwner{
    (bool success, ) = owner.call{value: address(this).balance}("");
    require(success, "Transfer faild");
  }

  function selfDestruct() external onlyWhenStopped onlyOwner{
    selfdestruct(owner);
  }

  function stopContract() external onlyOwner onlyWhenNotStopped{
    isStopped = true;
  }

  function resumeContract() external onlyOwner onlyWhenStopped{
    isStopped = false;
  }

  function purchaseBook(
    bytes16 bookId,
    bytes32 proof
  )
    external
    payable
    onlyWhenNotStopped
  {
    bytes32 bookHash = keccak256(abi.encodePacked(bookId, msg.sender));

    if (hasBookOwnership(bookHash)) {
      revert BookHasOwner();
    }

    uint id = totalOwnedBooks++;

    ownedBookHash[id] = bookHash;
    ownedBooks[bookHash] = Book({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender
    });
  }

  function transferOwnership(address newOwner) external onlyOwner onlyWhenNotStopped {
      setContractOwner(newOwner);
  } 

  function getBookCount()
    external
    view
    returns (uint)
  {
    return totalOwnedBooks;
  }

  function getBookHashAtIndex(uint index)
    external
    view
    returns (bytes32)
  {
    return ownedBookHash[index];
  }

  function getBookByHash(bytes32 bookHash)
    external
    view
    returns (Book memory)
  {
    return ownedBooks[bookHash];
  }

  function getIsStopped() public view returns(bool) {
      return isStopped;
  }

  function getContractOwner() public view returns(address) {
      return owner;
  }

  function setContractOwner(address newOwner) private {
    owner = payable(newOwner);
  }

  function isBookCreated(bytes32 bookHash) private view returns (bool) {
    return ownedBooks[bookHash].owner != 0x0000000000000000000000000000000000000000;
  }

  function hasBookOwnership(bytes32 bookHash)
    private
    view
    returns (bool)
  {
    return ownedBooks[bookHash].owner == msg.sender;
  }
}