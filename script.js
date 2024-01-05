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
    // Toggle the 'visible' class on the cart container and overlay
    cartContainer.classList.toggle('visible');
    cartOverlay.classList.toggle('visible');
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

  function handleButtonClick(event) {
    // Find the closest ancestor div with role="button"
    let buttonDiv = event.target.closest('div[role="button"]');
    if (!buttonDiv) return; 

    console.log("Button clicked", buttonDiv);

    // Assuming the item type, name, and id are stored in data attributes on the button div
    let itemType = buttonDiv.getAttribute("data-item-type");
    let itemName = buttonDiv.getAttribute("data-item-name");
    let itemId = buttonDiv.getAttribute("data-item-id");

    if (itemName && itemId) {
        addItemToLocalStorage(itemName, itemId, itemType);
        toggleCartDisplay();
    }
}

  document.querySelectorAll("#add-opportunities-quote, #add-convert-quote, #add-efficiency-quote")
  .forEach(buttonDiv => {
      buttonDiv.addEventListener("click", handleButtonClick);
  });


  function renderCartItems() {
    let storedItems = JSON.parse(localStorage.getItem("quotedItems")) || [];
    let cartContentWrapper = document.getElementById("navbar_cart-content-wrapper");
    cartContentWrapper.innerHTML = ''; // Clear existing content

    if (storedItems.length === 0) {
        // If the cart is empty, display a message
        let emptyCartDiv = document.createElement('div');
        emptyCartDiv.textContent = 'Cart empty';
        emptyCartDiv.className = 'empty-cart-message'; // Optional: for styling
        cartContentWrapper.appendChild(emptyCartDiv);
    } else {
        // If there are items in the cart, render them as usual
        let groupedItems = groupItemsByType(storedItems);
        let cartDataForForm = [];

        for (let type in groupedItems) {
            let typeDiv = document.createElement("div");
            typeDiv.className = "navbar_cart-quote-type";

            let typeTitle = document.createElement("div");
            typeTitle.className = "text-size-small font-dm-sans text-weight-bold";
            typeTitle.textContent = type;
            typeDiv.appendChild(typeTitle);

            groupedItems[type].forEach((item, index) => {
                updateButtonInnerText(item.id);
                let itemDiv = document.createElement("div");
                itemDiv.className = "navbar_cart-content";
                itemDiv.setAttribute('data-item-id', item.id);

                let itemNameSpan = document.createElement("span");
                itemNameSpan.className = "navbar_cart-quote-title max-width-xxsmall";
                itemNameSpan.textContent = item.name;

                let deleteButton = createDeleteButton(index, item.id);

                itemDiv.appendChild(itemNameSpan);
                itemDiv.appendChild(deleteButton);

                typeDiv.appendChild(itemDiv);

                cartDataForForm.push({
                  name: item.name,
                  id: item.id,
                  type: item.type
                });
            });

            cartContentWrapper.appendChild(typeDiv);
        }
        updateFormInput(cartDataForForm);
        updateQuoteButtonCount(cartDataForForm);
    }
}


  function updateButtonInnerText(itemId) {
    let button = document.querySelector(`div[role="button"][data-item-id="${itemId}"]`);
    if (!button) return;

    let storedItems = JSON.parse(localStorage.getItem("quotedItems")) || [];
    let isItemInCart = storedItems.some(item => item.id === itemId);

    let buttonTextElement = button.querySelector('.text-size-small'); 
    if (buttonTextElement) {
        // Define the HTML content with class names and other attributes
        let htmlContent = isItemInCart 
            ? '<span class="text-size-small" style="gap: 4px ; display: inline-flex; justify-content = center; align-items : center;">Added<svg style="stroke-width: 1.5px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="check-icon"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" /></svg></span>'
            : '<span class="text-size-small"><span class="text-size-medium">+</span>Add to quote</span>';

        // Set the HTML content
        buttonTextElement.innerHTML = htmlContent;
    }
}




  function updateQuoteButtonCount(cartData) {
    let quoteCount = document.getElementById("quote-count");
    if (quoteCount) {
        // Calculate the count as the length of cartData plus 1
        let count = cartData.length;
        quoteCount.textContent = `${count}`;
    }
  }

  function updateFormInput(cartData) {
    let formInput = document.getElementById("cart-data-input");
    if (!formInput) {
        console.error("Cart data input field not found!");
        return;
    }

    let itemNames = cartData.map(item => item.name).join(", ");
    formInput.value = itemNames;
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

    let itemElement = document.querySelector(`.navbar_cart-content[data-item-id="${itemId}"]`);
    if (itemElement) {
      
        itemElement.classList.add('removing');

        
        setTimeout(() => {
            localStorage.setItem("quotedItems", JSON.stringify(updatedItems));
            renderCartItems();
            updateButtonInnerText(itemId);
        }, 300); 
    }
}
});
