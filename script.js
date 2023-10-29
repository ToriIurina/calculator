const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const changeSingBtn = document.getElementById('change-sing-operator');
const decimalBtn = document.getElementById('decimal');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);

changeSingBtn.addEventListener('click', changeSing);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {
  let localOperationMemory = display.value || 0;
  
  if (MemoryNewNumber && MemoryPendingOperation !== '=' && MemoryPendingOperation !== '' && MemoryPendingOperation !== '+/-') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    switch (true) {
      case MemoryPendingOperation === '+':
        MemoryCurrentNumber = ((+localOperationMemory + MemoryCurrentNumber).toFixed(14) * 1000) / 1000;
        break;
      case MemoryPendingOperation === '-':
        MemoryCurrentNumber = ((MemoryCurrentNumber - +localOperationMemory).toFixed(14) * 1000) / 1000;
        break;
      case MemoryPendingOperation === '*':
        MemoryCurrentNumber = ((MemoryCurrentNumber * +localOperationMemory).toFixed(14) * 1000) / 1000;
        break;
      case MemoryPendingOperation === '/': {
        if (localOperationMemory === '0') {
          MemoryCurrentNumber = 'Error';
        } else {
          MemoryCurrentNumber /= +localOperationMemory;
        }
      }
        break;
      case MemoryPendingOperation === '^':
        MemoryCurrentNumber **= +localOperationMemory;
        break;
      case MemoryPendingOperation === '√': {
        if (localOperationMemory < 0) {
          MemoryCurrentNumber = 'Error';
        } else {
          MemoryCurrentNumber = Math.sqrt(+localOperationMemory);
        }
      }
        break;
      default:
        MemoryCurrentNumber = +localOperationMemory;
    }
  }

  display.value = MemoryCurrentNumber;
  MemoryPendingOperation = op;
}

function decimal(argument) {
  let localDecimalMemory = display.value;
  
  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

function changeSing(argument) {
  let localMemoryCurrentNumber;
  if(display.value < 0) {
    localMemoryCurrentNumber = Math.abs(display.value);
  } else {
    localMemoryCurrentNumber = -Math.abs(display.value);
  }
  display.value = localMemoryCurrentNumber;
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}
