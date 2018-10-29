import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import calculateResult from '../utils/calculateResult'
import { to } from '../utils/async'

/**
 * @param req - Express HTTP Request
 * @param res - Express HTTP Response
 */
async function calculatorRequest(req, res) {
  const { number1: unparsedNumber1, number2: unparsedNumber2 } = req.body || {}
  const number1 = Number(unparsedNumber1)
  const number2 = Number(unparsedNumber2)
  const operation = req.body.operation
  const result = calculateResult(number1, number2, operation)

  const [rtdbError] = await to(
    admin
      .database()
      .ref('/calculated')
      .set(result)
  )

  const [firestoreError] = await to(
    admin
      .firestore()
      .collection('calculated')
      .doc('value')
      .set({ result })
  )

  let htmlResponse = ''
  if (rtdbError || firestoreError) {
    htmlResponse = 'Error is storing the data'
  } else {
    htmlResponse = 'Data Successfully Stored'
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end(`Message from calculator: ${htmlResponse}`)
}

/**
 * @name calculator
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.onRequest(calculatorRequest)
