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

      await page.getByTestId('login-button').click()


      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('topsecret123')
      await page.getByTestId('login-button').click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('test blog')
      await page.getByTestId('author').fill('blog author')
      await page.getByTestId('url').fill('www.urlhere.com')
      await page.getByTestId('save-button').click()

      await expect(page.getByText('a new blog "test blog" by blog author added!')).toBeVisible()
      await expect(page.getByText('test blog - blog author')).toBeVisible()
    })
  })
})