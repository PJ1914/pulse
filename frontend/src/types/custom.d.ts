// src/types/custom.d.ts
declare module '*.obj' {
    const value: string;
    export default value;
  }
  
  declare module '*.glb' {
    const src: string;
    export default src;
}

declare module '*.gltf' {
    const src: string;
    export default src;
}
