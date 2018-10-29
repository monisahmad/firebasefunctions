export default function calculateResult(number1, number2, operation) {
  let result = 0
  switch (operation) {
    case 'add':
      result = number1 + number2
      break
    case 'sub':
      result = number1 - number2
      break
    case 'mul':
      result = number1 * number2
      break
    case 'div':
      result = number1 / number2
      break
    default:
      result = 0
      break
  }
  return result
}
