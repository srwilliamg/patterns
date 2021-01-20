const add=(x, y)=> { return x + y; }
const sub=(x, y)=> { return x - y; }
const mul=(x, y)=> { return x * y; }
const div=(x, y)=> { return x / y; }
 
const Command = (execute, undo, value) => ({execute,undo,value})
 
const AddCommand = (value) => Command(add, sub, value);
 
const SubCommand = (value) => Command(sub, add, value);
 
const MulCommand =  (value) => Command(mul, div, value);
 
const DivCommand =  (value) => Command(div, mul, value);
 
const Calculator = function () {
    let current = 0;
    let commands = [];
 
    const action=(command)=> {
        var name = command.execute.name;
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
 
    return {
        execute: function (command) {
            current = command.execute(current, command.value);
            commands.push(command);
            console.log(action(command) + ": " + command.value);
        },
 
        undo: function () {
            var command = commands.pop();
            current = command.undo(current, command.value);
            console.log("Undo " + action(command) + ": " + command.value);
        },
 
        getCurrentValue: function () {
            return current;
        }
    }
}
 

 
function run() {

    var calculator = new Calculator();
 
    calculator.execute(AddCommand(100));
    console.log(calculator.getCurrentValue());
    calculator.execute(SubCommand(24));
    console.log(calculator.getCurrentValue());
    calculator.execute(MulCommand(6));
    console.log(calculator.getCurrentValue());
    calculator.execute(DivCommand(2));
    console.log(calculator.getCurrentValue());
  
    calculator.undo();
    console.log(calculator.getCurrentValue());
    calculator.undo();
    console.log(calculator.getCurrentValue());

}

run();