
const menuicon = document.getElementById("menu-icon");
const menulist = document.getElementById("menu-list");

menuicon.addEventListener("click", () => {
  menulist.classList.toggle("hidden");
  menulist.classList.toggle("show");
});

const translation = {
  en: {
    nav: { home: "Home", work: "Work", edu: "Education", contact: "Contact" },
    product: {
      p1: { title: "", desc: "[ Asia Server ] Starter Account with many 5-star cars.", btn: "Add to Cart" },
      p2: { title: "", desc: "[Asia Server] Starter Account With 2 Five-Star Characters.", btn: "Add to Cart" },
      p3: { title: "", desc: "Primogem account 12,000 - Asia server with 5-star characters", btn: "Add to Cart" },
      p4: { title: "", desc: "Primogem account 12000 Asia Server Without Limited 5 Star Characters [READ DESCRIPTION].", btn: "Add to Cart" },
      p5: { title: "", desc: "[80] GG 47B5 10 Signature c1 Kazuha sign[Description].", btn: "Add to Cart" },
      p6: { title: "", desc: "[85] GG WELLBUILD TOTAL 54B5 [Skin: Ayaka, Ganyu] C2 [BAKADESK].", btn: "Add to Cart" },
      p7: { title: "", desc: "SSR account 18B5 Tighnari C1 + 7B5 Weapons Diluc, Dehya.", btn: "Add to Cart" },
      p8: { title: "", desc: "[AR55] Mualani C3 SIGN, Kazuha C1 SIGN, Dehya, Kazuha C1 + Weapons.", btn: "Add to Cart" },
    },
    footer: {
      title: "Download Free Apk",
      doc: "Official Documents",
      contact: "Contact",
      terms: "Terms of Use",
      privacy: "Privacy Policy"
    }
  },
  id: {
    nav: { home: "Beranda", work: "Pekerjaan", edu: "Pendidikan", contact: "Kontak" },
    product: {
      p1: { title: "", desc: "[ Server Asia ] Akun Starter banyak car bintang 5", btn: "Tambah ke keranjang" },
      p2: { title: "", desc: "[ Server Asia ] Akun Starter ( Dengan 2 Karakter Bintang 5 )", btn: "Tambah ke keranjang" },
      p3: { title: "", desc: "Akun primogem 12000 - asia server dengan car Bintang 5", btn: "Tambah ke keranjang" },
      p4: { title: "", desc: "Akun primogem 12000 - server Asia tanpa karakter bintang 5 limited [BACADESKRIPSI]", btn: "Tambah ke keranjang" },
      p5: { title: "", desc: "[80] GG 47B5 10SIGNATURE C1 KAZUHA SIGN, [BACADESKRIPSI]", btn: "Tambah ke keranjang" },
      p6: { title: "", desc: "[85] GG WELLBUILD TOTAL 54B5 [SKIN AYAKA,GANYU]C2 [BACADESK]", btn: "Tambah ke keranjang" },
      p7: { title: "", desc: "[AR58] AKUN SSR 18B5 Tighnari C1 + 7B5 WEAPONS Diluc,Dehya", btn: "Tambah ke keranjang" },
      p8: { title: "", desc: "[AR55] Mualani C3 SIGN, Kazuha C1 SIGN,Dehya,KAZUHA C1 + WEAPONS", btn: "Tambah ke keranjang" },
    },
    footer: {
      title: "Unduh Aplikasi Gratis",
      doc: "Dokumen Resmi",
      contact: "Kontak",
      terms: "Syarat Penggunaan",
      privacy: "Kebijakan Privasi"
    }
  }
};

const langSelect = document.getElementById("langSelect");

langSelect.addEventListener("change", function () {
  const lang = this.value;
  document.documentElement.lang = lang;

  // navbar
  document.getElementById("nav-home").textContent = translation[lang].nav.home;
  document.getElementById("nav-work").textContent = translation[lang].nav.work;
  document.getElementById("nav-edu").textContent = translation[lang].nav.edu;
  document.getElementById("nav-contact").textContent = translation[lang].nav.contact;

  // produk (loop biar rapi)
  for (let i = 1; i <= 8; i++) {
    document.getElementById(`p${i}-title`).textContent = translation[lang].product[`p${i}`].title;
    document.getElementById(`p${i}-desc`).textContent = translation[lang].product[`p${i}`].desc;
    document.getElementById(`p${i}-btn`).textContent = translation[lang].product[`p${i}`].btn;
  }


  // footer
  document.getElementById("footer-title").textContent = translation[lang].footer.title;
  document.getElementById("f-doc").textContent = translation[lang].footer.doc;
  document.getElementById("f-contact").textContent = translation[lang].footer.contact;
  document.getElementById("f-terms").textContent = translation[lang].footer.terms;
  document.getElementById("f-privacy").textContent = translation[lang].footer.privacy;
});

// script.js

let cart = []; // array untuk simpan produk

// Fungsi tambah produk ke cart
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

// Update tampilan cart
function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = ""; // kosongin dulu
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = `Rp ${total.toLocaleString()}`;
}

// Fungsi checkout
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
  } else {
    alert("Terima kasih! Pesananmu sedang diproses.");
    cart = [];
    updateCartUI();
  }
}

// === Tambahkan event listener ke semua tombol produk ===
document.addEventListener("DOMContentLoaded", () => {
  // cari semua tombol Add to Cart
  const buttons = document.querySelectorAll(".card .btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // biar link href="#" ga reload
      const card = btn.closest(".card");
      const name = card.querySelector("h3").textContent;
      const priceText = card.querySelector(".price").textContent
        .replace(/Rp/g, "")   // hapus "Rp"
        .replace(/\./g, "")   // hapus titik pemisah ribuan
        .replace(/,/g, "")    // hapus koma kalau ada
        .trim();

      const price = parseInt(priceText);

      addToCart(name, price);
    });
  });
});


function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000); // ilang setelah 2 detik
}



