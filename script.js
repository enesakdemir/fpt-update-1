
const searchInput = document.getElementById('search-input');
const products = document.querySelectorAll('.product');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        product.style.display = title.includes(query) ? '' : 'none';
    });
});
