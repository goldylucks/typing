import request from 'supertest-as-promised'

import server from '../../'
import texts from '../../../shared/modules/texts'
import { texts as seededTexts } from '../../serverUtils/seedData'

const app = request(server)

test('api/texts/getList', () => app.get(texts.routes.path.fetchtextsEndpoint())
  .then((resp) => {
    expect(resp.body).toEqual(expect.any(Array))
    expect(resp.body).toHaveLength(seededTexts.length)
  }),
)

test('api/texts/getItem', () => app.get(texts.routes.path.fetchtextEndpoint(texts[0]._id))
  .then((resp) => {
    expect(resp.body).toEqual(expect.objectContaining(texts[0]))
  }),
)

test('api/texts/updateItem (admin, success)', () => app.put(texts.routes.path.updatetextEndpoint(texts[0]._id))
  .send({ name: 'mahalo' })
  .then((resp) => {
    expect(resp.status).toBe(204)
  }),
)

test('api/texts/updateItem (user, fail)', () => app.put(texts.routes.path.updatetextEndpoint(texts[0]._id))
  .send({ name: 'mahalo' })
  .then((resp) => {
    expect(resp.status).toBe(401)
  }),
)

test('api/texts/deleteItem (admin, success)', () => app.put(texts.routes.path.deletetextEndpoint(texts[0]._id))
  .then((resp) => {
    expect(resp.status).toBe(204)
  }),
)

test('api/texts/deleteItem (user, fail)', () => app.put(texts.routes.path.deletetextEndpoint(texts[0]._id))
  .then((resp) => {
    expect(resp.status).toBe(401)
  }),
)
