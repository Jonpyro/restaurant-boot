class Menu {
    constructor() {
        this.itemsOnPlate = {
            itemCount: 0,
            subTotal: 0,
        }
        this.inventory = {
            item1: {
                id: 1,
                img: 'media/image1.jpg',
                alt: 'Spud Wedges',
                class: 'spuds',
                price: 8.00,
                qty: 0,
                name: 'Spud Wedges'
            },
            item2: {
                id: 2,
                img: 'media/image2.jpeg',
                alt: 'Loaded Spud',
                class: 'spuds',
                price: 7.50,
                qty: 0,
                name: 'Loaded Spud'
            },
            item3: {
                id: 3,
                img: 'media/images.jpg',
                alt: 'Super Spud',
                class: 'spuds',
                price: 9.50,
                qty: 0,
                name: 'Super Spud'
            },
            item4: {
                id: 4,
                img: 'media/spud2.jpg',
                alt: 'Loaded Shrip Spud',
                class: 'spuds',
                price: 10.50,
                qty: 0,
                name: 'Loaded Shrip Spud'
            },
            item5: {
                id: 5,
                img: 'media/spud3.jpg',
                alt: 'Seasond Spud Slices',
                class: 'spuds',
                price: 5.75,
                qty: 0,
                name: 'Seasond Spud Slices'
            },
            item6: {
                id: 6,
                img: 'media/spud6.jpg',
                alt: 'Sweet Spud Fries',
                class: 'spuds',
                price: 2.50,
                qty: 0,
                name: 'Sweet Spud Fries'
            },
            item7: {
                id: 7,
                img: 'media/stuffedSpud.jpg',
                alt: 'Stuffed Spud',
                class: 'spuds',
                price: 3.45,
                qty: 0,
                name: 'Stuffed Spud'
            },
            item8: {
                id: 8,
                img: 'media/spudFries.jpg',
                alt: 'Spud Fries',
                class: 'spuds',
                price: 1.25,
                qty: 0,
                name: 'Spud Fries'
            }
        }
    }
    init() {
        this.loadItems();
        this.addToOrder();
        this.checkout();
    }
    loadItems() {
        let count = 0;
        let products1 = document.querySelector('.products1')
        let products2 = document.querySelector('.products2')

        for (const key in this.inventory) {
            const item = this.inventory[key];
            const product = document.createElement('div');
            product.className = 'col-md-3 product';
            product.innerHTML = `
                <img src="${item.img}" alt="${item.alt}" class="img-fluid ${item.class}">
                <button class="btn btn-secondary add-button" data-id="${item.id}">Add to Order</button>`;

            if (count < 4) {
                products1.append(product);
            } else {
                products2.append(product);
            }
            count++;
        }
    }
    addToOrder(){
        let buttons = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubTotal = document.getElementById('cartSubTotal');
        let itemCount = 0;
        let price = 0;
        for (const key in this.inventory){
            const item = this.inventory[key];
            buttons.forEach(button => {
                button.addEventListener('click', ()=>{
                    if(button.dataset['id'] == item.id){ 
                        itemCount++;
                        price = price + item.price;

                        this.itemsOnPlate.itemCount = itemCount;
                        this.itemsOnPlate.subTotal = price;
                        item.qty++
                    }
                    cartItems.innerText = itemCount;
                    cartSubTotal.innerText = price.toFixed(2);
                })
            })
        }
    }
    checkout(){
        let table = document.getElementById('tbody');
        let cart = document.querySelector('.cart')
        let checkoutPage = document.querySelector('.checkout-page');
        let menuPage = document.querySelector('.menu-page');
        let subTimesQty = 0;
        let subTotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let totalValue = document.getElementById('totalValue');
        let tax = 0;
        let deliveryValue = document.getElementById('deliveryValue');
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let delivery = 6.50

        cart.addEventListener('click', ()=>{
            checkoutPage.classList.remove('d-none');
            menuPage.classList.add('d-none');

            

            for(const key in this.inventory){
                const item = this.inventory[key];

                subTimesQty = (item.qty * item.price).toFixed(2);
                subTotalValue.innerText = this.itemsOnPlate.subTotal.toFixed(2);
                deliveryValue.innerText = delivery.toFixed(2);
                tax = (this.itemsOnPlate.subTotal * .07);
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsOnPlate.subTotal + tax + delivery).toFixed(2);
                console.log(item.qty);
                if (item.qty > 0){
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-chechout';

                    tableRow.innerHTML +=`<td id="checkoutImg">
                    <img src="${item.img}" alt="${item.alt}" class="img-fluid checkout-img"> 
                    <div class="product-desc">
                        <p class="item-name">${item.name}</p>
                    </div>
                </td>
                <td>
                    <p class="unit-price">${item.price.toFixed(2)}</p>
                </td>
                <td>
                    <div id="itemQuantity">
                        <p id="qtyInput>${item.qty}</p>
                    </div>
                </td>
                <td id="itemSubtotal">${subTimesQty}</td>`

                table.append(tableRow);
                }
            }
                totalValue.innerText = (this.itemsOnPlate.subTotal + tax + delivery).toFixed(2);
        })
    }
}

let action = new Menu();

action.init();