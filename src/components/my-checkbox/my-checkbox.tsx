import { Component, Prop, h, State, Element, Method } from '@stencil/core';

@Component({
  tag: 'my-checkbox',
  styleUrl: 'my-checkbox.css',
  shadow: true,
})
export class MyCheckbox {
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop() label = 'Form Label';
  @Prop() value = 'on';
  @Prop() required = false;
  @Prop() disabled = false; // DO NOT REFLECT THIS https://github.com/whatwg/html/issues/8365
  @Element() el: HTMLElement;

  @State() internals: ElementInternals;

  @State()
  internalDisabled = false;

  componentWillLoad() {
    if ((window as any).ElementInternals) {
      if ((this.el as any).internals) {
        this.internals = (this.el as any).internals;
      } else {
        this.internals = this.el.attachInternals();
      }
    }
  }

  componentDidLoad() {
    this.internals.setFormValue(this.checked.toString());
  }

  @Method()
  public customFormDisabledCallback(disabled: boolean) {
    this.internalDisabled = disabled;
  }

  private handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.internals.setFormValue(this.value);
    this.el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  render() {
    return (
      <div class="checkbox">
        <label htmlFor="checkbox">{this.label}</label>
        <input required={this.required} id="checkbox" type="checkbox" checked={this.checked} disabled={this.internalDisabled} onChange={this.handleChange.bind(this)} />
      </div>
    );
  }

}
