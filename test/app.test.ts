import request from "supertest"
import {createServer} from "../src/app.ts"

describe('appInstance (E2E)', ()=>{
    it('GET /', () => {
      return request(createServer())
      .get('/')
      .expect(200)
      .then((response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({message: expect.any(String)})
        )
      })
    })
})