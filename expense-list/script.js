// Lista de variáveis globais
let expenses = []; // Array para armazenar os gastos
const items = ["Alimentação", "Transporte", "Lazer", "Saúde"]; // Itens pré-definidos

// ========== FUNÇÕES AUXILIARES ==========

// Seleção de elementos
const getElement = (id) => document.getElementById(id);

// Formatação de valores
const formatCurrency = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

// Conversão de string para número
const parseValue = (valueString) => {
    const cleanValue = valueString.replace(",", ".");
    return parseFloat(cleanValue);
};

// Validação de campos
const validateInputs = (valueInput, itemInput) => {
    if (!valueInput.value.trim() || !itemInput.value) {
        alert("Por favor, preencha todos os campos!");
        return false;
    }

    const value = parseValue(valueInput.value);
    if (isNaN(value) || value <= 0) {
        alert("Por favor, digite um valor válido!");
        return false;
    }

    return true;
};

// Limpeza de campos
const clearInputs = (valueInput, itemInput) => {
    valueInput.value = "";
    itemInput.selectedIndex = 0;
};

// Criação de elemento de gasto
const createExpenseElement = (expense, index) => {
    const expenseItem = document.createElement("p");
    expenseItem.innerHTML = `
        <span class="item">${expense.category}
            <button type="button" onclick="removeExpense(${index})">Excluir</button>
        </span>
        <span class="value">${formatCurrency(expense.value)}</span>
    `;
    return expenseItem;
};

// Criação de option para select
const createOptionElement = (item) => {
    const listItem = document.createElement("option");
    listItem.textContent = item;
    listItem.value = item;
    return listItem;
};

// Remoção de itens existentes da lista
const clearExistingItems = (container) => {
    const existingItems = container.querySelectorAll("p:not(.separator):not(.total-row)");
    existingItems.forEach(item => item.remove());
};

// Cálculo do total
const calculateTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.value, 0);
};

// ========== FUNÇÕES PRINCIPAIS ==========

// Função para listar os itens no select
function listItems() {
    const listContainer = getElement("item-list");
    listContainer.innerHTML = "";

    items.forEach(item => {
        const optionElement = createOptionElement(item);
        listContainer.appendChild(optionElement);
    });
}

// Função para adicionar um gasto
function addExpense() {
    const valueInput = getElement("expense-value");
    const itemInput = getElement("item-list");
    
    if (!validateInputs(valueInput, itemInput)) {
        return;
    }

    const value = parseValue(valueInput.value);

    // Adicionar gasto ao array
    expenses.push({
        category: itemInput.value,
        value: value
    });

    updateExpenseList();
    clearInputs(valueInput, itemInput);
}

// Função para atualizar a lista de gastos exibida
function updateExpenseList() {
    const expenseList = getElement("expense-list");
    const separator = expenseList.querySelector(".separator");
    
    clearExistingItems(expenseList);
    
    expenses.forEach((expense, index) => {
        const expenseElement = createExpenseElement(expense, index);
        expenseList.insertBefore(expenseElement, separator);
    });
    
    updateTotal();
    toggleExpenseList();
}

function removeExpense(index) {
    expenses.splice(index, 1);
    updateExpenseList();
}

function updateTotal() {
    const total = calculateTotal();
    getElement("total").textContent = formatCurrency(total);
}

function toggleExpenseList() {
    const expenseList = getElement("expense-list");
    expenseList.style.display = expenses.length > 0 ? "block" : "none";
}

// Inicializar
document.addEventListener("DOMContentLoaded", function() {
    listItems();
    toggleExpenseList(); // Ocultar lista inicialmente
});