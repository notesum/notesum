declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.rs" {
    export function add(a: number, b: number): number;
}
