const fetch = require("../../fetch/index");
require("dotenv").config();

const update_ticket = `
mutation ($create_at: timestamptz!, $image_link: String!, $approver: jsonb, $user_id: Int!, $type: Int!, $event: Int!, $owner_address: String!, $ticket_type: Int!,$price:float8!,$class_ticket:String!) {
  insert_Transaction(objects: {create_at: $create_at, user_id: $user_id,status:1, type: $type, TicketToken: {data: {event: $event, image_link: $image_link,owner_address: $owner_address, ticket_type: $ticket_type, approver: $approver, status:1,price:$price,class_ticket:$class_ticket}}}) {
    affected_rows
    returning {
      create_at
      id
      ticket_id
      type
      user_id
      TicketToken {
        event
        owner_address
        ticket_type
        id
        image_link
      }
    }
  }
}
`;
const execute = async (variables: Object) => {
  const fetchResponse = await fetch(variables, update_ticket);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
