import { newSpecPage } from '@stencil/core/testing';
import { MyCheckbox } from '../my-checkbox';

describe('my-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyCheckbox],
      html: `<my-checkbox></my-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <my-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-checkbox>
    `);
  });
});
