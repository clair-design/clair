// SEE https://jestjs.io/docs/en/puppeteer
import puppeteer from 'puppeteer'

let page
let browser
const width = 1920
const height = 1080

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
})

afterAll(() => {
  browser.close()
})

it('chip', () => {
  // TODO
  expect('Clair').toBe('Clair')
})
