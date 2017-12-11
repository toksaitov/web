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

function calculateFactors() {
    if (isFieldEmpty('number')) {
        hideEverything();
        return;
    }

    let number = getNumericField('number');
    if (isNaN(number) || number <= 0) {
        displayError();
        return;
    }

    let range = (start, count) => {
        return Array.apply(0, Array(count)).map((element, index) => {
            return index + start;
        });
    };
    let rRoot = Math.sqrt(number),
        intRoot = Math.floor(rRoot),
        isPerfectSquare = rRoot === intRoot,
        lows = range(1, intRoot).filter(x => (number % x) === 0);
    let factors =
        lows.concat(lows.map(x => number / x).reverse().slice(isPerfectSquare | 0)).join(', ');

    updatePlaceholder('number-placeholder', Math.floor(number));
    updatePlaceholder('factors-placeholder', factors);
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
    const eventHandler = buildEventHandler(calculateFactors);

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
