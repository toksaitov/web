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

function countMax() {
    const fields = ['x1', 'x2', 'x3', 'x4', 'x5'];
    for (const field of fields) {
        if (isFieldEmpty(field)) { hideEverything(); return; }
    }

    const values = [];
    for (const field of fields) {
        const value = getNumericField(field);
        if (isNaN(value)) {
            displayError();
            return;
        }
        values.push(value);
    }

    let max = values[0];
    let maxCount = 1;
    for (let i = 1; i < values.length; ++i) {
        if (Math.abs(values[i] - max) < 1e-6) {
            ++maxCount;
        } else if (values[i] > max) {
            max = values[i];
            maxCount = 1;
        }
    }

    updatePlaceholder('max-placeholder', max);
    updatePlaceholder('max-count-placeholder', maxCount);

    let i = 0;
    for (const field of fields) {
        updatePlaceholder(`${field}-placeholder`, values[i++].toFixed(2));
    }
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
    const eventHandler = buildEventHandler(countMax);

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

