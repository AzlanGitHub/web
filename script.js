function clearDisplay() {
    document.getElementById("display").value = "";
}

function appendToDisplay(value) {
    const display = document.getElementById("display");
    const currentValue = display.value;
    const lastChar = currentValue.slice(-1);
    const lastOperatorIndex = Math.max(
        currentValue.lastIndexOf('+'),
        currentValue.lastIndexOf('-'),
        currentValue.lastIndexOf('*'),
        currentValue.lastIndexOf('/')
    );

    // Überprüfen, ob der Benutzer einen Operator hinzufügt
    if (['+', '-', '*', '/'].includes(value)) {
        // Verhindern, dass auf einen Operator direkt ein weiterer folgt
        if (['+', '-', '*', '/'].includes(lastChar)) {
            return; // Abbrechen, wenn bereits ein Operator zuletzt eingegeben wurde
        }

        // Verhindern, dass der erste Eingabewert ein Operator ist
        if (currentValue === "") {
            return;
        }
    }

    // Überprüfen, ob der Benutzer ein Dezimalzeichen hinzufügt
    if (value === '.') {
        // Teil des Display-Inhalts nach dem letzten Operator
        const lastNumber = currentValue.slice(lastOperatorIndex + 1);

        // Prüfen, ob bereits eine Zahl vor dem Dezimalpunkt eingegeben wurde
        if (lastNumber === '' || lastNumber.includes('.')) {
            return; // Abbrechen, wenn kein Wert eingegeben wurde oder bereits ein Punkt vorhanden ist
        }
    }

    // Überprüfen auf führende Nullen
    if (value === '0') {
        if (currentValue === '') {
            // Wenn das Display leer ist, füge 0 hinzu
            display.value += value;
            return;
        } else {
            // Verhindern, dass mehr als eine führende Null vor dem Komma eingegeben wird
            const lastNumber = currentValue.slice(lastOperatorIndex + 1);
            if (lastNumber.startsWith('0') && lastNumber.length > 1 && lastNumber[1] !== '.') {
                return; // Abbrechen, wenn bereits eine führende Null vor einer Zahl steht
            }
        }
    } else {
        // Wenn eine Zahl >= 1 eingegeben wird, entferne die führende Null
        if (currentValue === '0' && value >= '1') {
            display.value = value; // Setze nur die neue Zahl
            return;
        }
    }

    // Wert zum Display hinzufügen
    display.value += value;
}

function deleteLastCharacter() {
    const display = document.getElementById("display");
    const currentValue = display.value;

    if (currentValue.length > 0) {
        // Letzten Charakter entfernen
        display.value = currentValue.slice(0, -1);
    }
}

function calculateResult() {
    const display = document.getElementById("display");

    try {
        // Berechnung des Ergebnisses
        const result = eval(display.value);
        display.value = parseFloat(result).toString(); // Konvertiere zurück in eine Zahl
    } catch (error) {
        display.value = "Error";
    }
}
