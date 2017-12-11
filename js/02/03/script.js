function getForm() {
    return document.forms[0];
}

function getNumericField(field) {
    const value = getForm()[field].value;
    const number = parseFloat(value);
    return isNaN(number) || !isFinite(value) ? NaN : number;
}

function isFieldEmpty(field) {
    return getForm()[field].value.toString().length === 0;
}

function hidePlaceholder(placeholder) {
    document.getElementById(placeholder).style.display = 'none';
}

function showPlaceholder(placeholder) {
    document.getElementById(placeholder).style.display = 'block';
}

function updatePlaceholder(placeholder, value) {
    document.getElementById(placeholder).textContent = value.toString();
}

function displayResult() {
    hidePlaceholder('error-placeholder');
    showPlaceholder('result-placeholder');
}

function displayError() {
    hidePlaceholder('result-placeholder');
    showPlaceholder('error-placeholder');
}

function hideEverything() {
    hidePlaceholder('result-placeholder');
    hidePlaceholder('error-placeholder');
}

function swap() {
    if (isFieldEmpty('a')) {
        hideEverything();
        return;
    }
    if (isFieldEmpty('b')) {
        hideEverything();
        return;
    }

    let a = getNumericField('a');
    if (isNaN(a)) {
        displayError();
        return;
    }
    let b = getNumericField('b');
    if (isNaN(b)) {
        displayError();
        return;
    }

    updatePlaceholder('a-placeholder', a.toFixed(2));
    updatePlaceholder('b-placeholder', b.toFixed(2));

    const temp = a;
    a = b;
    b = temp;

    updatePlaceholder('a-result-placeholder', a.toFixed(2));
    updatePlaceholder('b-result-placeholder', b.toFixed(2));

    displayResult();

    return;
}

function buildEventHandler(eventCallback) {
    return function eventHandler(event) {
        event.preventDefault();
        return eventCallback();
    }
}

function setupEventHandlers() {
    const form = getForm();
    const eventHandler = buildEventHandler(swap);

    form.addEventListener('submit', eventHandler);
    form.addEventListener('input',  eventHandler);
    form.addEventListener('blur',  eventHandler);
}

(function ready(onReadyCallback) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        onReadyCallback();
    } else {
        document.addEventListener('DOMContentLoaded', onReadyCallback);
    }
})(setupEventHandlers);

