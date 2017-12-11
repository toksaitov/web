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

function calculateHypotenuse() {
    if (isFieldEmpty('opposite')) {
        hideEverything();
        return;
    }
    if (isFieldEmpty('adjacent')) {
        hideEverything();
        return;
    }

    const opposite = getNumericField('opposite');
    if (isNaN(opposite)) {
        displayError();
        return;
    }

    const adjacent = getNumericField('adjacent');
    if (isNaN(adjacent)) {
        displayError();
        return;
    }

    const hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);
    updatePlaceholder('hypotenuse-placeholder', hypotenuse.toFixed(2));
    updatePlaceholder('opposite-placeholder', opposite.toFixed(2));
    updatePlaceholder('adjacent-placeholder', adjacent.toFixed(2));
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
    const eventHandler = buildEventHandler(calculateHypotenuse);

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

