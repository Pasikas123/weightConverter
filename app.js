// Funkcija, leidžianti įvesti tik skaitmenis
function allowOnlyNumbers(input) {
    input.value = input.value.replace(/[^0-9.]/g, ''); // pašalina ne skaitmenis ir taškus
    input.value = input.value.replace(/(\..*)\./g, '$1'); // užkerta kelią daugiau nei vienam taškui
}

// Elementų atrinkimas
const inputFrom = document.querySelector('.input-from');
const inputTo = document.querySelector('.input-to');
const resultMsg = document.getElementById('resultMsg');
const selectFrom = document.querySelector('.select-from');
const selectTo = document.querySelector('.select-to');
const convertButton = document.getElementById('convert');
const clearButton = document.getElementById('clear');

// Konversijos koeficientai (objektas su visais galimais konversijos keliais)
const conversionRates = {
    kilograms: {
        grams: 1000,
        tons: 0.001,
        pounds: 2.20462,
        ounces: 35.2739619
    },
    grams: {
        kilograms: 0.001,
        tons: 1e-6,
        pounds: 0.00220462,
        ounces: 0.035274
    },
    tons: {
        kilograms: 1000,
        grams: 1e6,
        pounds: 2000,
        ounces: 32000
    },
    pounds: {
        kilograms: 0.453592,
        grams: 453.592,
        tons: 0.0005,
        ounces: 16
    },
    ounces: {
        kilograms: 0.0283495231,
        grams: 28.3495231,
        tons: 0.00003125,
        pounds: 0.0625
    }
};

const changeFunction = () => {
    resultMsg.innerText = `Converting from: ${selectFrom.value} to ${selectTo.value}`;
};

const convertFunction = () => {
    let fromUnit = selectFrom.value;
    let toUnit = selectTo.value;
    let value = parseFloat(inputFrom.value);

    if (inputFrom.value.trim() === '' || isNaN(value)) {
        resultMsg.innerText = 'Put a valid number in "From" field!';
        return;
    }

    if (fromUnit === toUnit) {
        inputTo.value = inputFrom.value;
    } else {
        const conversionRate = conversionRates[fromUnit]?.[toUnit];
        if (conversionRate !== undefined) {
            inputTo.value = (value * conversionRate).toFixed(2);
            resultMsg.innerText = `Result: ${inputTo.value} ${toUnit}`;
        } else {
            resultMsg.innerText = `Conversion from ${fromUnit} to ${toUnit} is not supported!`;
        }
    }
};

const clearFunction = () => {
    inputTo.value = '';
    inputFrom.value = '';
    resultMsg.innerText = '';
};


convertButton.addEventListener('click', convertFunction);
clearButton.addEventListener('click', clearFunction);

selectFrom.addEventListener('change', changeFunction);
selectTo.addEventListener('change', changeFunction);
inputFrom.addEventListener('input', () => allowOnlyNumbers(inputFrom));
inputTo.addEventListener('keypress', (event) => event.preventDefault());
