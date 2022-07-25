import { EventType } from "../api/queries";


export const getTicketType = (event: EventType): number[] => {
  let ticketTypeList: number[] = [];
  event.ticketToken.forEach(ticket => {
    if (ticketTypeList.indexOf(ticket.ticketType) === -1) {
      ticketTypeList = [...ticketTypeList, ticket.ticketType];
    }
  })
  return ticketTypeList;
}