import { returnArrayFromText, setCharAt } from '../utils/helpers';

function applyValue(instruction, mask, memory) {
      const address = +instruction.split(/[\[\]]/g)[1];
      const value = +instruction.split(' = ')[1];
  
      const binaryArr = value.toString(2).padStart(36, '0').split('');
  
      const finalValue = binaryArr.map((val, i) => {
        const maskBit = mask[i];
        if (['0', '1'].includes(maskBit)) {
          return maskBit;
        }
        return val;
      }).join('');
  
      memory.set(
        address, parseInt(finalValue, 2)
      );
  
}

function getAllPossibilities(address, index) {
    if (index >= address.length) {
      return [ address ];
    }
    if (address[index] === 'X') {
      const newAddresses = [
        setCharAt(address, index, '0'),
        setCharAt(address, index, '1'),
      ];
      return newAddresses.flatMap(newAdd => [ ...getAllPossibilities(newAdd, index + 1) ]);
    }
    return getAllPossibilities(address, index + 1);
  }
  

function applyValueV2(instruction, mask, memory) {
      const address = +instruction.split(/[\[\]]/g)[1];
      const value = +instruction.split(' = ')[1];
  
      const addressBin = address.toString(2).padStart(36, '0');
  
      const staticAddressChanged = addressBin.split('').map((val, i) => {
        const maskBit = mask[i];
        if (maskBit === '0') {
          return val;
        }
        if (maskBit === '1') {
          return '1';
        }
        if (maskBit === 'X') {
          return 'X';
        }
      }).join('');
  
      const addresses = getAllPossibilities(staticAddressChanged, 0);
    
      addresses.forEach(add => {
        memory.set(
          parseInt(add, 2),
          value,
        )
      });
  }

function getResultsForAllMasks(array) {
    let mask = [];
    const results = new Map();
    for (let line of array) {
      if (line.includes('mask')) {
        mask = line.split(' = ')[1].split('');
      } else {
        applyValue(
          line,
          mask,
          results,
        );
      }
    }
    return results;
}

function getResultsForAllMasksVersion2(array) {
    let mask = [];
    const results = new Map();
    for (let line of array) {
      if (line.includes('mask')) {
        mask = line.split(' = ')[1].split('');
      } else {
        applyValueV2(
          line,
          mask,
          results,
        );
      }
    }
    return results;
  }

export function solvePart1 (text) {
    const array = returnArrayFromText(text);
    const result = getResultsForAllMasks(array);
    let sum = 0;
    result.forEach(value => sum += value);
  
    return sum;
}

export function solvePart2 (text) { 
    const array = returnArrayFromText(text);
    const result = getResultsForAllMasksVersion2(array);
    let sum = 0;
    result.forEach(value => sum += value);
    
    return sum;
}