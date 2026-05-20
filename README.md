# ✨ Taylor Swift - The Eras Journey Website

Situs fan yang indah dan interaktif untuk merayakan musik dan perjalanan karir Taylor Swift. Dibangun dengan HTML5, CSS3, dan Vanilla JavaScript.

## 🎯 Fitur Utama

### 📦 Konten & Interaktivitas

- **🎨 Galeri per Era** - Grid responsif menampilkan foto, musik video, dan konser dari setiap era Taylor Swift
  - Folklore, 1989, Midnights, Reputation, dan Lover
  - Deskripsi mendalam untuk setiap era
  - Hover effects yang smooth

- **📅 Timeline Karier Interaktif** - Garis waktu dari debut 2006 hingga The Eras Tour
  - 11 milestone penting dalam karir Taylor
  - Responsive design yang indah
  - Animasi saat scroll

- **🔍 Easter Egg Tracker** - Kumpulan easter eggs yang ditemukan fans
  - 6+ easter eggs dengan clue dan bukti
  - Interactive hidden egg finder
  - Pop-up modal untuk reveal secret messages

- **🎵 Playlist Embed** - Spotify playlist terintegrasi
  - Dengarkan lagu sambil jelajahi halaman
  - Responsive player

- **💝 Fan Corner** - Form untuk berbagi fan art, quotes, dan pesan
  - Menyimpan data di localStorage
  - Real-time message display
  - Validasi form

### 🎨 Desain & UX

- **🎭 Toggle Tema Era** - Ubah warna, font, dan accent sesuai era favorit
  - 5 era berbeda dengan tema unik
  - Smooth color transitions
  - Saved preference di localStorage

- **🌙 Dark/Light Mode** - Toggle tema dengan satu klik
  - Respects system preferences
  - Smooth transitions
  - Saved user preference

- **✨ Smooth Scroll & Micro-interactions** 
  - Smooth scroll navigation
  - Hover effects pada semua elemen interaktif
  - Card elevation effects
  - Loading animations

- **📱 Fully Responsive** - Optimal di mobile, tablet, dan desktop
  - Breakpoints untuk semua ukuran layar
  - Flexible grid layouts
  - Touch-friendly buttons

### ⚡ Interaktivitas Ringan

- **🎮 Guess The Lyric Quiz** - 10 pertanyaan tentang lirik Taylor
  - Score tracking
  - Progress bar visual
  - Personalized results message
  - Restart button

- **⏰ Countdown Timer** - Hitung mundur ke event spesial
  - Real-time update
  - Format DD:HH:MM:SS
  - Responsive layout

- **🎁 Hidden Easter Egg** - Klik area tersembunyi untuk menemukan secret message
  - Keyboard shortcut: Ctrl+G
  - Modal popup dengan fakta menarik
  - Smooth animations

### ♿ Aksesibilitas & SEO

- **Meta Tags** - Open Graph, Twitter Card, dan Social Media Preview
- **Image Optimization** - `loading="lazy"`, width/height attributes
- **Alt Text** - Semua gambar memiliki alt text deskriptif
- **Color Contrast** - Minimal 4.5:1 WCAG compliance
- **Keyboard Navigation** - Semua elemen dapat diakses dengan keyboard
- **ARIA Labels** - Proper ARIA attributes untuk screen readers
- **Semantic HTML** - Proper heading hierarchy dan semantic elements

## 🚀 Cara Menggunakan

### 1. Setup Awal

```html
<!-- Pastikan CDN links di-load dengan benar -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
```

### 2. File Structure

```
project/
├── index.html       # Main HTML file
├── styles.css       # CSS styling dan themes
├── script.js        # JavaScript functionality
├── manifest.json    # PWA manifest
└── assets/          # Gambar dan media (optional)
```

### 3. Kustomisasi

#### Mengubah Warna Era

Di `styles.css`, ubah variabel CSS:

```css
body.era-folklore {
    --ts-gold: #a8845a;
}

body.era-1989 {
    --ts-gold: #87ceeb;
}
```

#### Mengubah Quiz Questions

Di `script.js`, edit array `quizData`:

```javascript
const quizData = [
    {
        question: 'Pertanyaan kamu?',
        options: ['Opsi 1', 'Opsi 2', 'Opsi 3', 'Opsi 4'],
        correct: 0  // Index jawaban yang benar
    },
    // Tambah lebih banyak pertanyaan...
];
```

#### Mengubah Countdown Date

Di `script.js`, ubah target date:

```javascript
const targetDate = new Date('2025-12-31T23:59:59').getTime();
```

#### Mengubah Gallery Content

Di `index.html`, ubah section gallery untuk menambah/mengubah galeri:

```html
<div class="col-md-4 mb-4">
    <div class="gallery-card">
        <div class="gallery-img-wrapper">
            <img src="YOUR_IMAGE_URL" alt="Deskripsi">
            <div class="gallery-overlay"><p>Caption</p></div>
        </div>
        <div class="gallery-body">
            <h5>Judul</h5>
            <p>Deskripsi singkat</p>
        </div>
    </div>
</div>
```

## 🎨 Tema & Warna

### Era Color Scheme

| Era | Primary Color | Style | Mood |
|-----|---------------|-------|------|
| Folklore | #a8845a | Serif | Earthy, Warm |
| 1989 | #87ceeb | Sans | Pastel, Bright |
| Midnights | #667eea | Sans | Dark, Moody |
| Reputation | #1a1a2e | Sans | Bold, Dark |
| Lover | #ffb6d9 | Sans | Colorful, Joy |

## 📱 Responsive Breakpoints

```css
Desktop: > 992px
Tablet:  768px - 991px
Mobile:  576px - 767px
Small Mobile: < 576px
```

## 🔧 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance Tips

1. **Images** - Konversi ke WebP format untuk performa lebih baik
2. **Lazy Loading** - Gambar otomatis lazy-loaded
3. **Minification** - Minify CSS dan JS di production
4. **Caching** - Gunakan browser caching headers
5. **CDN** - Serve assets dari CDN untuk kecepatan global

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### GitHub Pages

1. Push ke repository
2. Settings → Pages → Select `main` branch
3. Selesai!

### Traditional Hosting

1. Upload semua file ke host provider
2. Ensure `.htaccess` untuk URL rewriting (jika perlu)
3. Test di production environment

## 🔐 Privacy & Security

- **Form Data** - Disimpan di localStorage user browser (tidak dikirim server)
- **No Tracking** - Tidak ada tracking default (opsional Google Analytics)
- **HTTPS** - Gunakan HTTPS di production
- **XSS Prevention** - Data di-sanitize sebelum display

## 📈 Analytics Integration (Optional)

Untuk mengaktifkan Google Analytics:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎓 Learning Resources

- [HTML5 Best Practices](https://www.w3.org/TR/html5/)
- [CSS3 Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [JavaScript Modern Syntax](https://javascript.info/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [Web Accessibility](https://www.w3.org/WAI/fundamentals/)

## 🤝 Contributing

Ingin berkontribusi? Fork repository dan submit pull request!

### Areas untuk Improvement

- [ ] Tambah lebih banyak gallery items
- [ ] Tambah lebih banyak quiz questions
- [ ] Improve mobile responsiveness
- [ ] Tambah more easter eggs
- [ ] Implementasi backend untuk fan messages
- [ ] Tambah merchandise gallery
- [ ] Tour dates integration
- [ ] Fan theories section

## 📝 License

Proyek ini dibuat untuk keperluan edukasi dan fan appreciation. Bukan website resmi Taylor Swift.

## 💬 Feedback & Suggestions

Punya feedback atau saran? Silakan buka issue atau hubungi dev!

## 🎵 Fun Fact

Website ini dibuat dengan cinta oleh Swiftie untuk Swifties! 💕

Terima kasih telah mengunjungi The Eras Journey Website!

---

**Made with ✨ and 💕 for Taylor Swift fans everywhere**

Semoga menikmati! 🎉
