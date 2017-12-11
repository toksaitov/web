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

function nearlyEquals(a, b) {
    return Math.abs(a - b) < 1e-6;
}

function findQuadrant() {
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

    let answer;
    if (nearlyEquals(x, 0) && nearlyEquals(y, 0)) {
        answer = 'в центре координатной системы'
    } else if (nearlyEquals(x, 0)) {
        answer = 'на оси ординат'
    } else if (nearlyEquals(y, 0)) {
        answer = 'на оси абсцисс'
    } else {
        if (x > 0) {
            if (y > 0) {
                answer = 'в первой четверти'
            } else {
                answer = 'в четвертой четверти'
            }
        } else {
            if (y > 0) {
                answer = 'во второй четверти'
            } else {
                answer = 'в третьей четверти'
            }
        }
    }

    updatePlaceholder('answer-placeholder', answer);
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
    const eventHandler = buildEventHandler(findQuadrant);

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

