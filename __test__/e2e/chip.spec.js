/**
 * https://jestjs.io/docs/en/puppeteer
 * https://github.com/smooth-code/jest-puppeteer
 */
/**
 * TODO
 * a series of processes to set up devServer and run E2E tests
 */
describe('E2E testing', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/')
  })

  it('should display description on page', async () => {
    await expect(page).toMatch('一套包含设计规范、Vue 组件和配套资源的设计系统。')
  })
})
