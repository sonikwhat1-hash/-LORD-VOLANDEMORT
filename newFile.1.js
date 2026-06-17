
if (document.getElementById('product-title')) {
    const products = {
        1: {
            title: "Мантия-невидимка",
            price: "5000 галлеонов",
            img: "https://storage.yandexcloud.net/colorlon-prod/PICS/BAA99870-A3EE-11EE-974C-003048FD6515_2.jpg",
            desc: "Легендарная мантия, принадлежавшая семье Поттеров.",
            specs: ["Материал: Волосы единорога", "Срок службы: Вечный"]
        },
        2: {
            title: "Карта Мародеров",
            price: "1200 галлеонов",
            img: "https://i.pinimg.com/originals/ef/9d/f2/ef9df2894b4448c25ce12fa190903629.jpg",
            desc: "Показывает всех людей в Хогвартсе.",
            specs: ["Авторы: Лунатик, Хвост, Чатоног и Олень"]
        },
        3: {
            title: "Метла Nimbus 2000",
            price: "3000 галлеонов",

            desc: "Скоростная метла для квиддича.",
            specs: ["Скорость: 240 км/ч"]
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';
    const product = products[productId];

    if (product) {
        document.getElementById('product-img').src = product.img;
        document.getElementById('product-img').alt = product.title;
        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-price').innerText = product.price;
        document.getElementById('product-desc').innerText = product.desc;

        const specsList = document.getElementById('product-specs');
        specsList.innerHTML = '';
        product.specs.forEach(spec => {
            const li = document.createElement('li');
            li.innerText = spec;
            specsList.appendChild(li);
        });

        document.getElementById('add-to-cart-btn').onclick = function() {
            addToCart(product.title);
        };

        document.title = product.title + " | Товар";
    }
}
