const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'test username',
        password: 'topsecret123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const title = await page. getByRole('heading', { name: 'Login' })
    const username = await page. getByText('username')
    const password = await page. getByText('password')
    const button = await page. getByRole('button', { name: 'login' })
    await expect(title).toBeVisible()
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
    await expect(button).toBeVisible()
  })
})