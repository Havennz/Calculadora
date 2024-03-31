let display = document.querySelector("input#display")
let equalButton = document.querySelector("button.equalButton")
let savedValue

equalButton.addEventListener("mouseover", precalculo)
equalButton.addEventListener("mouseout", retornarValorAntigo) 
equalButton.addEventListener("click", teste)

function inserirDisplay(arg){
    display.value += arg
}

function clearDisplay(){
    display.value = ""
}

function teste(){
    calculate("Clicked")
}

function deleteValue(){
    display.value = display.value.slice(0, -1);
}

function calculate(arg){
    try{
        let valueToDisplay = display.value ? display.value : "No numbers!";
        if (valueToDisplay != "No numbers!"){
            let calculedNumber = safeEval(valueToDisplay);
            if (arg == "Clicked"){
                savedValue = valueToDisplay
            }
            display.value = calculedNumber
        }
        else{
            display.value = valueToDisplay
        }
        
    }
    catch(error){
        if (arg == "Clicked"){
            display.value = "Syntax error"
            setTimeout(function() {
                clearDisplay()
            }, 1000)
        }
    }
}

function precalculo(){
    savedValue = display.value
    calculate()
}

function retornarValorAntigo(){
    display.value = savedValue
}

function safeEval(expression) {
    let sanitizedExpression = expression.replace(/[^\d\s\+\-\*\/\(\)]/g, '');
    try {
        let evalFunction = new Function('return ' + sanitizedExpression);
        return evalFunction();
    } catch (error) {
        throw new Error('Erro ao avaliar a expressão: ' + error.message);
    }
}