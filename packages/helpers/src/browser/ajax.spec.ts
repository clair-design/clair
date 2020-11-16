import { ajax, RequestOption } from './ajax'
import sinon from 'sinon'

let xhr: sinon.SinonFakeXMLHttpRequestStatic
let requests: sinon.SinonFakeXMLHttpRequest[]

const option: RequestOption = {
  action: 'https://jsonplaceholder.typicode.com/posts/',
  data: { timestamp: '1575009491403' },
  filename: 'image.png',
  file: new File([new Blob()], 'image.png', { type: 'image/png' }),
  headers: { 'X-Id': '131415926' },
  method: 'post',
  onError: (e: Error | ProgressEvent<EventTarget>) => {},
  onSuccess: (e: object) => {}
}

describe('request', () => {
  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()
    requests = []
    xhr.onCreate = (req: sinon.SinonFakeXMLHttpRequest) => requests.push(req)

    option.onError = (e: Error | ProgressEvent<EventTarget>) => {}
    option.onSuccess = (e: object) => {}
  })

  afterEach(() => {
    xhr.restore()
  })

  it('upload request success', done => {
    option.onError = done
    option.onSuccess = (res: object) => {
      expect(res).toEqual({ success: true })
      done()
    }
    ajax(option)
    requests[0].respond(200, {}, '{"success": true}')
  })

  it('40x code should be error', done => {
    option.onError = err => {
      expect(err.toString()).toContain('Not found')
      done()
    }

    option.onSuccess = () => done('404 should throw error')
    ajax(option)
    requests[0].respond(404, {}, 'Not found')
  })

  it('2xx code should be success', done => {
    option.onError = done
    option.onSuccess = res => {
      expect(res).toEqual('success')
      done()
    }
    ajax(option)
    requests[0].respond(204, {}, 'success')
  })

  it('get headers', () => {
    ajax(option)
    expect(requests[0].requestHeaders).toEqual({ 'X-Id': '131415926' })
  })
})
