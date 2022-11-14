// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
    /**
     * @dev Multiplies two numbers, throws on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        // Gas optimization: this is cheaper than asserting 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        c = a * b;
        require(c / a == b);
        return c;
    }

    /**
     * @dev Integer division of two numbers, truncating the quotient.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        // uint256 c = a / b;
        // require(a == b * c + a % b); // There is no case in which this doesn't hold
        return a / b;
    }

    /**
     * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        return a - b;
    }

    /**
     * @dev Adds two numbers, throws on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        require(c >= a);
        return c;
    }
}

/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented or decremented by one. This can be used e.g. to track the number
 * of elements in a mapping, issuing TRC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 * Since it is not possible to overflow a 256 bit integer with increments of one, `increment` can skip the {SafeMath}
 * overflow check, thereby saving gas. This does assume however correct usage, in that the underlying `_value` is never
 * directly accessed.
 */
library Counters {
    using SafeMath for uint256;

    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        // The {SafeMath} overflow check can be skipped here, see the comment at the top
        counter._value += 1;
    }

    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}

/**
 * @title TRC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 *  from TRC721 asset contracts.
 */
abstract contract ITRC721Receiver {
    /**
     * @dev Magic value to be returned upon successful reception of an NFT
     *  Equals to `bytes4(keccak256("onTRC721Received(address,uint256,bytes)"))`,
     *  which can be also obtained as `ITRC721Receiver(0).onTRC721Received.selector`
     */

    function onTRC721Received(address from, uint256 tokenId)
        public
        payable
        virtual
        returns (uint256);

    function getWithdrawFee() public view virtual returns (uint256);
}

/**
 * @title ERC721 Non-Fungible Token Standard basic interface
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */
interface ITRC721 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );

    function balanceOf(address owner) external view returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function approve(address to, uint256 tokenId) external;

    function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

contract DeTronEvent {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    address owner;

    struct TicketItem {
        uint256 tokenId;
        address nftContract;
        address owner;
        uint256 price;
        bool isPublic;
    }

    mapping(uint256 => TicketItem) private _idToTicketItem;

    ///////// EVENTS ///////////////////////
    event ListingTicket(
        uint256 indexed tokenId,
        address indexed nftContract,
        address owner,
        uint256 price,
        bool isPublic
    );

    event BuyTicket(uint256 tokenId, address buyer, uint256 price);

    /**
     * @dev Constructor function
     */

    // constructor(address owner_) {
    //     owner = owner_;
    // }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function listingTicket(
        address nftContract_,
        uint256 tokenId_,
        uint256 price_,
        bool isPublic_
    ) public {
        require(
            nftContract_ != address(0),
            "Address Ticket Contract is Invalid"
        );

        require(
            ITRC721(nftContract_).getApproved(tokenId_) == address(this),
            "Ticket not approval for address contract"
        );
        require(price_ > 0, "Price must be at least 1 sun");
        _idToTicketItem[tokenId_] = TicketItem({
            nftContract: nftContract_,
            tokenId: tokenId_,
            price: price_,
            owner: msg.sender,
            isPublic: isPublic_
        });
        _itemIds.increment();
        ITRC721(nftContract_).transferFrom(msg.sender, address(this), tokenId_);

        emit ListingTicket(tokenId_, nftContract_, msg.sender, price_, false);
    }

    function listingTickets(
        address nftContract_,
        uint256[] memory tokenIds_,
        uint256 price_,
        bool isPublic_
    ) public {
        require(
            nftContract_ != address(0),
            "Address Ticket Contract is Invalid"
        );
        for (uint256 index_ = 0; index_ < tokenIds_.length; index_++) {
            listingTicket(nftContract_, tokenIds_[index_],price_, isPublic_);
        }
    }

    function buyTicket(uint256 tokenId_) public payable {
        address owner_ = _idToTicketItem[tokenId_].owner;
        require(msg.sender != owner_, "You already own this NFT");
        require(owner_ != address(0), "Address Ticket Contract is Invalid");
        require(
            _idToTicketItem[tokenId_].isPublic == true,
            "Ticket is Not in sell"
        );
        uint256 price_ = _idToTicketItem[tokenId_].price;
        require(
            msg.value == price_,
            "Please submit the asking price in order to complete the purchase"
        );

        ITRC721(_idToTicketItem[tokenId_].nftContract).transferFrom(
            address(this),
            msg.sender,
            tokenId_
        );
        payable(owner_).transfer(price_);

        _itemIds.decrement();
        // remove ticket on list Ticket Item
        delete _idToTicketItem[tokenId_];

        emit BuyTicket(tokenId_, msg.sender, price_);
    }

    /////////////// VIEW //////////////
    function getTicketItem(uint256 tokenId_)
        public
        view
        returns (
            uint256,
            address,
            address,
            uint256,
            bool
        )
    {
        require(
            _idToTicketItem[tokenId_].owner != address(0),
            "Ticket is not found"
        );
        return (
            _idToTicketItem[tokenId_].tokenId,
            _idToTicketItem[tokenId_].nftContract,
            _idToTicketItem[tokenId_].owner,
            _idToTicketItem[tokenId_].price,
            _idToTicketItem[tokenId_].isPublic
        );
    }

    function totalSupply() public view returns (uint256) {
        return _itemIds.current();
    }

    function getListTicketItems(uint256 limit_, uint256 offset_)
        public
        view
        returns (
            uint256[] memory,
            address[] memory,
            address[] memory,
            uint256[] memory,
            bool[] memory
        )
    {
        uint256[] memory tokenIds = new uint256[](limit_);
        address[] memory nftContracts = new address[](limit_);
        address[] memory owners = new address[](limit_);
        uint256[] memory prices = new uint256[](limit_);
        bool[] memory isPublics = new bool[](limit_);
        for (uint256 index_ = 0; index_ < limit_; index_++) {
            uint256 tokenId_ = offset_ + index_;
            if (_idToTicketItem[tokenId_].owner != address(0)) {
                tokenIds[index_] = _idToTicketItem[tokenId_].tokenId;
                nftContracts[index_] = _idToTicketItem[tokenId_].nftContract;
                owners[index_] = _idToTicketItem[tokenId_].owner;
                prices[index_] = _idToTicketItem[tokenId_].price;
                isPublics[index_] = _idToTicketItem[tokenId_].isPublic;
            }
        }

        return (tokenIds, nftContracts, owners, prices, isPublics);
    }
}
