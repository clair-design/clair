import React from "react";
import { configure, addParameters, storiesOf } from "@storybook/react";

import customTheme from "./theme";
import { Layout } from "./runtime/runtime";

function loadStories() {
  const registerRequests = request => {
    const keys = request.keys();
    const story = storiesOf("组件列表", module);

    for (let i = 0; i < keys.length; i++) {
      const mod = request(keys[i]);
      const { title } = mod.attributes;
      const Component = mod.default;
      story.add(title, () => (
        <Layout>
          <Component />
        </Layout>
      ));
    }
  };

  registerRequests(require.context("../examples/", true, /index.mdx$/));
}

addParameters({
  options: {
    theme: customTheme,
    showPanel: false,
    sidebarAnimations: true
  }
});

configure(loadStories, module);
