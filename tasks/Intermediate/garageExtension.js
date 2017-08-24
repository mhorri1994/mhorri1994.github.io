let inputHistory = [];
let position = 0;
function checkKey(event) {
    let textField = document.getElementById('command');
    if (event.key === 'Enter') {
        runCommand(textField.value);
        inputHistory.push(textField.value);
        textField.value = '';
        position = inputHistory.length;
    }
    if(event.key === 'ArrowUp'){
        textField.value = inputHistory[position];
        position -= 1;
        if(position === -1) {
            position = 0;
        }
    }
    if(event.key === 'ArrowDown'){
        textField.value = inputHistory[position];
        position += 1;
        if(position === inputHistory.length + 1) {
            position = inputHistory.length;
        }
    }
    console.log(event.key);
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
            if(command[1] === 'in'){
                checkIn(command[2], 'console');
            }
            if(command[1] === 'out'){
                checkOut(command[2], 'console');
            }
            break;
        case 'remove':
            removeVehicleByReg(command[1]);
            break;
    }
}

function outputToConsole(toOutput) {
    let consoleOutput = document.getElementById('console')
    //consoleOutput.value = toOutput + "\n" + consoleOutput.value;
    consoleOutput.value += toOutput + "\n";
    consoleOutput.scrollTop = consoleOutput.scrollHeight
}