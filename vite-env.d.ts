/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_GOOGLE_CLIENT_ID: string;
    // Add other environment variables here...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }