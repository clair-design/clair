import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Layout, Header, Aside, Main, Footer } from "..";

describe("Layout", () => {
  test("basic two columns layout should work", () => {
    const { getByText, container } = render(
      <Layout>
        <Aside>Aside</Aside>
        <Main>Main</Main>
      </Layout>
    );

    const layout = container.firstChild as Element;
    const aside = getByText("Aside");
    const main = getByText("Main");

    expect(layout.classList.contains("c-layout"));
    expect(layout.classList.contains("c-layout--has-aside"));

    expect(aside.style.width).toBe("200px");
    expect(aside.classList.contains("c-layout__aside"));
    expect(aside.classList.contains("layout__aside--has-trigger")).toBe(false);

    expect(main.classList.contains("c-layout__main"));
  });

  test("nested layout should work", () => {
    const { getByText, container } = render(
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Aside>Aside</Aside>
          <Layout>
            <Main>Main</Main>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Layout>
    );

    const layout = container.firstChild as Element;
    const header = getByText("Header");
    const footer = getByText("Footer");
    const nestedLayout = layout.querySelector(".c-layout") as Element;

    expect(layout.classList.contains("c-layout--has-aside")).toBe(false);
    expect(header.classList.contains("c-layout__header"));
    expect(footer.classList.contains("c-layout__footer"));
    expect(nestedLayout.contains(footer));
  });

  test("aside can be collapsed by click/keypress", () => {
    const onCollapse = jest.fn();
    const { getByText, getByRole } = render(
      <Layout>
        <Aside collapsible collapsed onCollapse={onCollapse}>
          Aside
        </Aside>
        <Main>Main</Main>
      </Layout>
    );

    const aside = getByText("Aside");
    const trigger = getByRole("button");

    // inital states
    expect(aside.classList.contains("c-layout__aside--has-trigger"));
    expect(aside.classList.contains("c-layout__aside--collapsed"));

    // click on trigger
    expect(trigger);
    const calledWith = onCollapse.mock.calls;
    const getLastCallParam = () => calledWith.slice(-1)[0][0];
    fireEvent.click(trigger);
    expect(onCollapse).toHaveBeenCalled();
    expect(getLastCallParam()).toMatchObject({
      detail: { collapsed: false }
    });
    expect(aside.classList.contains("c-layout__aside--collapsed")).toBe(false);

    // focus on trigger and press Enter
    fireEvent.keyUp(trigger, { key: "Enter", code: 13 });
    expect(getLastCallParam()).toMatchObject({
      detail: { collapsed: true }
    });
    expect(aside.classList.contains("c-layout__aside--collapsed"));
  });

  test("aside should be fixed with fixed:true prop", () => {
    const { getByText } = render(
      <Layout>
        <Aside fixed>Aside</Aside>
        <Main>Main</Main>
      </Layout>
    );
    const aside = getByText("Aside");

    expect(aside.classList.contains("c-layout__aside--sticky"));
  });

  test("trigger can be customized", () => {
    const customTrigger = <div>Toggle</div>;
    const { getByText } = render(
      <Layout>
        <Aside collapsible trigger={customTrigger}>
          Aside
        </Aside>
        <Main>Main</Main>
      </Layout>
    );
    const trigger = getByText("Toggle");
    expect(trigger);
  });

  test("header should be fixed with fixed:true prop", () => {
    const { getByText } = render(
      <Layout>
        <Header fixed>Header</Header>
        <Main>Main</Main>
      </Layout>
    );
    const header = getByText("Header");

    expect(header.classList.contains("c-layout__aside--fixed"));
  });

  test("main area should be scrolled if header and aside are fixed", () => {
    const { getByText, container } = render(
      <Layout style={{ height: 240 }}>
        <Header fixed>Header</Header>
        <Layout>
          <Aside fixed>Aside</Aside>
          <Main>Main</Main>
        </Layout>
      </Layout>
    );

    const layout = container.firstChild as Element;
    const header = getByText("Header");
    const aside = getByText("Aside");

    expect(layout.classList.contains("c-layout--scroll-main"));
    expect(header.classList.contains("c-layout__header--fixed")).toBe(false);
    expect(aside.classList.contains("c-layout__aside--sticky")).toBe(false);
  });
});
