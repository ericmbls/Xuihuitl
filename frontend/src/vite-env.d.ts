/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // aquí puedes agregar otras variables si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}