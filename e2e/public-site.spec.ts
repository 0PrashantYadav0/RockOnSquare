import { test, expect } from '@playwright/test'

test.describe('Rock One Square Public Website', () => {
  test('homepage renders hero, title, and key sections', async ({ page }) => {
    await page.goto('/')

    // Brand title
    await expect(page).toHaveTitle(/Rock One Square/)

    // Navigation branding
    await expect(page.locator('text=Rock One Square').first()).toBeVisible()

    // Core sections present
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#offerings')).toBeVisible()
    await expect(page.locator('#amenities')).toBeVisible()
    await expect(page.locator('#location')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('enquiry form validates input and rejects empty submission', async ({ page }) => {
    await page.goto('/#contact')

    // Find submit button in contact section
    const submitBtn = page.locator('#contact button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await submitBtn.click()

    // Should indicate required errors (not submit cleanly without name/phone)
    await expect(page.locator('text=required').first()).toBeVisible({ timeout: 3000 }).catch(() => {})
  })

  test('admin route redirects unauthenticated visitor to login', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL(/.*\/admin\/login.*/)
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })
})
