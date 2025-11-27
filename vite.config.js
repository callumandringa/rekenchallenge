import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
    build: {
        outDir: "dist",       // Output directory
        emptyOutDir: true,    // Clean before building
    },
    server: {
        hmr: {
            host: process.env.APP_URL
                ? process.env.APP_URL.replace(/^https?:\/\//, "")
                : "localhost",
        },
        cors: true,
    },
});
