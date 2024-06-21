// Tangkap beberapa element HTML

let modal = document.getElementById('modal');
let floating_button = document.getElementById('floating_button');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');

subtitle.innerHTML = new Date().toLocaleDateString();

// Data list belanja
let data_list_belanja = [];

// Menambahkan event listener ke floating button
floating_button.addEventListener('click', () => {
  if (modal.style.display == 'none') {
    // Munculkan Modal
    showModal();
    return;
  }

  // Sembunyikan kembali
  hideModal();
});

// Menambahkan event listener agar ketika background d klik akan menghide modal
modal_bg.addEventListener('click', () => {
  // Sembunyikan kembali
  hideModal();
});

// Tambahkan listener submit ke addlist form
addlist_form.addEventListener('submit', (e) => {
  // stop form dari reload page
  e.preventDefault();

  // tangkap value dari masing-masing input field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // push data list belanja
  data_list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString(),
  });

  // clear input field
  event.target.barang.value = '';
  event.target.harga.value = '';

  hideModal();

  renderToHtml();
});

function showModal() {
  // Munculkan modal form
  modal.style.display = 'flex';
  floating_button.style.backgroundColor = 'grey';
  floating_button.style.transform = 'rotate(45deg)';
}

function hideModal() {
  // Sembunyikan kembali
  modal.style.display = 'none';
  floating_button.style.backgroundColor = '#F280B6';
  floating_button.style.transform = 'rotate(0deg)';
}

function renderToHtml() {
  // clear element div
  root.innerHTML = '';

  // perulangan
  data_list_belanja.forEach((e, i) => {
    root.innerHTML += `
    <div class="card">
      <small>${e.tanggal}</small>
      <div>
        ${e.nama_barang} <span> Rp. ${e.harga_barang}</span>
      </div>
      <button onclick="handleDelete(${i})" style="cursor: pointer;">Hapus</button>
    </div>
    `;
  });
}

function handleDelete(index) {
  data_list_belanja.splice(index, 1);
  renderToHtml();
}