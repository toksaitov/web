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

function calculateArea() {
    const fields = ['x1', 'y1', 'x2', 'y2', 'x3', 'y3'];
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

    const x1 = values[0], y1 = values[1];
    const x2 = values[2], y2 = values[3];
    const x3 = values[4], y3 = values[5];
    const area = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
    updatePlaceholder('area-placeholder', area.toFixed(2));

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
    const eventHandler = buildEventHandler(calculateArea);

    form.addEventListener('submit', eventHandler);
    form.addEventListener('input',  eventHandler);
    form.addEventListener('focus',  eventHandler);
}

(function ready(onReadyCallback) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        onReadyCallback();
    } else {
        document.addEventListener('DOMContentLoaded', onReadyCallback);
    }
})(setupEventHandlers);

