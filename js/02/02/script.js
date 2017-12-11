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

function calculateDistance() {
    if (isFieldEmpty('x')) {
        hideEverything();
        return;
    }
    if (isFieldEmpty('y')) {
        hideEverything();
        return;
    }

    const x = getNumericField('x');
    if (isNaN(x)) {
        displayError();
        return;
    }
    const y = getNumericField('y');
    if (isNaN(y)) {
        displayError();
        return;
    }

    const distance = Math.sqrt(x * x + y * y);
    updatePlaceholder('distance-placeholder', distance.toFixed(2));
    updatePlaceholder('x-placeholder', x.toFixed(2));
    updatePlaceholder('y-placeholder', y.toFixed(2));
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
    const eventHandler = buildEventHandler(calculateDistance);

    form.addEventListener('submit', eventHandler);
    form.addEventListener('input',  eventHandler);
    form.addEventListener('select',  eventHandler);
}

(function ready(onReadyCallback) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        onReadyCallback();
    } else {
        document.addEventListener('DOMContentLoaded', onReadyCallback);
    }
})(setupEventHandlers);

