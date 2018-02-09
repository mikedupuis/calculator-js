var register;
var expression;

function setOutput(x) {
  $('#output-text').val(x);
}

function appendToExpression(val) {
  expression += val;
  setOutput(expression);
}

function appendOperatorToExpression(op) {
  // Append the operator if the last element of the expression is a number
  var elements = expression.split(' ');
  if (!isNaN(parseFloat(elements[elements.length - 1]))) {
    appendToExpression(' ' + op + ' ');
    return;
  }
  
  // Append a minus sign if the expression is empty
  if ((0 == expression.localeCompare('')) && (0 == op.localeCompare('-'))) {
    appendToExpression(' ' + op + ' ');
    return;
  }
}

function appendDotToExpression() {
  var elements = expression.split(' ');
  if (-1 == elements[elements.length-1].indexOf('.')) {
    appendToExpression('.');
  }
}

function setRegister(value) {
  $('#register-text').html(value);
}

function reset() {
  expression = '';
  setRegister(expression);
  setOutput('0');
}

function evaluate() {
  if (expression.split(' ').length < 2)
    return;
  
  setRegister(expression);
  setOutput(eval(expression));
  expression = $('#output-text').val();  
}

function keyPressHandler(e) {
  console.log(e);
  var k = e.key;
  switch (k) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      appendToExpression(k);
      break;
      
    case '/':
    case '*':
    case '+':
    case '-':
      appendOperatorToExpression(k);
      break;
      
    case '.':
      appendToExpression(k);
      break;
      
    case 'Enter':
    case '=':
      evaluate();
      break;
  }
}

$(document).ready(function() {
  reset();
  $('#btn-0').click(function() {appendToExpression('0'); });
  $('#btn-1').click(function() {appendToExpression('1'); });
  $('#btn-2').click(function() {appendToExpression('2'); });
  $('#btn-3').click(function() {appendToExpression('3'); });
  $('#btn-4').click(function() {appendToExpression('4'); });
  $('#btn-5').click(function() {appendToExpression('5'); });
  $('#btn-6').click(function() {appendToExpression('6'); });
  $('#btn-7').click(function() {appendToExpression('7'); });
  $('#btn-8').click(function() {appendToExpression('8'); });
  $('#btn-9').click(function() {appendToExpression('9'); });
  $('#btn-divide').click(function() {appendOperatorToExpression('/'); });
  $('#btn-times').click(function() {appendOperatorToExpression('*'); });
  $('#btn-minus').click(function() {appendOperatorToExpression('-'); });
  $('#btn-plus').click(function() {appendOperatorToExpression('+'); });
  $('#btn-dot').click(appendDotToExpression);
  $('#btn-ac').click(reset);
  $('#btn-eq').click(evaluate);
  
  $(document).keypress(keyPressHandler);
});
