/**
 * Initializes form association for custom elements.
 * Custom elements with the 'formAssociated' property set to true can participate in forms.
 */
export function initFormAssociation() {
    const FORM_ASSOCIATED_ELEMENTS = ['my-checkbox'];

    const define = customElements.define;

    interface CustomElementConstructor {
        formAssociated?: boolean;
        new (): HTMLElement;
    }

    customElements.define = function(name, constructor, options) {
        if (FORM_ASSOCIATED_ELEMENTS.includes(name)) {
            (constructor as CustomElementConstructor).formAssociated = true;

            constructor.prototype.formDisabledCallback = function(_disabled: boolean) {
                // handle the 'disabled' attribute of the element or an ancestor <fieldset> being updated
                if (typeof this.customFormDisabledCallback === 'function') {
                    this.customFormDisabledCallback(_disabled);
                }
            };

            constructor.prototype.formResetCallback = function() {
                // handle the parent/owner form being reset
                if (typeof this.customFormResetCallback === 'function') {
                    this.customFormResetCallback();
                }
            };

            constructor.prototype.formStateRestoreCallback = function(_state: unknown, _mode: string) {
                // handle the browser wanting to restore user-visible state
                if (typeof this.customFormStateRestoreCallback === 'function') {
                    this.customFormStateRestoreCallback();
                }
            };
        }

        define.call(customElements, name, constructor, options);
    };
}