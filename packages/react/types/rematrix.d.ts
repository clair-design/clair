declare module "rematrix" {
  function fromString(source: string): [number, number, number, number];
  function format(
    source: any[]
  ): [number, number, number, number, number, number];
  export { fromString, format };
}
