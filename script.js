/* Navbar Active Effect */
const list = document.querySelectorAll(".list");

function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}

list.forEach((item) => item.addEventListener("click", activeLink));

/* Page Switch */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  if (pageId === "scan") {
    startScanner();
  }
}

/* Generate QR */
function generateQR() {
  let text = document.getElementById("qrText").value;
  let qrDiv = document.getElementById("qrcode");
  let downloadBtn = document.getElementById("downloadBtn");

  qrDiv.innerHTML = "";
  downloadBtn.style.display = "none";

  if (text.trim() === "") {
    alert("Enter something first!");
    return;
  }

  // Create QR
  let qr = new QRCode(qrDiv, {
    text: text,
    width: 200,
    height: 200,
  });

  // Wait then enable download
  setTimeout(() => {
    let img = qrDiv.querySelector("img");

    if (img) {
      downloadBtn.href = img.src;
      downloadBtn.style.display = "inline-block";
    }
  }, 300);
}


/* Scanner */
function startScanner() {
  let resultText = document.getElementById("scanResult");

  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },

    (decodedText) => {
      resultText.innerHTML = "✅ Scanned: " + decodedText;
      html5QrCode.stop();
    },

    (error) => {}
  );
}
/* Scan QR From Uploaded Image */
function scanFromImage() {

  let fileInput = document.getElementById("qrImage");
  let resultText = document.getElementById("scanResult");

  if (fileInput.files.length === 0) {
    alert("Please select an image first!");
    return;
  }

  const file = fileInput.files[0];

  const html5QrCode = new Html5Qrcode("reader");

  html5QrCode.scanFile(file, true)
    .then(decodedText => {
      resultText.innerHTML = "✅ Scanned From Image: " + decodedText;
    })
    .catch(err => {
      resultText.innerHTML = "❌ No QR Code found in image!";
    });
}
