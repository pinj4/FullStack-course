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

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User2',
        username: 'testuser2',
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

      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('1st test blog')
      await page.getByTestId('author').fill('writer author')
      await page.getByTestId('url').fill('www.urlforblog1.com')
      await page.getByTestId('save-button').click()
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

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be removed by its creator', async ({page}) => {
      await page.getByRole('button', { name: 'show' }).click()

      await page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'delete' }).click()

      await expect(page.getByText('Deleted 1st test blog by writer author')).toBeVisible()
      await expect(page.getByText('1st test blog - writer author')).toBeHidden()
    })

    test('delete-button visible to blog creator only', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('2nd test blog')
      await page.getByTestId('author').fill('blogger author')
      await page.getByTestId('url').fill('www.urlforblog2.com')
      await page.getByTestId('save-button').click()
      
      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByText('delete')).toBeVisible()

      await page.getByRole('button', { name: 'log out' }).click()

      await page.getByTestId('username').fill('testuser2')
      await page.getByTestId('password').fill('topsecret123')
      await page.getByTestId('login-button').click()

      await page.getByRole('button', { name: 'show' }).last().click()
      await expect(page.getByText('delete')).toBeHidden()
    })

    test('blogs ordered by likes', async ({ page }) => {
      // creating a new blog with 1st user
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('2nd test blog')
      await page.getByTestId('author').fill('blogger author')
      await page.getByTestId('url').fill('www.urlforblog2.com')
      await page.getByTestId('save-button').click()

      // liking both blogs & logging out
      await page.getByRole('button', { name: 'show' }).first().click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.getByRole('button', { name: 'show' }).last().click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'log out' }).click()

      // logging in as the 2nd user & liking the 2nd blog
      await page.getByTestId('username').fill('testuser2')
      await page.getByTestId('password').fill('topsecret123')
      await page.getByTestId('login-button').click()

      await page.getByRole('button', { name: 'show' }).last().click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 2')).toBeVisible()

      // reload
      await page.goto('http://localhost:5173')

      // checking the order
      await page.getByRole('button', { name: 'show' }).first().click()
      await expect(page.getByText('likes 2')).toBeVisible()
      await expect(page.getByText('www.urlforblog2.com')).toBeVisible()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.getByRole('button', { name: 'show' }).last().click()
      await expect(page.getByText('likes 1')).toBeVisible()
      await expect(page.getByText('www.urlforblog1.com')).toBeVisible()
    })
  })
})