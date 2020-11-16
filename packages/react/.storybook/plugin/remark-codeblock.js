const visit = require("unist-util-visit");
const { transformSync } = require("@babel/core");
const LANG_LIST = ["jsx", "tsx"];
module.exports = () => (tree, file) => {
  visit(tree, "code", node => {
    const { value, lang } = node;
    if (!LANG_LIST.includes(lang.toLowerCase())) {
      return;
    }
    const index = tree.children.indexOf(node);

    const jsxTransformed = transformSync(value, {
      presets: [
        [
          "@babel/preset-react",
          {
            pragma: "h"
          }
        ]
      ]
    }).code;

    tree.children[index] = {
      ...node,
      meta: `${node.meta} compiled=${jsxTransformed}`
    };
  });
};
