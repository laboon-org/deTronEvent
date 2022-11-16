const fetch = require("../../fetch/index");
require("dotenv").config();

const get_eventcf = `
query ($name: String!) {
    Event(where: {name: {_eq: $name}}) {
      name
    }
  }
`;
const execute = async (variables: any) => {
  const fetchResponse = await fetch(variables, get_eventcf);
  const data = await fetchResponse.json();
  return data;
};
module.exports = execute;
export {};
