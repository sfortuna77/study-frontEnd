function calculateIMC() {
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        updateResultContainer("Por favor, insira valores válidos!")
        return;
    }
    
    if (height > 3) {
        updateResultContainer("Altura deve estar em metros (ex: 1.75)")
        return;
    }
    
    // Cálculo do IMC
    const imc = weight / (height * height);
    let classification;
    let classCSS;
    
    // Classificação do IMC com classes CSS correspondentes
    if (imc < 18.5) {
        classification = "Abaixo do peso";
        classCSS = "baixo-peso";
    } else if (imc >= 18.5 && imc < 25) {
        classification = "Peso normal";
        classCSS = "normal";
    } else if (imc >= 25 && imc < 30) {
        classification = "Sobrepeso";
        classCSS = "sobrepeso";
    } else if (imc >= 30 && imc < 35) {
        classification = "Obesidade Grau I";
        classCSS = "obesidade";
    } else if (imc >= 35 && imc < 40) {
        classification = "Obesidade Grau II";
        classCSS = "obesidade";
    } else {
        classification = "Obesidade Grau III (ou Grave)";
        classCSS = "obesidade";
    }
    
    // Aplica classe CSS no Resultado
    updateResultContainer(
        `Seu IMC é: <strong>${imc.toFixed(2)}</strong>`,
        classCSS,
        `Classificação: <strong>${classification}</strong>`
    )
}

// Função para limpar resultados
function clearResult() {
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    updateResultContainer();
}

// Função para definir a classe e os textos do container de resultado
function updateResultContainer(
    resultText = "Seu resultado do IMC aparecerá aqui.",
    classCSS = "",
    classificationText = ""
) {
    let containerResult = document.getElementById("containerResult");
    let resultElement = document.getElementById("result");
    let classificationElement = document.getElementById("classification");
    
    containerResult.className = classCSS ? `result ${classCSS}` : "result";
    resultElement.innerHTML = resultText;
    classificationElement.innerHTML = classificationText;
}
