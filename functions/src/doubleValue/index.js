import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from '../utils/async'

/**
 * @param  {functions.Event} event - Function event
 * @param {functions.Context} context - Functions context
 * @return {Promise}
 */
async function doubleValueEvent(change, context) {
  const eventData = change.after.val()
  console.log(eventData)
  const ref = admin.database().ref(`/double`)
  const [writeErr, response] = await to(ref.set(2 * eventData))
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)
    throw writeErr
  }
  return response
}

/**
 * @name doubleValue
 * Cloud Function triggered by Real Time Database Update Event
 * @type {functions.CloudFunction}
 */
export default functions.database.ref('/calculated').onWrite(doubleValueEvent)
