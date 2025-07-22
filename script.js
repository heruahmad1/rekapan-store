// Fungsi untuk menghitung subtotal setiap produk
function hitungSubtotal(produk) {
  const jumlah = parseInt(document.getElementById(produk).value) || 0;
  const harga = (parseInt(document.getElementById(`harga-${produk}`).value) || 0) * 1000;
  const subtotal = jumlah * harga;
  
  document.getElementById(`subtotal-${produk}`).textContent = `Rp${subtotal.toLocaleString("id-ID")}`;
  hitungTotal();
}

// Fungsi untuk menghitung total keseluruhan
function hitungTotal() {
  const produkList = ["jumbo", "lite", "big", "mini", "spr-jmbo", "produk-1", "produk-2"];
  let total = 0;
  let totalOrder = 0;

  produkList.forEach(p => {
    const jumlah = parseInt(document.getElementById(p).value) || 0;
    const harga = (parseInt(document.getElementById(`harga-${p}`).value) || 0) * 1000;
    total += jumlah * harga;
    totalOrder += jumlah;
  });

  // Kurangi dengan refund/saldo
  const refund = (parseInt(document.getElementById("refund").value) || 0) * 1000;
  total -= refund;

  // Update total keseluruhan
  const totalElement = document.getElementById("total-keseluruhan");
  if (totalElement) {
    totalElement.textContent = `Rp${total.toLocaleString("id-ID")}`;
  }
  
  // Update jumlah transaksi
  const totalOrderElement = document.getElementById("jumlah-transaksi");
  if (totalOrderElement) {
    totalOrderElement.textContent = totalOrder;
  }
}

// Fungsi untuk mengirim rekapan ke WhatsApp
function kirimWhatsApp() {
  const tanggal = document.getElementById("tanggal").value;
  
  if (!tanggal) {
    alert("Mohon pilih tanggal terlebih dahulu!");
    return;
  }
  
  const produkList = ["jumbo", "lite", "big", "mini", "spr-jmbo", "produk-1", "produk-2"];
  const produkNames = {
    jumbo: "JUMBO",
    lite: "LITE",
    big: "BIG",
    mini: "MINI",
    "spr-jmbo": "SPR-JMBO",
    "produk-1": document.getElementById("nama-produk-1").value || "Produk Custom 1",
    "produk-2": document.getElementById("nama-produk-2").value || "Produk Custom 2"
  };

  let pesan = `📆 Tanggal: ${formatTanggal(tanggal)}\n📦 REKAPAN ORDER HR STORE:\n`;
  let totalPenjualan = 0;
  let totalOrder = 0;
  let adaProduk = false;

  produkList.forEach(p => {
    const jumlah = parseInt(document.getElementById(p).value) || 0;
    const harga = (parseInt(document.getElementById(`harga-${p}`).value) || 0) * 1000;
    
    if (jumlah > 0) {
      const subtotal = jumlah * harga;
      pesan += `\n• ${produkNames[p]}: ${jumlah} x Rp ${harga.toLocaleString("id-ID")} = Rp ${subtotal.toLocaleString("id-ID")}`;
      totalPenjualan += subtotal;
      totalOrder += jumlah;
      adaProduk = true;
    }
  });

  if (!adaProduk) {
    alert("Mohon masukkan minimal satu produk dengan jumlah dan harga!");
    return;
  }

  // Tambahkan refund/saldo jika ada
  const refund = (parseInt(document.getElementById("refund").value) || 0) * 1000;
  if (refund > 0) {
    pesan += `\n\n↩ REFUND/SALDO: -Rp ${refund.toLocaleString("id-ID")}`;
  }

  const totalAkhir = totalPenjualan - refund;
  pesan += `\n\n💰 TOTAL PENJUALAN: Rp ${totalPenjualan.toLocaleString("id-ID")}`;
  pesan += `\n💰 TOTAL KESELURUHAN: *Rp ${totalAkhir.toLocaleString("id-ID")}*`;
  pesan += `\n🧾 Total Transaksi: ${totalOrder}`;
  pesan += `\n\n💳 INFORMASI PEMBAYARAN:`;
  pesan += `\n🏦 SEABANK: 901516847602`;
  pesan += `\n💳 DANA: 082236625627`;
  pesan += `\n👤 A.N: AHMAD KHAIRUDIN`;
  pesan += `\n📱 QRIS: rebrand.ly/QRIS-HR`;
  pesan += `\n\nTerima kasih! 🙏`;

  const encodedMessage = encodeURIComponent(pesan);
  const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
  
  // Buka WhatsApp di tab baru
  window.open(whatsappURL, '_blank');
}

// Fungsi untuk memformat tanggal ke format Indonesia
function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('id-ID', options);
}

// Fungsi untuk reset form
function resetForm() {
  if (confirm("Apakah Anda yakin ingin mereset semua data?")) {
    // Reset semua input
    const produkList = ["jumbo", "lite", "big", "mini", "spr-jmbo", "produk-1", "produk-2"];
    
    produkList.forEach(p => {
      const inputJumlah = document.getElementById(p);
      const inputHarga = document.getElementById(`harga-${p}`);
      
      if (inputJumlah) inputJumlah.value = "";
      if (inputHarga) inputHarga.value = "";
      
      // Reset subtotal
      const subtotalElement = document.getElementById(`subtotal-${p}`);
      if (subtotalElement) subtotalElement.textContent = "Rp0";
    });
    
    // Reset nama produk custom
    const namaProduk1 = document.getElementById("nama-produk-1");
    const namaProduk2 = document.getElementById("nama-produk-2");
    if (namaProduk1) namaProduk1.value = "";
    if (namaProduk2) namaProduk2.value = "";
    
    // Reset refund
    const refundInput = document.getElementById("refund");
    if (refundInput) refundInput.value = "";
    
    // Reset total
    const totalElement = document.getElementById("total-keseluruhan");
    const totalOrderElement = document.getElementById("jumlah-transaksi");
    if (totalElement) totalElement.textContent = "Rp0";
    if (totalOrderElement) totalOrderElement.textContent = "0";
    
    // Set tanggal hari ini setelah reset
    const today = new Date().toISOString().split('T')[0];
    const tanggalInput = document.getElementById("tanggal");
    if (tanggalInput) tanggalInput.value = today;
  }
}

// Inisialisasi aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {

  // Setup event listeners untuk semua input
  setupEventListeners();
  
  // Setup event listener untuk tombol WhatsApp
  const whatsappButton = document.getElementById("whatsapp-button");
  if (whatsappButton) {
    whatsappButton.addEventListener('click', kirimWhatsApp);
  }
});

// Fungsi untuk setup event listeners
function setupEventListeners() {
  const produkList = ["jumbo", "lite", "big", "mini", "spr-jmbo", "produk-1", "produk-2"];
  
  produkList.forEach(produk => {
    // Event listener untuk input jumlah
    const inputJumlah = document.getElementById(produk);
    if (inputJumlah) {
      inputJumlah.addEventListener('input', function() {
        hitungSubtotal(produk);
      });
      inputJumlah.addEventListener('keyup', function() {
        hitungSubtotal(produk);
      });
      inputJumlah.addEventListener('change', function() {
        hitungSubtotal(produk);
      });
    }
    
    // Event listener untuk input harga
    const inputHarga = document.getElementById(`harga-${produk}`);
    if (inputHarga) {
      inputHarga.addEventListener('input', function() {
        hitungSubtotal(produk);
      });
      inputHarga.addEventListener('keyup', function() {
        hitungSubtotal(produk);
      });
      inputHarga.addEventListener('change', function() {
        hitungSubtotal(produk);
      });
    }
  });

  // Event listener untuk refund input
  const refundInput = document.getElementById("refund");
  if (refundInput) {
    refundInput.addEventListener('input', hitungTotal);
    refundInput.addEventListener('keyup', hitungTotal);
    refundInput.addEventListener('change', hitungTotal);
  }
}

// Keyboard shortcuts (hanya untuk reset)
document.addEventListener('keydown', function(e) {
  // Ctrl + R untuk reset
  if (e.ctrlKey && e.key === 'r') {
    e.preventDefault();
    resetForm();
  }
  
  // Enter untuk kirim WhatsApp jika fokus pada tombol
  if (e.key === 'Enter' && e.target.id === 'whatsapp-button') {
    e.preventDefault();
    kirimWhatsApp();
  }
});

// Fungsi untuk clear localStorage jika ada data lama
function clearOldData() {
  localStorage.removeItem('rekapanPenjualan');
  localStorage.removeItem('rekapanPenjualanAuto');
}

// Clear data lama saat aplikasi dimuat
clearOldData();

