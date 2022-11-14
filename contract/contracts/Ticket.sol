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

/**
 * @title ERC721 Non-Fungible Token Standard basic implementation
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */
contract TRC721 is ITRC721 {
    using SafeMath for uint256;

    // Mapping from token ID to owner
    mapping(uint256 => address) internal _tokenOwner;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to number of owned token
    mapping(address => uint256) internal _ownedTokensCount;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @dev Gets the balance of the specified address.
     * @param owner address to query the balance of
     * @return uint256 representing the amount owned by the passed address
     */
    function balanceOf(address owner) public view override returns (uint256) {
        require(owner != address(0));
        return _ownedTokensCount[owner];
    }

    /**
     * @dev Gets the owner of the specified token ID.
     * @param tokenId uint256 ID of the token to query the owner of
     * @return address currently marked as the owner of the given token ID
     */
    function ownerOf(uint256 tokenId) public view override returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0));
        return owner;
    }

    /**
     * @dev Approves another address to transfer the given token ID
     * The zero address indicates there is no approved address.
     * There can only be one approved address per token at a given time.
     * Can only be called by the token owner or an approved operator.
     * @param to address to be approved for the given token ID
     * @param tokenId uint256 ID of the token to be approved
     */
    function approve(address to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);
        require(to != owner);
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender));

        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    /**
     * @dev Gets the approved address for a token ID, or zero if no address set
     * Reverts if the token ID does not exist.
     * @param tokenId uint256 ID of the token to query the approval of
     * @return address currently approved for the given token ID
     */
    function getApproved(uint256 tokenId)
        public
        view
        override
        returns (address)
    {
        require(_exists(tokenId));
        return _tokenApprovals[tokenId];
    }

    /**
     * @dev Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf.
     * @param to operator address to set the approval
     * @param approved representing the status of the approval to be set
     */
    function setApprovalForAll(address to, bool approved) public override {
        require(to != msg.sender);
        _operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    /**
     * @dev Tells whether an operator is approved by a given owner.
     * @param owner owner address which you want to query the approval of
     * @param operator operator address which you want to query the approval of
     * @return bool whether the given operator is approved by the given owner
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev Transfers the ownership of a given token ID to another address.
     * Usage of this method is discouraged, use `safeTransferFrom` whenever possible.
     * Requires the msg.sender to be the owner, approved, or operator.
     * @param from current owner of the token
     * @param to address to receive the ownership of the given token ID
     * @param tokenId uint256 ID of the token to be transferred
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId));

        _transferFrom(from, to, tokenId);
    }

    /**
     * @dev Returns whether the specified token exists.
     * @param tokenId uint256 ID of the token to query the existence of
     * @return bool whether the token exists
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    /**
     * @dev Returns whether the given spender can transfer a given token ID.
     * @param spender address of the spender to query
     * @param tokenId uint256 ID of the token to be transferred
     * @return bool whether the msg.sender is approved for the given token ID,
     * is an operator of the owner, or is the owner of the token
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        address owner = ownerOf(tokenId);
        return (spender == owner ||
            getApproved(tokenId) == spender ||
            isApprovedForAll(owner, spender));
    }

    /**
     * @dev Internal function to burn a specific token.
     * Reverts if the token does not exist.
     * Deprecated, use _burn(uint256) instead.
     * @param owner owner of the token to burn
     * @param tokenId uint256 ID of the token being burned
     */
    function _burn(address owner, uint256 tokenId) internal {
        require(ownerOf(tokenId) == owner);

        _clearApproval(tokenId);

        _ownedTokensCount[owner] = _ownedTokensCount[owner].sub(1);
        _tokenOwner[tokenId] = address(0);

        emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Internal function to burn a specific token.
     * Reverts if the token does not exist.
     * @param tokenId uint256 ID of the token being burned
     */
    function _burn(uint256 tokenId) internal {
        _burn(ownerOf(tokenId), tokenId);
    }

    /**
     * @dev Internal function to transfer ownership of a given token ID to another address.
     * As opposed to transferFrom, this imposes no restrictions on msg.sender.
     * @param from current owner of the token
     * @param to address to receive the ownership of the given token ID
     * @param tokenId uint256 ID of the token to be transferred
     */
    function _transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        require(ownerOf(tokenId) == from);
        require(to != address(0));

        _clearApproval(tokenId);

        _ownedTokensCount[from] = _ownedTokensCount[from].sub(1);
        _ownedTokensCount[to] = _ownedTokensCount[to].add(1);

        _tokenOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function transfer(address to, uint256 tokenId) public virtual {
        _transferFrom(msg.sender, to, tokenId);
    }

    /**
     * @dev Private function to clear current approval of a given token ID.
     * @param tokenId uint256 ID of the token to be transferred
     */
    function _clearApproval(uint256 tokenId) private {
        if (_tokenApprovals[tokenId] != address(0)) {
            _tokenApprovals[tokenId] = address(0);
        }
    }
}

contract Ticket is TRC721 {
    using SafeMath for uint256;

    string public name;
    string public symbol;
    address public owner;
    string public uri;

    struct TokenMeta {
        uint256 tokenId;
        uint8 eventId;
        uint8 eventType;
        string pathData;
        bool isUsed;
    }

    mapping(uint256 => TokenMeta) private _tokenMeta;

    mapping(uint8 => uint256[]) private _eventIdToTokens;

    mapping(address => bool) private _adminList;

    mapping(address => mapping(uint8 => bool)) private _adminEvents;

    mapping(address => mapping(uint8 => bool)) private _ticketChecker;

    uint256[] private _allTokens;
    mapping(uint8 => uint256[]) private _eventAllTokens;

    ///////// EVENTS ///////////////////////
    event MintTicket(
        uint256 tokenId,
        uint8 eventId,
        uint8 eventType,
        string pathData
    );

    /**
     * @dev Constructor function
     */

    // constructor(
    //     address owner_,
    //     string memory name_,
    //     string memory symbol_,
    //     string memory uri_
    // ) {
    //     owner = owner_;
    //     name = name_;
    //     symbol = symbol_;
    //     setUri(uri_);
    // }

    constructor() {
        owner = msg.sender;
        name = "De Tron Event";
        symbol = "DTE";
        setUri("http://localhost");
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    modifier onlyAdminEvent(address admin_, uint8 eventId_) {
        require(
            _adminList[admin_] == true || admin_ == owner,
            "Ownable: caller is not the admin"
        );
        require(
            _adminEvents[admin_][eventId_] == true || admin_ == owner,
            "Ownable: caller is not the admin event owner"
        );
        _;
    }

    modifier onlyTicketChecker(address ticketChecker_, uint8 eventId_) {
        require(
            _ticketChecker[ticketChecker_][eventId_] == true || ticketChecker_ == owner,
            "Ownable: caller is not the ticket checker event owner"
        );
        _;
    }

    /////////////// OWNER //////////////
    function addAdmin(address admin_) external onlyOwner {
        require(admin_ != address(0), "Admin address is Invalid");
        _adminList[admin_] = true;
    }

    function removeAdmin(address admin_) external onlyOwner {
        require(admin_ != address(0), "Admin address is Invalid");
        _adminList[admin_] = false;
    }

    function setAdminEvent(
        address admin_,
        uint8 eventId_,
        bool isActive_
    ) external onlyOwner {
        require(admin_ != address(0), "Admin address is Invalid");
        require(_adminList[admin_] == true, "Address is not admin");
        _adminEvents[admin_][eventId_] = isActive_;
    }

    function setTicketChecker(
        address ticketChecker_,
        uint8 eventId_,
        bool isActive_
    ) external onlyAdminEvent(msg.sender, eventId_) {
        require(ticketChecker_ != address(0), "Ticket Checker address is Invalid");
        _ticketChecker[ticketChecker_][eventId_] = isActive_;
    }

    function mint(
        address to_,
        uint8 eventId_,
        uint8 eventType_,
        string memory pathData_
    ) external onlyAdminEvent(msg.sender, eventId_) {
        require(to_ != address(0), "Address is Invalid");
        uint256 tokenIdIndex_ = _allTokens.length.add(1);
        require(!_exists(tokenIdIndex_), "Token is Exists");
        _tokenOwner[tokenIdIndex_] = to_;
        _ownedTokensCount[to_] = _ownedTokensCount[to_].add(1);

        _allTokens.push(tokenIdIndex_);
        _eventIdToTokens[eventId_].push(tokenIdIndex_);

        _tokenMeta[tokenIdIndex_] = TokenMeta({
            tokenId: tokenIdIndex_,
            eventId: eventId_,
            eventType: eventType_,
            pathData: pathData_,
            isUsed: false
        });

        emit MintTicket(tokenIdIndex_, eventId_, eventType_, pathData_);
    }

    function createTickets(
        address to_,
        uint8 eventId_,
        uint8 eventType_,
        string[] memory pathData_
    ) external onlyAdminEvent(msg.sender, eventId_) {
        require(to_ != address(0), "Address is Invalid");
        for (uint256 index_ = 0; index_ < pathData_.length; index_++) {
            uint256 tokenIdIndex_ = _allTokens.length.add(1);
            require(!_exists(tokenIdIndex_), "Token is Exists");
            _tokenOwner[tokenIdIndex_] = to_;
            _ownedTokensCount[to_] = _ownedTokensCount[to_].add(1);
            _allTokens.push(tokenIdIndex_);
            _eventIdToTokens[eventId_].push(tokenIdIndex_);
            _tokenMeta[tokenIdIndex_] = TokenMeta({
                tokenId: tokenIdIndex_,
                eventId: eventId_,
                eventType: eventType_,
                pathData: pathData_[index_],
                isUsed: false
            });
        }
    }

    function setTicketUsed(uint8 eventId_, uint256 tokenId_) external onlyTicketChecker(msg.sender, eventId_) {
        require(_exists(tokenId_), "Token is Exists");
        _tokenMeta[tokenId_].isUsed = true;
    }

    function setBatchTicketUsed(uint8 eventId_,  uint256[] memory tokenIds_) external  onlyTicketChecker(msg.sender, eventId_) {
        for (uint256 index_ = 0; index_ < tokenIds_.length; index_++) {
            require(_exists(tokenIds_[index_]), "Token is Exists");
            _tokenMeta[tokenIds_[index_]].isUsed = true;
        }
    }

    function setUri(string memory _uri) public onlyOwner {
        uri = _uri;
    }

    /////////////// VIEW //////////////

    function verifyAdmin(address admin_) public view returns (bool) {
        return _adminList[admin_];
    }

    function getTicket(uint256 tokenId_)
        public
        view
        returns (
            uint256,
            uint8,
            uint8,
            address,
            string memory,
            bool
        )
    {
        require(_exists(tokenId_), "Ticket is not found");
        return (
            _tokenMeta[tokenId_].tokenId,
            _tokenMeta[tokenId_].eventId,
            _tokenMeta[tokenId_].eventType,
            _tokenOwner[tokenId_],
            _tokenMeta[tokenId_].pathData,
            _tokenMeta[tokenId_].isUsed
        );
    }

    function totalSupply() public view returns (uint256) {
        return _allTokens.length;
    }

    function getListTicket(uint256 limit_, uint256 offset_)
        public
        view
        returns (
            uint256[] memory,
            uint8[] memory,
            uint8[] memory,
            address[] memory,
            string[] memory,
            bool[] memory
        )
    {
        uint256[] memory tokenIds = new uint256[](limit_);
        uint8[] memory eventIds = new uint8[](limit_);
        uint8[] memory eventTypes = new uint8[](limit_);
        address[] memory owners = new address[](limit_);
        string[] memory pathDatas = new string[](limit_);
        bool[] memory isUses = new bool[](limit_);
        for (uint256 index_ = 0; index_ < limit_; index_++) {
            uint256 tokenId_ = offset_ + index_;
            if (_exists(tokenId_)) {
                tokenIds[index_] = _tokenMeta[tokenId_].tokenId;
                eventIds[index_] = _tokenMeta[tokenId_].eventId;
                eventTypes[index_] = _tokenMeta[tokenId_].eventType;
                owners[index_] = _tokenOwner[tokenId_];
                pathDatas[index_] = _tokenMeta[tokenId_].pathData;
                isUses[index_] = _tokenMeta[tokenId_].isUsed;
            }
        }
        return (tokenIds, eventIds, eventTypes, owners, pathDatas, isUses);
    }
}
