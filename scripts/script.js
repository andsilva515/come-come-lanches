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

// Valida campo endereço
document.addEventListener("DOMContentLoaded", function () {
    const fields = ["name", "street", "number", "neighborhood", "city", "reference"];
    const addressWarn = document.getElementById("address-warn");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Adiciona evento de input para remover erro ao digitar
    fields.forEach(field => {
        document.getElementById(field).addEventListener("input", function () {
            this.classList.remove("border-red-500");
            addressWarn.classList.add("hidden");
        });
    });

    // Evento de clique no botão de finalização
    checkoutBtn.addEventListener("click", function () {
        let isValid = true;

        // Verifica se todos os campos foram preenchidos
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input.value.trim() === "") {
                input.classList.add("border-red-500");
                isValid = false;
            }
        });

        if (!isValid) {
            addressWarn.classList.remove("hidden");
            return; // Sai da função se houver campos
        } 
    });
});


// Finaliza pedido
checkoutBtn.addEventListener("click", function(){  
    
    // verifica lanchonete fechada
    const isOpen = checkRestaurantOpen();
        if(!isOpen){
        Toastify({
            text: "Ops, a lanchonete está fechada!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast en hover
            style: {
                background: "#ef4444",
            },            
        }).showToast();
        return;
     }

    if(cart.length === 0) return; 

    const fields = ["name", "street", "number", "neighborhood", "city", "reference"];
    let isValid = true;

    fields.forEach(field => {
        const input = document.getElementById(field);
        if (input.value.trim() === "") {
            input.classList.add("border-red-500");
            isValid = false;
        }
    });

    if (!isValid) {
        addressWarn.classList.remove("hidden");
        return;
    }

    // Monta a mensagem do carrinho
    const cartItems = cart.map((item) => {
        return (
            `🍔 ${item.name} - 🔢 ${item.quantity}x - 💰 R$${item.price.toFixed(2)}`
        );
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

    // Mensagem final para WhatsApp
    const message = encodeURIComponent(cartItems + addressText);
    const phone = "35998471037";
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    // Limpa o carrinho e atualiza modal
    cart = [];
    updateCartModal();
});

// Verificar a hora e manipular o card do horário
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 13 && hora < 15;
    // true = restaurante está aberto
}


const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}
