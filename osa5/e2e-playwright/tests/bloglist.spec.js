const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'topsecret123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const title = await page.getByRole('heading', { name: 'Login' })
    const username = await page.getByTestId('username')
    const password = await page.getByTestId('password')
    const button = await page.getByTestId('login-button')
    await expect(title).toBeVisible()
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
    await expect(button).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('topsecret123')
      await page.getByTestId('login-button').click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('wrong name :(')
      await page.getByTestId('password').fill('password')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })
})