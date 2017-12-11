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

function checkTriangle() {
    if (isFieldEmpty('a')) {
        hideEverything();
        return;
    }
    if (isFieldEmpty('b')) {
        hideEverything();
        return;
    }
    if (isFieldEmpty('c')) {
        hideEverything();
        return;
    }

    const a = getNumericField('a');
    if (isNaN(a)) {
        displayError();
        return;
    }
    const b = getNumericField('b');
    if (isNaN(b)) {
        displayError();
        return;
    }
    const c = getNumericField('c');
    if (isNaN(c)) {
        displayError();
        return;
    }

    const possible = a <= c + b && b <= a + c && c <= a + b;
    updatePlaceholder('answer-placeholder', possible ? "возможен" : "невозможен");
    updatePlaceholder('a-placeholder', a.toFixed(2));
    updatePlaceholder('b-placeholder', b.toFixed(2));
    updatePlaceholder('c-placeholder', c.toFixed(2));
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
    const eventHandler = buildEventHandler(checkTriangle);

    form.addEventListener('submit', eventHandler);
    form.addEventListener('input',  eventHandler);
}

(function ready(onReadyCallback) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        onReadyCallback();
    } else {
        document.addEventListener('DOMContentLoaded', onReadyCallback);
    }
})(setupEventHandlers);

