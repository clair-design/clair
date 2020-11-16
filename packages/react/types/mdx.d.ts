declare module "@mdx-js/react" {
  class MDXProvider extends React.Component<{
    [key: string]: React.ReactNode;
  }> {}
  export { MDXProvider };
}
