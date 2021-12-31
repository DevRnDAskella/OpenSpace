const _PASSWORD = 'TrustNo1';
const rocketImage = document.querySelector('.rocket');
const passwordField = document.querySelector('input[type=password]');
const btnOk = document.querySelector('input[value=Ok]');
const btnLaunch = document.querySelector('input[value=Launch]');
const allInputTags = document.querySelectorAll('input');
const allInputTypeCheckboxes = document.querySelectorAll('input[type=checkbox]');
const allInputTypeRanges = document.querySelectorAll('input[type=range]');
const allCheckInputs = [...allInputTypeCheckboxes, ...allInputTypeRanges];

window.addEventListener('load', () => {
    disablePanel(allInputTags);
})

btnOk.addEventListener('click', () => {
    if (validatePassword(passwordField.value, _PASSWORD)) {
        activatePanel(allInputTags);
    }
});

btnLaunch.addEventListener('click', () => {
    startRocket(rocketImage);
});

for (let input of allCheckInputs) {
    input.onchange = function () {
        if (input.checked || +input.value === 100) {
            const numberOfElements = allCheckInputs.length;
            const newArr = allCheckInputs.filter(el => {
                if (el.checked || +el.value === 100) {
                    return el;
                }
            })
            if (numberOfElements === newArr.length) {
                activateElement(btnLaunch);
            }
        }
    };
}

function disablePanel(fields) {
    for (let field of fields) {
        if (field !== passwordField
            && field !== btnOk) {
            field.disabled = true;
        }
    }
}

function activatePanel(fields) {
    for (let field of fields) {
        if (field !== btnLaunch) {
            field.disabled = !field.disabled;
        }
    }
}

function activateElement(element) {
    element.disabled = false;
}

function checkAllInputs(elements) {
    const numberOfElements = elements.length;
    const tempArr = [];
    for (let element of elements) {
        if (Number(element.value) === 100 || element.checked) {
            tempArr.push(element);
        }
    }
    return tempArr.length === numberOfElements;
}

function validatePassword(value, password) {
    const regexp = new RegExp(password);
    return regexp.test(value);
}

function startRocket(element) {
    let prop = window.getComputedStyle(element);
    let increment = 10;
    let timeCount = 0;
    const timerId = setInterval(() => {
        element.style.top = +prop.top.slice(0, -2) - increment + 'px';
        element.style.left = +prop.left.slice(0, -2) + increment + 'px';
        timeCount += 1;
        if (timeCount > 150) {
            clearInterval(timerId);
        }
    }, 30);
}
