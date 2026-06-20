# Harmonic Watchlist Scanner Live - Web Based

Isi paket:

1. `harmonic-watchlist-scanner-live.html`  
   Versi HTML standalone. Bisa langsung dibuka di browser atau di-upload ke hosting static.

2. `HarmonicWatchlistScanner_LiveFreeAPIs.jsx`  
   Versi React component untuk project React/Vite.

3. `free-market-data-cors-proxy-worker.js`  
   Cloudflare Worker gratis untuk mengatasi CORS pada sumber non-crypto seperti Yahoo/Stooq.

## Cara pakai paling cepat

- Download `harmonic-watchlist-scanner-live.html`.
- Double click file tersebut di browser.
- Untuk crypto, Binance WebSocket akan mencoba update otomatis.
- Untuk forex/IDX, jika status masih default/delayed/gagal, deploy Worker lalu isi Proxy URL di tab `API & Realtime`.

## Cara deploy web gratis

### Netlify
- Login Netlify.
- Add new site > Deploy manually.
- Upload file `harmonic-watchlist-scanner-live.html`.
- Rename menjadi `index.html` jika ingin menjadi halaman utama.

### GitHub Pages
- Buat repo baru.
- Upload file dan rename menjadi `index.html`.
- Settings > Pages > Deploy from branch.

### Vercel
- Buat folder project.
- Masukkan file sebagai `index.html`.
- Deploy sebagai static site.

## Cloudflare Worker Proxy

- Login Cloudflare.
- Workers & Pages > Create Worker.
- Paste isi `free-market-data-cors-proxy-worker.js`.
- Deploy.
- Copy URL worker, misalnya `https://nama-worker.username.workers.dev/`.
- Buka scanner > tab `API & Realtime` > isi Proxy URL tersebut.

Catatan: feed gratis tidak menjamin tick realtime untuk semua market. Crypto paling stabil realtime karena Binance WebSocket. Forex/IDX gratis cenderung delayed/reference atau butuh proxy.
