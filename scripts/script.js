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
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex"
})

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

// Fechar o modal pelo botão sair
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})

// Botão adicionar pedido no carrinho
menu.addEventListener("click", function (event) {

    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addtoCart(name, price)
    }
})

// Função para adicionar no carrinho
function addtoCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        //Se o item já existe, aumenta apenas a quantidade + 1
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })

    }

    updateCartModal()
}


//Atualiza o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

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


    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;

}

// Função para remover o item do carrinho
cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

//Finalizar pedido
checkoutBtn.addEventListener("click", function () {

    // verifica lanchonete fechada
    const isOpen = checkRestaurantOpen();
    if (!isOpen) {
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

    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }


    // Monta os itens do pedido
    const cartItems = cart.map((item) => {
        return (
            `🍔 ${item.name} - 🔢 ${item.quantity}x - 💰 R$${item.price.toFixed(2)}`
        )
    }).join("\n")

    // Formato mensagem WhatsApp
    // const message = encodeURIComponent(cartItems + `\n📍 Endereço: ${addressInput.value}`);
    // const phone = "35998832330"; // Número real do WhatsApp
    // window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

    // Enviar o pedido para impressão
    const pedidoElement = document.createElement("div");
    pedidoElement.innerHTML = `
    <h2>📜 Pedido</h2>
    <p>${cartItems.replace(/\n/g, "<br>")}</p>
    <p><strong>📍 Endereço:</strong> ${addressInput.value}</p>
`;
 
    // Salva pedido em pdf
    // document.body.appendChild(pedidoElement); // Adiciona temporariamente para gerar PDF   
    // html2pdf().from(pedidoElement).save().then(() => {
    //     document.body.removeChild(pedidoElement); // Remove após gerar o PDF


    document.body.appendChild(pedidoElement); // Adiciona temporariamente ao DOM

    // Aguarda um pequeno intervalo antes de imprimir
    setTimeout(() => {
        html2pdf().from(pedidoElement).toPdf().get('pdf').then(pdf => {
            pdf.autoPrint();
            window.open(pdf.output('bloburl'), '_blank');

            // Limpa o carrinho depois da impressão
            cart = [];
            updateCartModal();

            // Remove o elemento temporário após a impressão
            document.body.removeChild(pedidoElement);
        });
    }, 500); // Aguarda 500ms para garantir a renderização
  
});

// Valida campo endereço
addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

//verificar a hora e manipular o card do horário
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 14 && hora < 23;
    //true = restaurante está aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}

