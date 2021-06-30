// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
// pragma abicoder v2;
pragma experimental ABIEncoderV2;
import './Ownable.sol';
import "./LibToken.sol";
import "./LIBWrapper.sol";

contract BookLibrary is Ownable {
    LIB public LIBToken;
    WrapperContract public wrapperContract;

    address wrapperAddress;
    address tokenAddress;


    struct Book {
        string bookName;
        uint64 numberOfCopies;
        bytes32 bookId;
        address[] borrowedFromAdresses;
    }

    //All books in library    
    mapping (bytes32 => Book) public books;
    //Holds information about the borrowed books by user 
    mapping (address => mapping(bytes32 => uint8)) public userBorrowedBooks;
    //Array with the keys of all existing books 
    bytes32[] public bookKeys;
    uint256 public rentPrice = 10000000000000000;
    
    //Adding events so the front-end could hook to them
    event NewBookAdded(address _user, string _bookName, uint64 _quantity);
    event BookBorrowed(address _user, string _bookName);
    event BookReturned(address _user, string _bookName);
    event UnwrapInBookContract(uint _amount);

    constructor(address _libTokenAddress, address _libWrapperAddress) public {
        address payable payableWrapperAddress = address(uint160(_libWrapperAddress));
        tokenAddress = _libTokenAddress;
        wrapperAddress = _libWrapperAddress;

        LIBToken = LIB(_libTokenAddress);
        wrapperContract = WrapperContract(payableWrapperAddress);
	}

    modifier validTitle(string memory _bookName) {
        require (bytes(_bookName).length > 0, "You have to provide book name");
        _;
    }

    modifier validQuantity(uint64 _numberOfCopies) {
        require (_numberOfCopies > 0, "You need to provide valid quantity");
        _;
    }
    
    modifier bookNotExist(string memory _bookName) {
        require (bytes(books[keccak256(abi.encodePacked(_bookName))].bookName).length == 0, "You already have this book in your library");
        _;
    }
    
    modifier userAllowedToBorrowBook(bytes32 _bookId) {
        require (bytes(books[_bookId].bookName).length != 0, "Invalid book id");
        require(books[_bookId].numberOfCopies > 0, "No quantity");
        require(userBorrowedBooks[msg.sender][_bookId] != 1, "You are allowed to borrow only one copy of certain book");
        _;
    }
    
    modifier userAllowedToReturnBook(bytes32 _bookId) {
        require(userBorrowedBooks[msg.sender][_bookId] == 1, "You haven't borrowed this book");
        _;
    }
    
    function addBook (string memory _bookName, uint64 _numberOfCopies) public onlyOwner validTitle(_bookName) validQuantity(_numberOfCopies) bookNotExist(_bookName){
        address[] memory borrowedFromAdresses;
        bytes32 bookKey = keccak256(abi.encodePacked(_bookName));
        Book memory newBook = Book(_bookName, _numberOfCopies, bookKey, borrowedFromAdresses);

        books[bookKey] = newBook;
        bookKeys.push(bookKey);
        
        emit NewBookAdded(msg.sender, _bookName, _numberOfCopies);
    }
    
    function borrowBookById(bytes32 _bookId, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public userAllowedToBorrowBook(_bookId) {
        LIBToken.permit(msg.sender, address(this), value, deadline, v,r,s);
		LIBToken.transferFrom(msg.sender, address(this), rentPrice);

        books[_bookId].numberOfCopies--;
        books[_bookId].borrowedFromAdresses.push(msg.sender);
        userBorrowedBooks[msg.sender][_bookId] = 1;
        
        emit BookBorrowed(msg.sender, books[_bookId].bookName);
    }
    
    function returnBookById(bytes32 _bookId) public userAllowedToReturnBook(_bookId) {
        books[_bookId].numberOfCopies++;
        userBorrowedBooks[msg.sender][_bookId] = 0;
        
        emit BookReturned(msg.sender, books[_bookId].bookName);
    }
    
    function getUsersBorrowedBook(bytes32 _bookId) public view returns(address[] memory) {
        return books[_bookId].borrowedFromAdresses;
    }
    
    function getCount() public view returns(uint count) {
        return bookKeys.length;
    }   
    //Returns all the books as an array, so the user could have a list the books in the library.
    //Implemented in case if user interacts with the contract using Remix interface. It might not be needed if user interacts with the contract using web3 client.
    function getAllBooks() public view returns (Book[] memory) {
        Book[] memory availableBooks = new Book[](bookKeys.length);

        for(uint i=0; i < bookKeys.length; i++){
            availableBooks[i] = books[bookKeys[i]];
        }
        
        return availableBooks;
    }
    // unwrap contract tokens
    function exchangeTokens(uint _amount) public onlyOwner {
        LIBToken.approve(wrapperAddress, _amount);
        emit UnwrapInBookContract(_amount);
        wrapperContract.unwrap(_amount);
    }
    // send ETH to owner
    function withdraw(uint256 value) public onlyOwner {
        msg.sender.transfer(value);
    }
    // rent a book on behalf of abother user signed a message for this
    function borrowWithSignature(bytes32 hashedMessage, uint8 v, bytes32 r, bytes32 s, address receiver, bytes32 bookId) public payable {
		require(recoverSigner(hashedMessage, v,r,s) == receiver, 'Receiver does not signed the message');

        LIBToken.transferFrom(receiver, address(this), rentPrice);

        books[bookId].numberOfCopies--;
        books[bookId].borrowedFromAdresses.push(receiver);
        userBorrowedBooks[receiver][bookId] = 1;
        
        emit BookBorrowed(receiver, books[bookId].bookName);
	}

    function recoverSigner(bytes32 hashedMessage, uint8 v, bytes32 r, bytes32 s) internal returns (address) {
		bytes32 messageDigest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hashedMessage));
        return ecrecover(messageDigest, v, r, s);
	}

    receive() external payable {}

}