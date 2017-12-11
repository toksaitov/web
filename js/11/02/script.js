function getForm() {
    return document.forms[0];
}

function getNumericField(field) {
    const value = getForm()[field].value;
    const number = parseFloat(value);
    return isNaN(number) || !isFinite(value) ? NaN : number;
}

function getTextField(field) {
    return getForm()[field].value;
}

function isFieldEmpty(field) {
    return getForm()[field].value.toString().trim().length === 0;
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

function replaceText() {
    if (isFieldEmpty('words') || isFieldEmpty('search-phrase')) {
        hideEverything();
        return;
    }

    const text = getTextField('words');
    const searchPhrase = getTextField('search-phrase');
    const replacement = getTextField('replacement') || '';

    const escapeRegularExpression = str => {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    };
    const result = text.replace(new RegExp(escapeRegularExpression(searchPhrase), 'g'), replacement);
    console.log(text);
    console.log(searchPhrase);
    console.log(replacement);
    console.log(result);
    console.log("---");

    updatePlaceholder('words-placeholder', `'${text}'`);
    updatePlaceholder('search-phrase-placeholder', `'${searchPhrase}'`);
    updatePlaceholder('replacement-placeholder', `'${replacement}'`);
    updatePlaceholder('output-placeholder', `'${result}'`);
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
    const eventHandler = buildEventHandler(replaceText);

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

