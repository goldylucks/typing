import request from 'supertest-as-promised'

import server from '../../'
import texts from '../../../shared/modules/texts'
import { texts as seededTexts } from '../../serverUtils/seedData'

const app = request(server)

test('api/texts/getList', () => app.get(texts.endpoints.FETCH_LIST)
  .then((resp) => {
    expect(resp.body).toEqual(expect.any(Array))
    expect(resp.body).toHaveLength(seededTexts.length)
  }),
)

test('api/texts/getItem', () => app.get(texts.endpoints.fetchItem(seededTexts[0]._id))
  .then((resp) => {
    expect(resp.body).toEqual(expect.objectContaining(seededTexts[0]))
  }),
)
