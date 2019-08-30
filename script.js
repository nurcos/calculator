let a = 0;
let b = 0;
let total = 0;
let operator = '';
let operatorPressed = false;
let equalsPressed = false;

let allButtons = document.querySelectorAll('.button');
let displayValue = document.querySelector('.text-area');
let operatorButtons = document.querySelectorAll('.operator');
let digitButtons = document.querySelectorAll('.digit');

window.addEventListener('keydown', function(e){
  allButtons.forEach(function(button){
        if(e.keyCode == button.id){
          button.click();
          button.classList.add('keydown');
          setTimeout(function(){
            button.classList.remove('keydown');
            }, 100)
        }
  });
});

digitButtons.forEach(function(button){
    button.addEventListener('click', function(){
      if(operatorPressed == false && equalsPressed){
        total = 0;
        a = 0;
        b = 0;
        displayValue.textContent = ''
        equalsPressed = false;
      }
      if(displayValue.textContent == '0' || operatorPressed){
        displayValue.textContent = '';
        operatorPressed = false;
      }
      if(displayValue.textContent.length > 14){
        return;
      }

      displayValue.textContent += button.textContent

      if(a != 0){
        b = displayValue.textContent
      }
  });
});

operatorButtons.forEach(function(button){
    button.addEventListener('click', function(){
      if(a != 0 && b != 0){
        total = operate(operator, a, b);
        displayValue.textContent = total
      }

      operator = button.textContent
      a = displayValue.textContent

      operatorPressed = true;
  });
});

document.querySelector('.equals').addEventListener('click', function(){
  if(operator == ''){
    return;
  }
  if(operator == '÷' && total == 0){
    return;
  }
  total = operate(operator, a, b);
  displayValue.textContent = total

  equalsPressed = true;
});

document.querySelector('.clear').addEventListener('click', function(){
  a = 0;
  b = 0;
  total = 0;

  displayValue.textContent = total
});

document.querySelector('.decimal').addEventListener('click', function(){
  if(!displayValue.textContent.includes('.')){
    displayValue.textContent += '.'
  }
});

document.querySelector('.delete').addEventListener('click', function(){
  let string = displayValue.textContent
  if(operatorPressed == false){
    if(string.length > 0){
      string = string.slice(0, string.length-1);
    }
  }

  if(string.length == 0){
    displayValue.textContent = 0
    return;
  }
  displayValue.textContent = string
});


function operate(operator, a, b){
  if(operator == '+'){
    return plus(a, b)
  }
  else if (operator == '-') {
    return minus(a, b)
  }
  else if (operator == '×') {
    return multiply(a, b)
  }
  else if (operator == '÷') {
    return divide(a, b)
  }
}

function plus(a, b){
  return +a + +b;
}

function minus(a, b){
  return +a - +b;
}

function multiply(a, b){
  return +a * +b;
}

function divide(a, b){
  return +a / +b;
}
