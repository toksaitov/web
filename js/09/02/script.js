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

function calculateLuckyNumbers() {
    if (isFieldEmpty('number')) {
        hideEverything();
        return;
    }

    let number = getNumericField('number');
    if (isNaN(number) || number < 2 || number % 2 !== 0 || number > 9) {
        displayError();
        return;
    }
    updatePlaceholder('number-placeholder', Math.floor(number));

    let min = 1;
    for (let i = 1; i < number; ++i) {
        min *= 10;
    }
    let max = min * 10;

    let totals = 0;
    for (let i = min; i < max; ++i) {
        let j = 0;
        let temp = i;
        let firstPart = 0;
        while (j++ !== number / 2) {
            firstPart = firstPart * 10 + temp % 10;
            temp = Math.floor(temp / 10);
        }
        let secondPart = 0;
        while (j++ !== number) {
            secondPart = secondPart * 10 + temp % 10;
            temp = Math.floor(temp / 10);
        }

        if (firstPart === secondPart) {
            ++totals;
        }
    }

    updatePlaceholder('count-placeholder', Math.floor(totals));
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
    const eventHandler = buildEventHandler(calculateLuckyNumbers);

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
