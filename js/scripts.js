// Dados de IMC
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção dos elementos
const imcTable = document.querySelector("#imc-table"); // Tabela

const heightInput = document.querySelector("#height"); // Altura
const weightInput = document.querySelector("#weight"); // Peso
const calcBtn = document.querySelector("#calc-btn"); // Botão de calcular
const clearBtn = document.querySelector("#clear-btn"); // Botão de limpar

const calcContainer = document.querySelector("#calc-container"); // Contêiner da calculadora
const resultContainer = document.querySelector("#result-container"); // Contêiner dos resultados

const imcNumber = document.querySelector("#imc-number span"); // Número de IMC
const imcInfo = document.querySelector("#imc-info span"); // Informação do IMC

const backBtn = document.querySelector("#back-btn"); // Botão de voltar

// Funções
function createTable(data) {
  // Cria a tabela
  data.forEach((item) => {
    // percorre os itens dos dados de IMC
    const div = document.createElement("div"); // cria uma div
    div.classList.add("table-data"); // adiciona uma classe à div

    const classification = document.createElement("p"); // cria um paragrafo para classificação
    classification.innerText = item.classification; // coloca como texto do paragrafo o texto de classification do item atual

    const info = document.createElement("p"); // cria um paragrafo para informação
    info.innerText = item.info; // coloca como texto do paragrafo o texto de info do item atual

    const obesity = document.createElement("p"); // cria um paragrafo para grau de obesidade
    obesity.innerText = item.obesity; // coloca como texto do paragrafo o texto de obesity do item atual

    // inclui os parágrafos na div criada
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    // inclui a div criada na tabela
    imcTable.appendChild(div);
  });
}

function cleanInputs() {
  // Limpa os inputs e as classes
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.classList = "";
  imcInfo.classList = "";
}

function validDigits(text) {
  // Dígitos válidos
  return text.replace(/[^0-9,]/g, ""); // permite apenas os dígitos de 0 a 9 e vírgulas
}

function calcImc(height, weight) {
  // Calcula o IMC
  const imc = (weight / (height * height)).toFixed(1); // faz o cálculo do IMC e limita o número de casas decimais para 1

  return imc;
}

function showOrHideResults() {
  // Esconde ou mostra as telas criadas
  // ativando ou desativando a classe hide
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// Inicialização
createTable(data);

// Eventos
[heightInput, weightInput].forEach((elemento) => {
  // Valida cada valor digitado pelo usuário
  elemento.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value); // valor atualizado pela função validDigits
    e.target.value = updatedValue; // substitui o valor digitado pelo valor atualizado
  });
});

calcBtn.addEventListener("click", (e) => {
  // Adiciona um evento ao botão de calcular
  e.preventDefault(); // impede o envio do formulário e o recarregamento da página

  // substitui as vírgulas por pontos
  const height = +heightInput.value.replace(",", ".");
  const weight = +weightInput.value.replace(",", ".");

  if (!height || !weight) return; // impede a passagem para a próxima tela caso os valores estejam vazios

  const imc = calcImc(height, weight); // chama a função para calcular o IMC

  let info;
  data.forEach((item) => {
    // percorre os itens dos dados de IMC
    if (imc >= item.min && imc <= item.max) {
      // encontra a classificação do IMC na tabela
      info = item.info; // adiciona os dados do IMC à variável info criada
    }
  });
  if (!info) return; // impede a passagem para a próxima tela caso não encontre a classificação nos dados de IMC

  // atribui os valores encontrados
  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (
    info // adiciona a classe de acordo com o imc encontrado
  ) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;

    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;

    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;

    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;

    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults(); // vai para a próxima tela
});

clearBtn.addEventListener("click", (e) => {
  // Adiciona um evento ao botão de limpar
  e.preventDefault(); // impede o envio do formulário e o recarregamento da página

  cleanInputs(); // chama a função para limpar os inputs
});

backBtn.addEventListener("click", () => {
  // Adiciona um evento ao botão de voltar
  cleanInputs(); // Limpa os inputs
  showOrHideResults(); // Retorna à tela inicial
});
