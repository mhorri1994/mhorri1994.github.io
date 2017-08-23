function checkKey(event) {
    if (event.key === 'Enter') {
        let textField = document.getElementById('command');
        runCommand(textField.value);
        textField.value = '';
    }
}

function runCommand(command) {
    command = command.split(' ');
    switch (command[0]) {
        case 'create':
            if (command[1] === 'car') {
                let make = command[2];
                let reg = command[3];
                let value = command[4];
                let faults = command[5];
                addVehicleToStore(reg, make, faults, value);
                outputToConsole("Created car");
            }
            break;
        case 'output':
            if (command[1] === 'garage') {
                outputGarage('console');
            }
            break;
        case 'check':
            break;
    }
}

function outputToConsole(toOutput) {
    let consoleOutput = document.getElementById('console')
    //consoleOutput.value = toOutput + "\n" + consoleOutput.value;
    consoleOutput.value += toOutput + "\n";
    consoleOutput.scrollTop = consoleOutput.scrollHeight
}