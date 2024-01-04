document.addEventListener("DOMContentLoaded", function () {
  console.log("testing");
  renderCartItems();
  $(document).ready(function () {
    $(".product-card").on("click", function () {
      // Set a timeout to delay the click event by 3 seconds
      setTimeout(function () {
        $("#solution-card-button-1").click();
      }, 3000);
    });
  });

  // Custom code to toggle get-quote cart
  var quoteButton = document.getElementById("navbar-quote-button");
  var cartContainer = document.getElementById("navbar_cart-container");
  var cartOverlay = document.getElementById("nav_cart-overlay"); // Added line for the overlay
  var closeButton = document.getElementById("navbar-cart-closebtn");

  // Function to toggle the display of the cart container and overlay
  function toggleCartDisplay() {
    var isCartHidden =
      cartContainer.style.display === "none" ||
      cartContainer.style.display === "";

    cartContainer.style.display = isCartHidden ? "block" : "none";
    cartOverlay.style.display = isCartHidden ? "block" : "none"; // Toggle the overlay display
  }

  // Check if elements exist to avoid errors
  if (quoteButton && cartOverlay && closeButton) {
    // Event listener for the quote button
    quoteButton.addEventListener("click", function () {
      toggleCartDisplay();
    });

    // Event listener for the close button
    closeButton.addEventListener("click", function () {
      toggleCartDisplay();
    });

    // Event listener for the cart overlay
    cartOverlay.addEventListener("click", function () {
      toggleCartDisplay();
    });
  }

  // Function to add item to local storage
  function addItemToLocalStorage(itemName, itemId, itemType) {
    // Retrieve existing items from local storage
    let storedItems = JSON.parse(localStorage.getItem("quotedItems")) || [];

    // Create an object for the new item
    let newItem = { name: itemName, id: itemId, type: itemType };

    // Add the new item to the array
    storedItems.push(newItem);

    // Save back to local storage
    localStorage.setItem("quotedItems", JSON.stringify(storedItems));
    renderCartItems();
  }

  // Function to handle button click
  function handleButtonClick(event) {
    // Use closest to get the button element even if the click is on a child element
    let button = event.target.closest('button');
    if (!button) return; // Exit if no button found

    console.log("Button clicked");

    let buttonId = button.id;
    let itemType = "";

    // Determine the type based on button ID
    if (buttonId === "add-opportunities-quote") {
        itemType = "Opportunities";
    } else if (buttonId === "add-convert-quote") {
        itemType = "Convert";
    } else if (buttonId === "add-efficiency-quote") {
        itemType = "Efficiency";
    }

    // Assuming the item name and id are stored in data attributes on the button
    let itemName = button.getAttribute("data-item-name");
    let itemId = button.getAttribute("data-item-id");

    // Check for null or undefined values
    if (itemName && itemId) {
        addItemToLocalStorage(itemName, itemId, itemType);
        toggleCartDisplay();
    }
}


  // Attach event listeners to buttons
  let buttons = document.querySelectorAll(
    "#add-opportunities-quote, #add-convert-quote, #add-efficiency-quote"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  // function renderCartItems() {
  //   let storedItems = JSON.parse(localStorage.getItem("quotedItems")) || [];
  //   let cartContentWrapper = document.getElementById(
  //     "navbar_cart-content-wrapper"
  //   );

  //   cartContentWrapper.innerHTML = "";

  //   storedItems.forEach((item, index) => {
  //     let itemDiv = document.createElement("div");
  //     itemDiv.className = "navbar_cart-content";

  //     let itemNameSpan = document.createElement("span");
  //     itemNameSpan.className = "text-size-small font-dm-sans text-weight-bold"
  //     itemNameSpan.textContent = item.name;

  //     let deleteButton = document.createElement("button");
  //     deleteButton.className = "navbar-cart-deletebtn";

  //     let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //     svg.setAttribute("viewBox", "0 0 24 24");
  //     svg.setAttribute("fill", "none");
  //     svg.setAttribute("stroke", "currentColor");
  //     svg.setAttribute("stroke-width", "1.5");
  //     svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />`;

  //     deleteButton.appendChild(svg);

  //     // Attach the click event listener to the delete button
  //     deleteButton.addEventListener("click", function () {
  //       removeItemFromCart(index);
  //     });

  //     itemDiv.appendChild(itemNameSpan);
  //     itemDiv.appendChild(deleteButton);

  //     cartContentWrapper.appendChild(itemDiv);
  //   });
  // }

  function renderCartItems() {
    let storedItems = JSON.parse(localStorage.getItem("quotedItems")) || [];
    let cartContentWrapper = document.getElementById("navbar_cart-content-wrapper");
    cartContentWrapper.innerHTML = '';

    let groupedItems = groupItemsByType(storedItems);

    for (let type in groupedItems) {
        let typeDiv = document.createElement("div");
        typeDiv.className = "navbar_cart-quote-type";

        let typeTitle = document.createElement("div");
        typeTitle.className = "text-size-small font-dm-sans text-weight-bold"
        typeTitle.textContent = type;
        typeDiv.appendChild(typeTitle);

        groupedItems[type].forEach((item, index) => {
            let itemDiv = document.createElement("div");
            itemDiv.className = "navbar_cart-content";

            let itemNameSpan = document.createElement("span");
            itemNameSpan.className = "navbar_cart-quote-title";
            itemNameSpan.textContent = item.name;

            let deleteButton = createDeleteButton(index, item.id);

            itemDiv.appendChild(itemNameSpan);
            itemDiv.appendChild(deleteButton);

            typeDiv.appendChild(itemDiv);
        });

        cartContentWrapper.appendChild(typeDiv);
    }
  }

  function createDeleteButton(index, itemId) {
      let deleteButton = document.createElement("button");
      deleteButton.className = "navbar-cart-deletebtn";
      
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "1.5");
        svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />`;

        deleteButton.appendChild(svg);

      deleteButton.addEventListener("click", function() {
          removeItemFromCart(itemId);
      });

      return deleteButton;
  }


  function groupItemsByType(items) {
    const groupedItems = {};

    items.forEach(item => {
        if (!groupedItems[item.type]) {
            groupedItems[item.type] = [];
        }
        if (!groupedItems[item.type].some(existingItem => existingItem.id === item.id)) {
            groupedItems[item.type].push(item);
        }
    });

    return groupedItems;
  }

  function removeItemFromCart(itemId) {
    let storedItems = JSON.parse(localStorage.getItem("quotedItems")) || [];
    let updatedItems = storedItems.filter(item => item.id !== itemId);
    localStorage.setItem("quotedItems", JSON.stringify(updatedItems));
    renderCartItems();
  }
});
