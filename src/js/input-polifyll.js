/**
 * jQuery "splendid textchange" plugin
 * http://benalpert.com/2013/06/18/a-near-perfect-oninput-shim-for-ie-8-and-9.html
 *
 * (c) 2013 Ben Alpert, released under the MIT license
 */

(function() {
    var hasInputCapabilities = function(elem) {
        // The HTML5 spec lists many more types than `text` and `password` on
        // which the input event is triggered but none of them exist in IE 8 or
        // 9, so we don't check them here.
        // TODO: <textarea> should be supported too but IE seems to reset the
        // selection when changing textarea contents during a selectionchange
        // event so it's not listed here for now.
        return elem.tagName === "INPUT" &&
            (elem.type === "text" || elem.type === "password");
    };

    var activeElement = null;
    var activeElementValue = null;
    var activeElementValueProp = null;

    /**
     * (For old IE.) Replacement getter/setter for the `value` property that
     * gets set on the active element.
     */
    var newValueProp =  {
        get: function() {
            return activeElementValueProp.get.call(this);
        },
        set: function(val) {
            activeElementValue = val;
            activeElementValueProp.set.call(this, val);
        }
    };

    /**
     * (For old IE.) Starts tracking propertychange events on the passed-in element
     * and override the value property so that we can distinguish user events from
     * value changes in JS.
     */
    var startWatching = function(target) {
        activeElement = target;
        activeElementValue = target.value;
        activeElementValueProp = Object.getOwnPropertyDescriptor(
                target.constructor.prototype, "value");

        Object.defineProperty(activeElement, "value", newValueProp);
        activeElement.attachEvent("onpropertychange", handlePropertyChange);
    };

    /**
     * (For old IE.) Removes the event listeners from the currently-tracked
     * element, if any exists.
     */
    var stopWatching = function() {
        if (!activeElement) return;

        // delete restores the original property definition
        delete activeElement.value;
        activeElement.detachEvent("onpropertychange", handlePropertyChange);

        activeElement = null;
        activeElementValue = null;
        activeElementValueProp = null;
    };

    /**
     * (For old IE.) Handles a propertychange event, sending a textChange event if
     * the value of the active element has changed.
     */
    var handlePropertyChange = function(nativeEvent) {
        if (nativeEvent.propertyName !== "value") return;

        var value = nativeEvent.srcElement.value;
        if (value === activeElementValue) return;
        activeElementValue = value;

        // triggerInputEvent(activeElement);
        activeElement.dispatchEvent(new Event('input', {
            bubbles: true,
            cancelable: false
        }));
    };

    var triggerInputEvent = function(el) {
        var e = document.createEventObject();

        e.type = 'input';
        e.bubbles = true;
        e.cancelable = false;

        el.fireEvent('oninput', e);
    };

    var handleValueChanges = function() {
        // On the selectionchange event, e.target is just document which
        // isn't helpful for us so just check activeElement instead.
        //
        // 90% of the time, keydown and keyup aren't necessary. IE 8 fails
        // to fire propertychange on the first input event after setting
        // `value` from a script and fires only keydown, keypress, keyup.
        // Catching keyup usually gets it and catching keydown lets us fire
        // an event for the first keystroke if user does a key repeat
        // (it'll be a little delayed: right before the second keystroke).
        // Other input methods (e.g., paste) seem to fire selectionchange
        // normally.
        if (activeElement && activeElement.value !== activeElementValue) {
            activeElementValue = activeElement.value;
            // triggerInputEvent(activeElement);
            activeElement.dispatchEvent(new Event('input', {
                bubbles: true,
                cancelable: false
            }));
        }
    };

    document.attachEvent("onfocusin", function(e) {
        // In IE 8, we can capture almost all .value changes by adding a
        // propertychange handler and looking for events with propertyName
        // equal to 'value'.
        // In IE 9, propertychange fires for most input events but is buggy
        // and doesn't fire when text is deleted, but conveniently,
        // selectionchange appears to fire in all of the remaining cases so
        // we catch those and forward the event if the value has changed.
        // In either case, we don't want to call the event handler if the
        // value is changed from JS so we redefine a setter for `.value`
        // that updates our activeElementValue variable, allowing us to
        // ignore those changes.
        if (hasInputCapabilities(e.srcElement)) {
            // stopWatching() should be a noop here but we call it just in
            // case we missed a blur event somehow.
            stopWatching();
            startWatching(e.srcElement);
        }
    });

    document.attachEvent("onfocusout", function() {
        stopWatching();
    });

    document.attachEvent("onselectionchange", handleValueChanges);
    document.attachEvent("onkeyup", handleValueChanges);
    document.attachEvent("onkeydown", handleValueChanges);
})();
