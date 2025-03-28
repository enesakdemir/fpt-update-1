const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// 🔧 Büyük veriler için limit yükseltildi (JSON yük boyutu limiti 10mb)
app.use(bodyParser.json({ limit: '10mb' }));

// Statik dosyaları sun
app.use(express.static(path.join(__dirname)));

// 📩 JSON kaydetme endpoint'i
app.post('/save-json', (req, res) => {
    const jsonData = req.body;

    // Veriyi filtrele (boş alanları önle + string sayıları parse et)
    const filteredData = jsonData.map(item => ({
        partNumber: item.partNumber || "",
        partName: item.partName || "",
        stock: parseInt(item.stock || 0)
    }));

    // JSON'u dosyaya yaz
    fs.writeFile(path.join(__dirname, 'dataStock.json'), JSON.stringify(filteredData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Veri kaydedilirken hata oluştu:', err);
            return res.status(500).json({ success: false, message: 'Kayıt hatası' });
        }
        res.json({ success: true, message: 'Veri başarıyla kaydedildi' });
    });
});

// 🛡️ Basit login endpoint'i
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "enes" && password === "e1n?es") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// 🚀 Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
