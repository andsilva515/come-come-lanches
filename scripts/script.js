const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
})

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// Fechar o modal pelo botão fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

// Botão adicionar pedido no carrinho
menu.addEventListener("click", function(){
    
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addtoCart(name, price)
    }
})

// Função para adicionar no carrinho
function addtoCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //Se o item já existe, aumenta apenas a quantidade + 1
        existingItem.quantity += 1;
    }else{
       cart.push({
         name,
         price,
         quantity: 1,
    })      

    }

    updateCartModal()
}

// Atualiza o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";

    let total = 0;
    const deliveryFee = 5.00; // Taxa de entrega fixa

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            
            <button class="remove-from-cart-btn" data-name="${item.name}">
                Remover
            </button>
        </div>        
       `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Calcula o total final somando a taxa de entrega
    const finalTotal = total + deliveryFee;

    // Atualiza os valores no HTML
    document.getElementById("cart-subtotal").textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    document.getElementById("cart-delivery").textContent = deliveryFee.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    document.getElementById("cart-total").textContent = finalTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    // Atualiza o contador de itens no carrinho
    cartCounter.innerHTML = cart.length;
}


// Função para remover o item do carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

// Valida campo telefone
// function validatePhoneNumber(phone) {
//     const phonePattern = /^(\(\d{2}\)\s?|\d{2}\s?)\d{4,5}-\d{4}$/; // Expressão regular para validar o formato de telefone (ex: (xx) xxxx-xxxx ou xx xxxxx-xxxx
//     return phonePattern.test(phone);
// }

// Valida campo endereço
function validateAddressFields() {
    const fields = ["name", "street", "number", "neighborhood", "city", "reference"];
    let isValid = true;

    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input.value.trim() === "") {
            input.classList.add("border-red-500");
            isValid = false;
        } else {
            input.classList.remove("border-red-500");
        }
    });

    return isValid;
}

// Finaliza pedido
checkoutBtn.addEventListener("click", function() {  
    
    // verifica se a lanchonete está aberta
    const isOpen = checkRestaurantOpen();
    if (!isOpen) {
        Toastify({
            text: "Ops, a lanchonete está fechada!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },            
        }).showToast();
        return; // Se está fechado, para tudo aqui!
    }

    if (cart.length === 0) return; 

    // Primeiro valida o endereço
    const isAddressValid = validateAddressFields();
    if (!isAddressValid) {
        addressWarn.classList.remove("hidden");
        return; // Se endereço inválido, para aqui!
    } else {
        addressWarn.classList.add("hidden");
    }

    // Valida o telefone
    // const phone = document.getElementById("phone").value.trim();
    // if (!validatePhoneNumber(phone)) {
    //     document.getElementById("phone").classList.add("border-red-500");
    //     return; // Se o telefone for inválido, para aqui!
    // } else {
    //     document.getElementById("phone").classList.remove("border-red-500")
    // }

    // Monta a mensagem do carrinho
    const cartItems = cart.map((item) => {
        return `🍔 ${item.name} - 🔢 ${item.quantity}x - 💰 R$${item.price.toFixed(2)}`;
    }).join("\n");

    // Captura os valores dos campos de endereço
    const name = document.getElementById("name").value.trim();
    const street = document.getElementById("street").value.trim();
    const number = document.getElementById("number").value.trim();
    const neighborhood = document.getElementById("neighborhood").value.trim();
    const city = document.getElementById("city").value.trim();
    const reference = document.getElementById("reference").value.trim();

    // Monta o texto do endereço formatado
    const addressText = `\n\n *Endereço para entrega:*\n👤 Nome: ${name}\n🏠 Rua: ${street}, Nº ${number}\n📌 Bairro: ${neighborhood}\n🌆 Cidade: ${city}\n📍 Referência: ${reference}`;

     // Inclui o telefone na mensagem
    //  const phoneText = `📞 Telefone: ${phone}`;

    // Mensagem final para WhatsApp
    // const message = encodeURIComponent(cartItems + addressText + "\n" +phoneText);
    const whatsappPhone = "35998471037"; // Número de telefone da lanchonete
    window.open(`https://wa.me/${whatsappPhone}?text=${message}`, "_blank");

    // Limpa o carrinho e atualiza modal
    cart = [];
    updateCartModal();
});

// Verificar a hora e manipular o card do horário
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 12 && hora < 15;
    // true = restaurante está aberto
}

 // Selecionar a forma de pagamento
 const botoesPagamento = document.querySelectorAll(".forma-pagamento-btn");
 const inputFormaPagamento = document.getElementById("formaPagamento");

 botoesPagamento.forEach(botao => {
   botao.addEventListener("click", () => {
     // Remove destaque de todos
     botoesPagamento.forEach(b => b.classList.remove("bg-blue-500", "text-white"));
     botoesPagamento.forEach(b => b.classList.add("bg-gray-200", "text-gray-800"));
     
     // Destaca o selecionado
     botao.classList.remove("bg-gray-200", "text-gray-800");
     botao.classList.add("bg-blue-500", "text-white");

     // Atualiza o input escondido
     inputFormaPagamento.value = botao.getAttribute("data-forma");
   });
 });


const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}
