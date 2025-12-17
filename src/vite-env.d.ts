// src/declarations.d.ts (or similar)

// 1. Declare all .css files as modules that export nothing (or an empty object)
declare module '*.css' {
  // You can define what they export, but for simple imports, an empty module works:
  const content: any; 
  export default content; 
}

// Optional: If you use CSS Modules (.module.css)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  // It's often safer to just declare it as an empty module with no exported content
  // as you are just importing the file for side effects (like applying global styles).
}

// Ensure TypeScript can find the specific Swiper paths
// Although the generic *.css should cover it, explicitly declaring the paths can help:
declare module 'swiper/css';
declare module 'swiper/css/pagination';