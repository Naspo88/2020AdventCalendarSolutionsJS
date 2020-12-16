import { returnArrayFromText } from '../utils/helpers';

function buildRulesRangesObject(rules) {
  const ruleObject = {};

  rules.forEach(rule => {
    const [key, stringRanges] = rule;
    const [range1, range2] = returnArrayFromText(stringRanges, ' or ');
    
    ruleObject[key] = (val) => {
      const range1Val = returnArrayFromText(range1, '-');
      const range2Val = returnArrayFromText(range2, '-');
      return (val >= +range1Val[0] && val <= +range1Val[1]) || (val >= +range2Val[0] && val <= +range2Val[1]);
    }
  });

  return ruleObject;
}

function valuesFitInOneRule(rules, val) {
  let itFit = false;
  
  Object.keys(rules).forEach(key => {
    if (rules[key](val)) {
      itFit = true;
      return false;
    }
  });

  return itFit;
}

function valuesCanBeType(rules, possible, val) {
  const itFit = [];
  
  Object.keys(rules).forEach(key => {
    if (possible.indexOf(key) > -1) {
      if (rules[key](val)) {
        itFit.push(key);
      }
    }
  });

  return itFit;
}

function returnSumOfInvalidValues(tickets, rules) {
  let sum = 0;
  tickets.forEach(tickNumbList => {
    tickNumbList.forEach(val => {
      if (!valuesFitInOneRule(rules, val)) {
        sum += val;
      }
    });
  });

  return sum;
}

function getUsefullObjectsFromText(text) {
  const [rules, myTicket, nearbyTicket] = returnArrayFromText(text, '\n\n');
  const myTicketsValues = returnArrayFromText(returnArrayFromText(myTicket)[1], ',').map(Number);
  const ruleArray = returnArrayFromText(rules).map(str => returnArrayFromText(str, ': '));
  const ruleObject = buildRulesRangesObject(ruleArray);
  const nearbyTicketsList = returnArrayFromText(nearbyTicket);
  nearbyTicketsList.shift();
  const ticketAsNumber = nearbyTicketsList.map(ticket => returnArrayFromText(ticket, ',').map(Number));

  return { ruleObject, myTicketsValues, ticketAsNumber }
}

export function solvePart1 (text) {
  const { ruleObject, ticketAsNumber } = getUsefullObjectsFromText(text);

  return returnSumOfInvalidValues(ticketAsNumber, ruleObject);
}

function getWhatCanBe(canBe) {
  const indexes = Object.keys(canBe);
  let result = canBe[indexes[0]];
  for (let i = 1; i < indexes.length; i++) {
    result = result.filter(val => canBe[indexes[i]].includes(val));
  }

  return result;
}

function polishOrder(order) {
  const indexSingle = order.findIndex(arr => arr.length === 1);
  if (indexSingle >= 0) {
    const value = order[indexSingle][0];
    order[indexSingle] = value;
    order = order.map(arr => {
      if (typeof arr !== 'string') {
        const index = arr.indexOf(value);
        if (index >= 0) {
          arr.splice(index, 1);
        }
        return arr;
      }
      return arr;
    });
    order = polishOrder(order);
  }
  return order;
}

export function getOrder({text, validTicket, rules }) {
  let ruleObject, ticketAsNumber;
  if (text) {
    const full = getUsefullObjectsFromText(text);
    ruleObject = full.ruleObject;
    ticketAsNumber = full.ticketAsNumber;
  }
  validTicket = validTicket || ticketAsNumber;
  rules = rules || ruleObject;
  const possibleValues = Object.keys(rules);
  const lengthNeeded = possibleValues.length;
  let i = 0;
  const order = [];
  while (i < lengthNeeded) {
    const canBe = {};
    const arrayOfIElem = validTicket.map(arr => arr[i]);
    arrayOfIElem.forEach((val, j) => {
      canBe[j] = valuesCanBeType(rules, possibleValues, val);
    });

    const indexIs = getWhatCanBe(canBe);
    order.push(indexIs);

    i++;
  }

  const realOrder = polishOrder(order);
  return realOrder;
}

function getOnlyTicketsValid(rules, allTickets) {
  const validTicket = [];

  allTickets.forEach(tickNumbList => {
    let isValidTicket = true;
    tickNumbList.forEach(val => {
      if (!valuesFitInOneRule(rules, val)) {
        isValidTicket = false;
      }
    });

    if (isValidTicket) {
      validTicket.push(tickNumbList);
    }
  });

  return validTicket;
}

export function solvePart2 (text) {
  const { ruleObject, ticketAsNumber, myTicketsValues } = getUsefullObjectsFromText(text);
  const validTickets = getOnlyTicketsValid(ruleObject, ticketAsNumber);

  const order = getOrder({validTicket: validTickets, rules: ruleObject});
  const departureIndex = [];
  order.forEach((val, i) => {
    if (val.includes('departure')) {
      departureIndex.push(i);
    }
  });

  return departureIndex.reduce((acc, ind) => acc * myTicketsValues[ind], 1);
}
