const menuItems = [
  {
    name: "01 - Come-Come Burguer",
    description: "Pão, hamburguer, mussarela, alface, tomate, batata palha e molho especial.",
    price: "20.00",
    imgSrc: "./assets/hamb-1.png",
  },
  {
    name: "02 - Come-Come Maionese",
    description: "Pão, hamburguer, mussarela, batata palha, maionese.",
    price: "10.00",
    imgSrc: "./assets/hamb-2.png",
  },
  {
    name: "03 - Come-Come Egg",
    description: "Pão, hamburguer, mussarela, ovo, batata palha, maionese e molho especial.",
    price: "12.00",
    imgSrc: "./assets/hamb-3.png",
  },
  
  {
    name: "04 - Come-Come Salada",
    description: "Pão, hamburguer, mussarela, alface, tomate, batata palha e molho especial.",
    price: "14.00",
    imgSrc: "./assets/hamb-4.png",
  },

  {
    name: "05 - Come-Come Salada Egg",
    description: "Pão, hamburguer, mussarela, alface, tomate, ovo, batata palha e molho especial.",
    price: "15.00",
    imgSrc: "./assets/hamb-5.png",
  },

  {
    name: "06 - Come-Come Bacon",
    description: "Pão, hamburguer, mussarela, bacon, alface, tomate, batata palha e molho especial.",
    price: "25.00",
    imgSrc: "./assets/hamb-6.png",
  },

  {
    name: "07 - Come-Come Bacon Egg",
    description: "Pão, hamburguer, mussarela, bacon, alface, tomate, ovo, batata palha e molho especial",
    price: "26.00",
    imgSrc: "./assets/hamb-7.png",
  },

  {
    name: "08 - Come-Come Tudo, Duplo, Mega",
    description: "Pão, hambúrguer, mussarela, batata palha, alface, tomate, ovo, bacon, calabresa, pernil, milho, presunto, frango e molho especial.",
    price: "25.00",
    imgSrc: "./assets/hamb-1.png",
  },

  {
    name: "09 - Come-Come Calabresa",
    description: "Pão, calabressa, mussarela, alface, tomate, batata palha e molho especial",
    price: "23.00",
    imgSrc: "./assets/hamb-2.png",
  },  

  {
      name: "10 - Come-Come Calabresa Egg",
      description: "Pão, Calabresa, mussarela, alface, tomate, ovo, batata palha e molho especial.",
      price: "24.00",
      imgSrc: "./assets/hamb-3.png",
    },
    {
      name: "11 - Come-Come Lombo",
      description: "Pão, lombo, mussarela, batata palha, e molho especial.",
      price: "24.00",
      imgSrc: "./assets/hamb-4.png",
    },
    {
      name: "12 - Come-Come Lombo c/ Maionese",
      description: "Pão, lombo, mussarela, batata palha, e maionese.",
      price: "24.00",
      imgSrc: "./assets/hamb-5.png",
    },
    
    {
      name: "13 - Come-Come Lombo Egg",
      description: "Pão, lombo, mussarela, ovo, batata palha, e moho especial.",
      price: "25.00",
      imgSrc: "./assets/hamb-6.png",
    },

    {
      name: "14 - Come-Come Lombo Salada",
      description: "Pão, lombo, mussarela, alface, tomate, batata palha, e moho especial.",
      price: "25.00",
      imgSrc: "./assets/hamb-7.png",
    },

    {
      name: "15 - Come-Come Lombo Salada Egg",
      description: "Pão, lombo, mussarela, alface, tomate, ovo, batata palha, e moho especial.",
      price: "26.00",
      imgSrc: "./assets/hamb-1.png",
    },

    {
      name: "16 - Come-Come Lombo Bacon",
      description: "Pão, lombo, mussarela, bacon, alface, tomate, batata palha, e moho especial.",
      price: "30.00",
      imgSrc: "./assets/hamb-2.png",
    },

    {
      name: "17 - Come-Come Lombo Bacon Egg",
      description: "Pão, lombo, mussarela, bacon, alface, tomate, ovo, batata palha, e moho especial.",
      price: "30.00",
      imgSrc: "./assets/hamb-3.png",
    },

    {
      name: "18 - Come-Come Lombo Especial",
      description: "Pão, lombo, mussarela, bacon, alface, tomate, ovo, milho, presunto, calabresa, batata palha, e moho especial.",
      price: "32.00",
      imgSrc: "./assets/hamb-4.png",
    }, 

    {
      name: "19 - Come-Come Frango",
      description: "",
      price: "25.00",
      imgSrc: "./assets/hamb-5.png",
    },
    {
      name: "20 - Come-Come Frango Bacon",
      description: "",
      price: "26.00",
      imgSrc: "./assets/hamb-6.png",
    },
    {
      name: "21 - Come-Come Frango c/ Maionese",
      description: "",
      price: "25.00",
      imgSrc: "./assets/hamb-7.png",
    },
    
    {
      name: "22 - Come-Come Frango Egg",
      description: "",
      price: "26.00",
      imgSrc: "./assets/hamb-1.png",
    },

    {
      name: "23 - Come-Come Frango Salada",
      description: "",
      price: "26.00",
      imgSrc: "./assets/hamb-2.png",
    },

    {
      name: "24 - Come-Come Frango Salada Egg",
      description: "",
      price: "27.00",
      imgSrc: "./assets/hamb-3.png",
    },

    {
      name: "25 - Come-Come Frango Bacon Egg",
      description: "",
      price: "30.00",
      imgSrc: "./assets/hamb-4.png",
    },

    {
      name: "26 - Come-Come Tudo Especial",
      description: "",
      price: "30.00",
      imgSrc: "./assets/hamb-5.png",
    },

    {
      name: "27 - Come-Come Frango Catupyry",
      description: "",
      price: "30.00",
      imgSrc: "./assets/hamb-6.png",
    },

    {
      name: "28 - Come-Come Frango Banana",
      description: "",
      price: "23.00",
      imgSrc: "./assets/hamb-7.png",
    },
    {
      name: "29 - Come-Come Filé Mignon Acebolado",
      description: "",
      price: "",
      imgSrc: "./assets/hamb-1.png",
    },
    {
      name: "30 - Come-Come Lombo Acebolado",
      description: "",
      price: "26.00",
      imgSrc: "./assets/hamb-2.png",
    },
    
    {
      name: "31 - Come-Come c/ Abacaxi",
      description: "",
      price: "28.00",
      imgSrc: "./assets/hamb-3.png",
    },

    {
      name: "32 - Come-Come Banana",
      description: "",
      price: "15.00",
      imgSrc: "./assets/hamb-4.png",
    },

    {
      name: "33 - Come-Come Banana c/ Queijo",
      description: "",
      price: "17.00",
      imgSrc: "./assets/hamb-5.png",
    },

    {
      name: "34 - Come-Come Misto",
      description: "",
      price: "12.00",
      imgSrc: "./assets/hamb-6.png",
    },

    {
      name: "35 - Come-Come Chedda Burger",
      description: "",
      price: "18.00",
      imgSrc: "./assets/hamb-7.png",
    },

    {
      name: "36 - Come-Come Especial",
      description: "",
      price: "25.00",
      imgSrc: "./assets/hamb-1.png",
    }, 

    {
      name: "37 - Come-Come",
      description: "",
      price: "35.00",
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
  