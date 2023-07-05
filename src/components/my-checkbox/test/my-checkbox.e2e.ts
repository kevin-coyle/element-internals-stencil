import { newE2EPage } from '@stencil/core/testing';

describe('my-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-checkbox></my-checkbox>');

    const element = await page.find('my-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
