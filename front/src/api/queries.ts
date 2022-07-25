import { DocumentNode, gql } from "@apollo/client";

export interface Event {
  id: number,
  name: string,
  image: string,
  location: string,
  startDate: Date,
  endDate: Date,
  status: number,
  owner: string,
  eventCategoryItems: [{
    eventCategory: {
      id: number,
      name: string,
    }
  }]
}

export interface EventType {
  id: number,
  name: string,
  image: string,
  location: string,
  startDate: string,
  endDate: string,
  owner: string,
  status: number,
  ticketToken: [{
    id: number,
    price: number,
    qrcode: string,
    status: string,
    approvers: string[],
    owner: string,
    ticketType: number,
  }]
  eventCategories: [{
    category: {
      id: number
      name: string,
    }
  }]
}

export const getAvailableEvents: DocumentNode = gql`
  query MyQuery {
    events: Event(where: {status: {_eq: 1}}) {
      id
      name
      image
      location: localtion
      startDate: start_date 
      endDate: end_date
      owner
      status
      issuedTickets: ticket_issued
      soldTickets: ticket_sold
      totalMoney: total_proceed
      ticketToken: TicketTokens {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`

export const getAvailableEventsByCate: DocumentNode = gql`
  query MyQuery($id: Int!) {
    events: Event(where: {EventCatogoryItems: {catogory_id: {_eq: $id}}, status: {_eq: 1}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      issuedTickets: ticket_issued
      soldTickets: ticket_sold
      totalMoney: total_proceed
      ticketToken: TicketTokens {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`

export const getNewestEvents:  DocumentNode = gql`
  query MyQuery {
    events: Event(order_by: {start_date: desc}, limit: 20, where: {status: {_eq: 1}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      issuedTickets: ticket_issued
      soldTickets: ticket_sold
      totalMoney: total_proceed
      ticketToken: TicketTokens {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`

export const getExpiringEvents:  DocumentNode = gql`
  query MyQuery {
    events: Event(order_by: {start_date: asc}, limit: 20, where: {status: {_eq: 1}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      ticketToken: TicketTokens {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`

export const getEventByID: DocumentNode = gql`
  query MyQuery($id: Int!) {
    event: Event(where: {id: {_eq: $id}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      ticketToken: TicketTokens {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`

export const getEventsBySearch: DocumentNode = gql`
  query MyQuery($search: String!) {
    events: Event(where: {name: {_ilike: $search}, status: {_eq: 1}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      ticketToken: TicketTokens(where: {}) {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`
export const getEventsBySearchAndCate: DocumentNode = gql`
  query MyQuery($search: String!, $categoryID: Int!) {
    events: Event(where: {name: {_ilike: $search}, status: {_eq: 1}, EventCatogoryItems: {catogory_id: {_eq: $categoryID}}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      ticketToken: TicketTokens(where: {}) {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`

export const getEventsByUser: DocumentNode = gql`
  query MyQuery($userName: String!) {
    events: Event(where: {owner: {_eq: $userName}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      ticketToken: TicketTokens(where: {}) {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`

export const getAvailableEventsByUser = gql`
  query getEventsUser($userName: String!) {
    events: Event(where: {owner: {_eq: $userName}, status: {_eq: 1}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      ticketToken: TicketTokens(where: {}) {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`;

export const getEventByIDAndOwner: DocumentNode = gql`
  query MyQuery($userName: String!, $eventID: Int!) {
    events: Event(where: {owner: {_eq: $userName}, id: {_eq: $eventID}}) {
      id
      name
      image
      location: localtion
      startDate: start_date
      endDate: end_date
      owner
      status
      ticketToken: TicketTokens(where: {}) {
        id
        price
        qrcode
        status
        approvers: approver
        owner: owner_address
        ticketType: ticket_type
      }
      eventCategories: EventCatogoryItems {
        category: EventCatogory {
          id
          name
        }
      }
    }
  }
`

export interface Category {
  id: number,
  name: string,
  type: string,
}

export const getCategories: DocumentNode = gql`
  query MyQuery {
    categories: EventCatogory {
      id
      name
      type
    }
  }

`
// dev tu get


export const getDataAccount = gql`
  query DataAccount($wallet_address: String!){
  UserNonce(where: {UserWallet: {wallet_address: {_eq: $wallet_address}}}) {
    id
    UserWallet {
      wallet_address
    }
  }
}
`


export interface EventCategory {
    eventCategory: {
      id: number,
      name: string,
    }
}


export const getEventsID =  gql`
  query getEventsID($id: Int!, $wallet_address: String!) {
    events: Event(where: {owner: {_eq: $wallet_address}, status: {_eq: 1}, id: {_eq: $id}}) {
      status
      startDate: start_date
      owner
      name
      location: localtion
      image
      id
      ticket_issued
      ticket_sold
      endDate: end_date
      eventCategoryItems: EventCatogoryItems {
        eventCategory: EventCatogory {
          id
          name
        }
      }
    }
  }
`;

export const eventCategory = gql`
  query MyQuery {
  EventCatogory {
    id
    name
    type
  }
}
`
export interface TicketInterface {
  id: number,
  price: number,
  qrcode: string,
  status: number,
  ticketType: number,
  ticketOwner: string,
  image: string,
  approvers: string[],
  transactions: [{
    id: number,
  }]
  event: {
    id: number,
    name: string,
    image: string,
    location: string,
    owner: string,
    startDate: string,
    endDate: string,
    status: number,
    eventCategories: [{
      category: {
        id: number
        name: string,
      }
    }]
  }
}

export const getTicketsByEvent = gql`
  query MyQuery($eventID: Int!) {
    tickets: TicketTokens(where: {Event: {id: {_eq: $eventID}}}) {
      id
      price
      qrcode
      status
      ticketType: ticket_type
      ticketOwner: owner_address
      image: image_link
      approvers: approver
      event: Event {
        id
        name
        image
        location: localtion
        owner
        startDate: start_date
        endDate: end_date
        status
        eventCategories: EventCatogoryItems {
          category: EventCatogory {
            id
            name
          }
        }
      }
      transactions: Transactions {
        id
      }
    }
  }
`

export const getSoldTicketsByEvent = gql`
  query MyQuery($ownerName: String!, $eventID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_neq: $ownerName}, Event: {owner: {_eq: $ownerName}, id: {_eq: $eventID}}}) {
      id
      price
      qrcode
      status
      ticketType: ticket_type
      ticketOwner: owner_address
      image: image_link
      approvers: approver
      event: Event {
        id
        name
        image
        location: localtion
        owner
        startDate: start_date
        endDate: end_date
        status
        eventCategories: EventCatogoryItems {
          category: EventCatogory {
            id
            name
          }
        }
      }
      transactions: Transactions {
        id
      }
    }
  }
`

export const getRemainingTicketsByEvent = gql`
  query MyQuery($ownerName: String!, $eventID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, Event: {owner: {_eq: $ownerName}, id: {_eq: $eventID}}}) {
      id
      price
      qrcode
      status
      ticketType: ticket_type
      ticketOwner: owner_address
      image: image_link
      approvers: approver
      event: Event {
        id
        name
        image
        location: localtion
        owner
        startDate: start_date
        endDate: end_date
        status
        eventCategories: EventCatogoryItems {
          category: EventCatogory {
            id
            name
          }
        }
      }
      transactions: Transactions {
        id
      }
    }
  }
`

export const getAvaiableTicketsByEvent = gql`
  query MyQuery($ownerName: String!, $eventID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, status: {_eq: 1}, Event: {owner: {_eq: $ownerName}, id: {_eq: $eventID}}}) {
      id
      price
      qrcode
      status
      ticketType: ticket_type
      ticketOwner: owner_address
      image: image_link
      approvers: approver
      event: Event {
        id
        name
        image
        location: localtion
        owner
        startDate: start_date
        endDate: end_date
        status
        eventCategories: EventCatogoryItems {
          category: EventCatogory {
            id
            name
          }
        }
      }
      transactions: Transactions {
        id
      }
    }
  }
`

export const getTicketByID = gql`
  query MyQuery($id: Int!) {
    tickets: TicketTokens(where: {id: {_eq: $id}}) {
      id
      price
      qrcode
      status
      ticketType: ticket_type
      ticketOwner: owner_address
      image: image_link
      approvers: approver
      event: Event {
        id
        name
        image
        location: localtion
        owner
        startDate: start_date
        endDate: end_date
        status
        eventCategories: EventCatogoryItems {
          category: EventCatogory {
            id
            name
          }
        }
      }
      transactions: Transactions {
        id
      }
    }
  }
`

export const getBoughtTicketsByOwner = gql`
  query MyQuery($ownerName: String!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, Event: {owner: {_neq: $ownerName}}}) {
      id
      price
      qrcode
      status
      ticketType: ticket_type
      ticketOwner: owner_address
      image: image_link
      approvers: approver
      event: Event {
        id
        name
        image
        location: localtion
        owner
        startDate: start_date
        endDate: end_date
        status
        eventCategories: EventCatogoryItems {
          category: EventCatogory {
            id
            name
          }
        }
      }
      transactions: Transactions {
        id
      }
    }
  }
`

export const getBoughtTicketByIDAndOwner = gql`
  query MyQuery($ownerName: String!, $ticketID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, Event: {owner: {_neq: $ownerName}}, id: {_eq: $ticketID}}) {
      id
      price
      qrcode
      status
      ticketType: ticket_type
      ticketOwner: owner_address
      image: image_link
      approvers: approver
      event: Event {
        id
        name
        image
        location: localtion
        owner
        startDate: start_date
        endDate: end_date
        status
        eventCategories: EventCatogoryItems {
          category: EventCatogory {
            id
            name
          }
        }
      }
      transactions: Transactions {
        id
      }
    }
  }
`

export const getIssuedTickets = gql`
  query MyQuery($ownerName: String!, $eventID: Int!) {
    tickets: TicketTokens(where: {owner_address: {_eq: $ownerName}, Event: {owner: {_eq: $ownerName}, id: {_eq: $eventID} }}) {
      id
      price
      qrcode
      status
      ticketType: ticket_type
      ticketOwner: owner_address
      image: image_link
      approvers: approver
      event: Event {
        id
        name
        image
        location: localtion
        owner
        startDate: start_date
        endDate: end_date
        status
        eventCategories: EventCatogoryItems {
          category: EventCatogory {
            id
            name
          }
        }
      }
      transactions: Transactions {
        id
      }
    }
  }
`

export interface UserStatisticInterface {
  id: number,
  totalMoneyOfMultiTimeTickets: number | null
  totalMoneyOfOneTimeTickets: number | null
  totalBoughtTickets: number | null
  totalIssuedTickets: number | null
  totalMultiTimeTickets: number | null
  totalOneTimeTickets: number | null
  totalSoldTickets: number | null
  totalMoney: number | null
  userID: number
  userWallet:  {
    id: number
    walletAdress: string
  }
}

export const getUserStatistic = gql`
  query MyQuery($id: Int!) {
    userData: UserNonce(where: {id: {_eq: $id}}) {
      id
      totalMoneyOfMultiTimeTickets: money_total_ticket_mul
      totalMoneyOfOneTimeTickets: money_total_ticket_ot
      totalBoughtTickets: ticket_bought
      totalIssuedTickets: ticket_issued
      totalMultiTimeTickets: ticket_multi_use
      totalOneTimeTickets: ticket_one_time_use
      totalSoldTickets: ticket_sold
      totalMoney: total_proceeds
      userID: address_id
      userWallet: UserWallet {
        id
        walletAdress: wallet_address
      }
    }
  }

`

export interface EventStatisInterface {
  issued: number | null,
  sold: number | null,
  total: number | null,
}

export const getEventStatistic = gql`
  query MyQuery($id: Int!) {
    event: Event(where: {id: {_eq: $id}}) {
      issued: ticket_issued
      sold: ticket_sold
      total: total_proceed
    }
  }
`

export interface FavouritedDataInterface {
  id: number,
  user: number,
  ticketID: number,
  verified: boolean,
  favorited: number,
}

export const getFavouritedDataByTicketAndUser = gql`
  query MyQuery($userID: Int!, $ticketID: Int = 10) {
    collection: TicketCollection(where: {tiket_token_id: {_eq: $ticketID}, owner: {_eq: $userID}}) {
      id
      user: owner
      ticketID: tiket_token_id
      verified
      favorited
    }
  }
`

export interface FavouriteTicketListInterface {
  id: number,
  user: number,
  ticketID: number,
  verified: boolean,
  favorited: number,
  ticket: {
    id: number,
    price: number,
    qrcode: string,
    status: number,
    ticketType: number,
    ticketOwner: string,
    image: string,
    approvers: string[],
    transactions: [{
      id: number,
    }]
    event: {
      id: number,
      name: string,
      image: string,
      location: string,
      owner: string,
      startDate: string,
      endDate: string,
      status: number,
      eventCategories: [{
        category: {
          id: number
          name: string,
        }
      }]
    }
  }
}

export const getFavouritedTicketList = gql`
  query MyQuery {
    collection: TicketCollection {
      id
      user: owner
      ticketID: tiket_token_id
      verified
      favorited
      ticket: TicketToken {
        id
        price
        qrcode
        status
        ticketType: ticket_type
        ticketOwner: owner_address
        image: image_link
        approvers: approver,
        event: Event {
          id
          name
          image
          location: localtion
          owner
          startDate: start_date
          endDate: end_date
          status
          eventCategories: EventCatogoryItems {
            category: EventCatogory {
              id
              name
            }
          }
        }
        transactions: Transactions {
          id
        }
      }
    }
  } 
`

export const getFavouritedTicketListByUser = gql`
  query MyQuery($userID: Int!, $userName: String!) {
    collection: TicketCollection(where: {owner: {_eq: $userID}, TicketToken: {Event: {owner: {_neq: $userName}}}}) {
      id
      user: owner
      ticketID: tiket_token_id
      verified
      favorited
      ticket: TicketToken {
        id
        price
        qrcode
        status
        ticketType: ticket_type
        ticketOwner: owner_address
        image: image_link
        approvers: approver,
        event: Event {
          id
          name
          image
          location: localtion
          owner
          startDate: start_date
          endDate: end_date
          status
          eventCategories: EventCatogoryItems {
            category: EventCatogory {
              id
              name
            }
          }
        }
        transactions: Transactions {
          id
        }
      }
    }
  }

`