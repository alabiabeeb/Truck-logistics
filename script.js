const modal = document.getElementById('truck-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalSpecs = document.getElementById('modal-specs');
const closeBtn = document.querySelector('.close-btn');

const trucksData = {
  "Chevy Silverado 1500": {
    image: "images/f280e1200acc038dc201d1626bdbcc3b.jpg",
    description: "Powerful V8 engine, spacious cabin, perfect for all your hauling needs.",
    specs: [
      "Engine: V8 5.3L",
      "Horsepower: 355 hp",
      "Towing Capacity: 9,300 lbs",
      "Fuel Economy: 17 MPG city / 23 MPG highway"
    ],
    email: "norahalex13@gmail.com",
    phone: "+234 703 062 14 22"
  },
  "Chevy Colorado ZR2": {
    image: "images/images (14).jpeg",
    description: "Off-road beast with advanced suspension and rugged design.",
    specs: [
      "Engine: 3.6L V6",
      "Horsepower: 308 hp",
      "4WD with Off-road Suspension",
      "Fuel Economy: 18 MPG city / 25 MPG highway"
    ],
    email: "norahalex13@gmail.com",
    phone: "+234 703 062 14 22"
  },
  "Chevy Silverado 2500HD": {
    image: "images/images (15).jpeg",
    description: "Heavy-duty performance, perfect for demanding work and towing.",
    specs: [
      "Engine: Duramax 6.6L Turbo Diesel",
      "Horsepower: 445 hp",
      "Towing Capacity: 18,500 lbs",
      "Fuel Economy: 15 MPG city / 20 MPG highway"
    ],
    email: "norahalex13@gmail.com",
    phone: "+234 703 062 14 22"
  }
};

// Attach click handlers to <a class="btn"> inside each truck-card
document.querySelectorAll('.truck-card .btn').forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();

    // Find truck name from sibling h3 inside the same truck-card
    const truckName = button.closest('.truck-card').querySelector('h3').textContent;
    const truck = trucksData[truckName];

    if (truck) {
      modalTitle.textContent = truckName;
      modalImage.src = truck.image;
      modalImage.alt = truckName;

      // Set description text (clear previous children first)
      modalDescription.textContent = truck.description;

      // Clear previous specs list
      modalSpecs.innerHTML = '';
      truck.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecs.appendChild(li);
      });

      // Remove old contact info if any
      const oldContact = modalDescription.querySelector('.modal-contact');
      if (oldContact) oldContact.remove();

      // Create contact info div and append it
      const contactInfo = document.createElement('div');
      contactInfo.classList.add('modal-contact');
      contactInfo.innerHTML = `
        <p><strong>Contact Seller:</strong></p>
        <p>Email: <a href="mailto:${truck.email}">${truck.email}</a></p>
        <p>Phone: <a href="tel:${truck.phone}">${truck.phone}</a></p>
      `;
      modalDescription.appendChild(contactInfo);

      // Show the modal
      modal.style.display = 'flex';
    }
  });
});

// Close modal when clicking close button
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside modal content
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Toggle sidebar cart
const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const itemName = card.querySelector("h3").textContent;
    const itemPrice = parseFloat(card.querySelector(".price").textContent.replace("$", ""));

    cart.push({ name: itemName, price: itemPrice });
    cartCount++;
    cartTotal += itemPrice;

    document.getElementById("cart-count").textContent = cartCount;
    document.getElementById("cart-total").textContent = cartTotal.toFixed(2);

    renderCart();
  });
});

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(div);
  });
}




