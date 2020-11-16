import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Pagination } from "..";

describe("Pagination", () => {
  test("handle 'total' properly", () => {
    const { container } = render(<Pagination total={500} />);
    const pages = container.querySelectorAll(".c-pagination__page");

    const lastPage = pages[pages.length - 1];
    expect(lastPage.textContent).toBe("50");
  });

  test("handle 'current' properly", () => {
    const current = 5;
    const { container } = render(<Pagination total={500} current={current} />);
    const page = container.querySelector(
      ".c-pagination__page--active"
    ) as Element;

    expect(page.textContent).toBe(current.toString());
  });

  test("handle 'pageSize' properly", () => {
    const pageSize = 5;
    const total = 499;
    const totalPage = Math.ceil(total / pageSize);
    const { container } = render(
      <Pagination total={total} pageSize={pageSize} />
    );

    const pages = container.querySelectorAll(".c-pagination__page");

    const lastPage = pages[pages.length - 1];
    expect(lastPage.textContent).toBe(totalPage.toString());
  });

  test("handle click event", () => {
    const onChange = jest.fn(
      ({ detail: { page, pageSize } }) => `current:${page},pageSize:${pageSize}`
    );
    const current = 5;
    const pageSize = 20;
    const total = 500;
    const totalPage = Math.ceil(total / pageSize);
    const { container } = render(
      <Pagination
        total={total}
        onChange={onChange}
        current={current}
        pageSize={pageSize}
      />
    );
    const prevPage = container.querySelector(".c-pagination__prev") as Element;
    const nextPage = container.querySelector(".c-pagination__next") as Element;
    const pages = container.querySelectorAll(".c-pagination__page");
    const lastPage = pages[pages.length - 1];

    fireEvent.click(nextPage);
    expect(onChange).toHaveReturnedWith(
      `current:${current + 1},pageSize:${pageSize}`
    );

    fireEvent.click(prevPage);
    expect(onChange).toHaveReturnedWith(
      `current:${current},pageSize:${pageSize}`
    );

    fireEvent.click(lastPage);
    expect(onChange).toHaveReturnedWith(
      `current:${totalPage},pageSize:${pageSize}`
    );
  });

  test("click ellipsis page", () => {
    const current = 10;
    const span = 3;
    const step = span * 2 + 1;
    const { container } = render(
      <Pagination total={500} current={current} span={span} />
    );

    const [prev, next] = Array.from(
      container.querySelectorAll(".c-pagination__ellipsis")
    );

    fireEvent.click(prev);
    expect(
      (container.querySelector(".c-pagination__page--active") as Element)
        .textContent
    ).toBe((current - step).toString());

    fireEvent.click(next);
    expect(
      (container.querySelector(".c-pagination__page--active") as Element)
        .textContent
    ).toBe(current.toString());
  });

  test("handle 'hideOnSinglePage' properly", () => {
    const { container, rerender } = render(
      <Pagination total={500} hideOnSinglePage={true} />
    );

    expect(
      (container.firstChild as Element).classList.contains(
        "c-pagination--hidden"
      )
    ).toBe(false);

    rerender(<Pagination total={1} hideOnSinglePage={true} />);

    expect(
      (container.firstChild as Element).classList.contains(
        "c-pagination--hidden"
      )
    ).toBe(true);
  });
  test("handle 'span' properly", () => {
    const span = 4;
    const current = span * 2 + 1;
    const { container } = render(
      <Pagination current={current} total={500} span={4} />
    );

    const pages = container.querySelectorAll(".c-pagination__page");

    expect(pages.length).toBe(current + 2);
  });
  test("handle 'layout' properly", () => {
    const { container } = render(
      <Pagination total={500} layout="jumper,pages,jumper,total,total,total" />
    );

    const jumper = container.querySelectorAll(".c-pagination__jump");
    const total = container.querySelectorAll(".c-pagination__total");

    expect(jumper.length).toBe(1);
    expect(total.length).toBe(1);
    expect(jumper[0]!.nextElementSibling!.nextElementSibling).toBe(total[0]);
  });

  test("input on jumper with valid value", () => {
    const onChange = jest.fn(({ detail: { page } }) => page);
    const { container } = render(
      <Pagination total={500} layout="pages,jumper" onChange={onChange} />
    );
    const input = container.querySelector("input") as HTMLInputElement;
    const validValue = 10;

    fireEvent.change(input, {
      target: { value: validValue }
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13
    });

    expect(onChange).toHaveReturnedWith(validValue);
    expect(
      (container.querySelector(".c-pagination__page--active") as Element)
        .textContent
    ).toBe(validValue.toString());
  });

  test("input on jumper with invalid value", () => {
    const total = 500;
    const pageSize = 10;
    const totalPage = Math.ceil(total / pageSize);
    const onChange = jest.fn(({ detail: { page } }) => page);
    const { container } = render(
      <Pagination
        total={total}
        pageSize={pageSize}
        layout="pages,jumper"
        onChange={onChange}
      />
    );
    const input = container.querySelector("input") as Element;

    // input string
    const invalidValue1 = "abcdefg";
    fireEvent.change(input, {
      target: { value: invalidValue1 }
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13
    });

    expect(onChange).not.toHaveBeenCalled();

    // input more than total page
    const invalidValue2 = totalPage + 1;
    fireEvent.change(input, {
      target: { value: invalidValue2 }
    });
    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13
    });

    expect(onChange).toHaveReturnedWith(totalPage);
    expect(
      (container.querySelector(".c-pagination__page--active") as Element)
        .textContent
    ).toBe(totalPage.toString());

    //input less than one page
    const invalidValue3 = -1;
    fireEvent.change(input, {
      target: { value: invalidValue3 }
    });
    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13
    });

    expect(onChange).toHaveReturnedWith(1);
    expect(
      (container.querySelector(".c-pagination__page--active") as Element)
        .textContent
    ).toBe("1");
  });

  test("use small size", () => {
    const { container } = render(<Pagination total={500} size="small" />);

    expect(
      (container.firstChild as Element).classList.contains(
        "c-pagination--small"
      )
    ).toBe(true);
  });

  test("use simple style", () => {
    const onChange = jest.fn(({ detail: { page } }) => page);
    const current = 10;
    const { container } = render(
      <Pagination
        total={500}
        current={current}
        simple={true}
        onChange={onChange}
      />
    );

    const prevPage = container.querySelector(".c-pagination__prev") as Element;
    const nextPage = container.querySelector(".c-pagination__next") as Element;

    expect(
      (container.firstChild as Element).classList.contains(
        "c-pagination--simple"
      )
    ).toBe(true);

    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.click(nextPage);
    expect(input.value).toBe((current + 1).toString());

    fireEvent.click(prevPage);
    expect(input.value).toBe(current.toString());
  });

  test("input on simple pagination with valid value", () => {
    const onChange = jest.fn(({ detail: { page } }) => page);
    const { container } = render(
      <Pagination total={500} simple={true} onChange={onChange} />
    );
    const input = container.querySelector("input") as HTMLInputElement;
    const validValue = 34;
    fireEvent.change(input, {
      target: {
        value: validValue
      }
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13
    });

    expect(onChange).toHaveReturnedWith(validValue);
  });

  test("input on simple pagination with invalid value", () => {
    const onChange = jest.fn(({ detail: { page } }) => page);
    const pageSize = 10;
    const total = 500;
    const totalPage = Math.ceil(total / pageSize);
    const { container } = render(
      <Pagination
        total={total}
        pageSize={pageSize}
        simple={true}
        onChange={onChange}
      />
    );
    const input = container.querySelector("input") as HTMLInputElement;

    // input string
    const invalidValue1 = "abcdefg";
    fireEvent.change(input, {
      target: {
        value: invalidValue1
      }
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13
    });

    expect(onChange).not.toHaveBeenCalled();

    // input more than total page
    const invalidValue2 = totalPage + 1;
    fireEvent.change(input, {
      target: {
        value: invalidValue2
      }
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13
    });

    expect(onChange).toHaveReturnedWith(totalPage);

    // input less than one page
    const invalidValue3 = -1;
    fireEvent.change(input, {
      target: {
        value: invalidValue3
      }
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: 13
    });

    expect(onChange).toHaveReturnedWith(1);
  });

  test("blur on simple pagination", () => {
    const onChange = jest.fn();
    const current = 10;
    const { container } = render(
      <Pagination total={500} simple={true} current={current} />
    );
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        value: 1
      }
    });

    fireEvent.blur(input);

    expect(input.value).toBe(current.toString());
    expect(onChange).not.toBeCalled();
  });
});
