const menuItems = [
    {
      name: "Come-Come Burguer",
      description: "Pão, hamburguer, mussarela, alface, tomate, batata palha e molho especial.",
      price: "20.00",
      imgSrc: "./assets/hamb-1.png",
    },
    {
      name: "Come-Come Maionese",
      description: "Pão, hamburguer, mussarela, batata palha, maionese.",
      price: "10.00",
      imgSrc: "./assets/hamb-2.png",
    },
    {
      name: "Come-Come Egg",
      description: "Pão, hamburguer, mussarela, ovo, batata palha, maionese e molho especial.",
      price: "12.00",
      imgSrc: "./assets/hamb-3.png",
    },
    
    {
      name: "Come-Come Salada",
      description: "Pão, hamburguer, mussarela, alface, tomate, batata palha e molho especial.",
      price: "14.00",
      imgSrc: "./assets/hamb-4.png",
    },

    {
      name: "Come-Come Salada Egg",
      description: "Pão, hamburguer, mussarela, alface, tomate, ovo, batata palha e molho especial.",
      price: "15.00",
      imgSrc: "./assets/hamb-5.png",
    },

    {
      name: "Come-Come Bacon",
      description: "Pão, hamburguer, mussarela, bacon, alface, tomate, batata palha e molho especial.",
      price: "25.00",
      imgSrc: "./assets/hamb-6.png",
    },

    {
      name: "Come-Come Bacon Egg",
      description: "Pão, hamburguer, mussarela, bacon, alface, tomate, ovo, batata palha e molho especial",
      price: "26.00",
      imgSrc: "./assets/hamb-7.png",
    },

    {
      name: "Come-Come Calabresa Egg",
      description: "Pão, calabressa, mussarela, alface, tomate, ovo, batata palha e molho especial.",
      price: "24.00",
      imgSrc: "./assets/hamb-1.png",
    },

    {
      name: "Come-Come Calabresa",
      description: "Pão, calabressa, mussarela, alface, tomate, batata palha e molho especial",
      price: "23.00",
      imgSrc: "./assets/hamb-2.png",
    },  


  ];
  
  function generateMenu() {
    const menuContainer = document.querySelector("#menu main");
    menuItems.forEach(item => {
      const itemHTML = `
        <div class="flex gap-2">
          <img src="${item.imgSrc}" alt="${item.name}" 
            class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-2 duration-300" />
          <div>
            <p class="font-bold">${item.name}</p>
            <p class="text-sm">${item.description}</p>
            <div class="flex items-center gap-2 justify-between mt-3">
              <p class="font-bold text-lg">R$ ${item.price}</p>
              <button class="bg-gray-900 px-5 rounded add-to-cart-btn" data-name="${item.name}" data-price="${item.price}">
                <i class="fa fa-cart-plus text-lg text-white"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      menuContainer.insertAdjacentHTML("beforeend", itemHTML);
    });
  }
  
  document.addEventListener("DOMContentLoaded", generateMenu);
  