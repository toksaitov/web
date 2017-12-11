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

function calculateReverse() {
    if (isFieldEmpty('number')) {
        hideEverything();
        return;
    }

    let number = getNumericField('number');
    if (isNaN(number)) {
        displayError();
        return;
    }
    number = Math.floor(number);
    updatePlaceholder('number-placeholder', Math.floor(number));

    let sign = 1;
    if (number < 0) {
        sign = -1;
        number *= sign;
    }

    let reversedNumber = 0;
    while (number !== 0) {
        reversedNumber = reversedNumber * 10 + number % 10;
        number = Math.floor(number / 10);
    }

    if (sign < 0) {
        reversedNumber *= sign;
    }

    updatePlaceholder('reversed-number-placeholder', Math.floor(reversedNumber));
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
    const eventHandler = buildEventHandler(calculateReverse);

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

