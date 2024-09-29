import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

export default defineConfig({
  test: {
    setupFiles: ["dotenv/config"],
  },
});
