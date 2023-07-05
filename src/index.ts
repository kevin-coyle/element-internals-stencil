const FORM_ASSOCIATED_ELEMENTS = ['my-checkbox'];

const define = customElements.define;

interface MyCustomElement extends HTMLElement {
    formAssociated: boolean;
    foo: () => void;
}

customElements.define = (name, constructor, options) => {
    if (FORM_ASSOCIATED_ELEMENTS.includes(name)) {
        (constructor as unknown as MyCustomElement).formAssociated = true;

        constructor.prototype.formDisabledCallback = function(disabled: boolean) {
            console.log(this);
            // handle the 'disabled' attribute of the element or an ancestor <fieldset> being updated
        };

        constructor.prototype.formResetCallback = function() {
            // handle the parent/owner form being reset
        };

        constructor.prototype.formStateRestoreCallback = function(state: any, mode: any) {
            // handle the browser wanting to restore user-visible state
        };
    }

    define.call(customElements, name, constructor, options);
};

export * from './components';
