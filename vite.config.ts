import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: true, // ou '0.0.0.0' para aceitar todas as conexões
  //   allowedHosts: [
  //     "five-pioneer-coupon-enlarge.trycloudflare.com", // seu domínio Cloudflare
  //     ".trycloudflare.com", // ou permita todos subdomínios Cloudflare
  //   ],
  //   // Opcional: para desenvolvimento seguro
  //   hmr: {
  //     clientPort: 443, // ajuda com WebSocket em túneis HTTPS
  //   },
  // },
});
