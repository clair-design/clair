import React, { ReactElement, useState } from "react";
import {
  cleanup,
  fireEvent,
  getAllByRole as getAllByRoleWithin,
  getAllByText,
  render
} from "@testing-library/react";
import { Option, OptionGroup, Select } from "@components/Select";
import { overrideError } from "@src/utils";
import { advanceTimersByTime } from "@utils/lib/testOnly/lib/advanceTimersByTime";
import { SelectProps } from "@components/Select/lib/types";

// mock timer
// using non-point style to avoid ts error
beforeAll(() => jest.useFakeTimers());
afterAll(jest.useRealTimers);
afterEach(cleanup);

const DELAY = 100;
describe("[Select] basics", () => {
  test("is created correctly", () => {
    const { getByRole, getByText } = render(<Select></Select>);
    const comb = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    expect(comb).toHaveClass("c-select c-select--normal");
    expect(comb).toHaveAttribute("aria-expanded", "false");
    expect(listbox).toHaveClass("c-select__dropdown");
    expect(listbox).toHaveAttribute("aria-hidden", "true");
    expect(listbox.style.display).toBe("none");
    expect(() => getByText("无数据")).not.toThrow();
  });

  test("keyboard to toggle visibility", async () => {
    const { getByRole } = render(<Select></Select>);
    const comb = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    expect(listbox.style.display).toBe("none");
    fireEvent.click(comb);
    advanceTimersByTime(DELAY);
    expect(listbox.style.display).toBe("block");
    fireEvent.click(comb);
    advanceTimersByTime(DELAY);
    expect(listbox.style.display).toBe("none");

    fireEvent.keyDown(comb, { key: "Enter" });
    expect(listbox.style.display).toBe("block");
    fireEvent.keyDown(comb, { key: "Esc" });
    advanceTimersByTime(DELAY);
    expect(listbox.style.display).toBe("none");
  });

  test("keyboard to select and emit correct event args", () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const { getByRole } = render(
      <Select onChange={onChange} onBlur={onBlur}>
        <Option value="1" label="option-1" />
        <Option value="2" label="option-2" />
      </Select>
    );
    const comb = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    fireEvent.focus(comb);
    fireEvent.keyDown(comb, { key: "Enter" });
    expect(listbox.style.display).toBe("block");
    fireEvent.keyDown(comb, { key: "ArrowDown" });
    const options = getAllByRoleWithin(listbox, "option");
    expect(options[0]).toHaveClass("c-select__option--active");
    fireEvent.keyDown(comb, { key: "Enter" });
    expect(onChange).toHaveBeenCalledTimes(1);
    const [lastChangeArg] = onChange.mock.calls.pop();
    expect(lastChangeArg).toMatchObject({
      target: {
        value: "1"
      }
    });
    fireEvent.blur(comb);
    expect(onBlur).toHaveBeenCalledTimes(1);
    const [lastBlurArg] = onBlur.mock.calls.pop();
    expect(lastBlurArg).toMatchObject({
      target: {
        value: "1"
      }
    });
    fireEvent.focus(comb);
    fireEvent.keyDown(comb, { key: "Enter" });
    expect(options[0]).toHaveClass("c-select__option--active");
    fireEvent.keyDown(comb, { key: "ArrowUp" });
    expect(options[1]).toHaveClass("c-select__option--active");
  });
});

describe("[select] disabled", () => {
  test("disabled select", () => {
    const { getByRole } = render(<Select disabled></Select>);
    const comb = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    expect(comb).toHaveAttribute("aria-disabled", "true");
    expect(comb).toHaveClass("c-select--disabled");

    fireEvent.click(comb);
    expect(listbox.style.display).toBe("none");
  });
});

describe("[Select] with option", () => {
  test("option create", () => {
    const { getByRole, getByText } = render(
      <Select value={"葡萄"}>
        <Option value="葡萄" label="葡萄"></Option>
        <Option value="桃子" label="桃子"></Option>
        <Option value="苹果" label="苹果" disabled></Option>
      </Select>
    );
    // const comb = getByRole('combobox');
    const listbox = getByRole("listbox", { hidden: true });
    const apple = getByText("苹果");
    const grape = getByText("葡萄");
    expect(listbox.children.length).toBe(3);
    expect(apple).toHaveClass("c-select__option--disabled");
    expect(grape).toHaveClass("c-select__option--selected");
  });
  test("option keyboard event", () => {
    const { getByRole, getByText } = render(
      // @ts-ignore
      <Select>
        <Option value="葡萄" label="葡萄"></Option>
        <Option value="桃子" label="桃子"></Option>
        <Option value="苹果" label="苹果" disabled></Option>
      </Select>
    );
    const comb = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    const peach = getByText("桃子");
    const grape = getByText("葡萄");
    fireEvent.click(comb);
    expect(listbox.style.display).toBe("block");
    // first element should gain active state after ArrowDown
    fireEvent.keyDown(comb, { key: "ArrowDown" });
    expect(grape).toHaveClass("c-select__option--active");
    fireEvent.click(document.body);
    fireEvent.click(comb);
    fireEvent.mouseEnter(grape);
    expect(grape).toHaveClass("c-select__option--active");
    fireEvent.keyDown(comb, { key: "ArrowDown" });
    expect(peach).toHaveClass("c-select__option--active");
    fireEvent.keyDown(comb, { key: "ArrowDown" });
    expect(grape).toHaveClass("c-select__option--active");
    fireEvent.keyDown(comb, { key: "ArrowUp" });
    expect(peach).toHaveClass("c-select__option--active");
    fireEvent.keyDown(comb, { key: "ArrowUp" });
    expect(grape).toHaveClass("c-select__option--active");
    fireEvent.mouseEnter(peach);
    expect(peach).toHaveClass("c-select__option--active");
    fireEvent.keyDown(comb, { key: "Enter" });
    advanceTimersByTime(DELAY);
    expect(peach).toHaveClass("c-select__option--selected");
    expect(listbox.style.display).toBe("none");
  });
});

describe("[Multiple Select] with option", () => {
  let SelectComponent: ReactElement;
  beforeEach(() => {
    SelectComponent = (
      <Select multiple>
        <Option value="1" label="option-1"></Option>
        <Option value="2" label="option-2"></Option>
        <Option value="3" label="option-3"></Option>
      </Select>
    );
  });
  test("multiple option create", () => {
    const { getByRole, getByText } = render(
      <Select multiple>
        <Option value="葡萄" label="葡萄"></Option>
        <Option value="桃子" label="桃子"></Option>
        <Option value="苹果" label="苹果" disabled></Option>
      </Select>
    );
    const comb = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    const apple = getByText("苹果");
    const peach = getByText("桃子");
    const grape = getByText("葡萄");
    expect(listbox.children.length).toBe(3);
    expect(apple).toHaveClass("c-select__option--disabled");
    fireEvent.click(comb);
    fireEvent.click(apple);
    fireEvent.click(grape);
    fireEvent.click(peach);

    expect(apple).toHaveClass("c-select__option--disabled");
    expect(grape).toHaveClass("c-select__option--selected");
    expect(peach).toHaveClass("c-select__option--selected");
  });
  test("option display in order of selection", () => {
    const { getByRole } = render(SelectComponent);
    const combobox = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    const options = getAllByText(listbox, /option/);
    fireEvent.click(combobox);
    fireEvent.click(options[1]);
    fireEvent.click(options[0]);
    const tags = getAllByText(combobox, /option/);
    expect(tags[0].textContent).toBe("option-2");
    expect(tags[1].textContent).toBe("option-1");
  });
  test("toggle option selected state", () => {
    const { getByRole } = render(SelectComponent);
    const combobox = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    const options = getAllByText(listbox, /option/);
    fireEvent.click(combobox);
    fireEvent.click(options[0]);
    const tags = getAllByText(combobox, /option/);
    expect(tags.length).toBe(1);
    expect(tags[0].textContent).toBe("option-1");
    fireEvent.click(options[0]);
    // testing library will throw error if it cannot find any targeting elements
    expect(() => getAllByText(combobox, /option/)).toThrowError();
  });
  test("remove selected option won't open option panel", () => {
    const { getByRole } = render(SelectComponent);
    const combobox = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    const options = getAllByText(listbox, /option/);
    fireEvent.click(combobox);
    fireEvent.click(options[0]);
    fireEvent.click(options[1]);
    fireEvent.click(combobox);
    advanceTimersByTime(DELAY);
    expect(listbox.style.display).toBe("none");
    // panel is still display: none;
    const closeButtons = getAllByRoleWithin(combobox, "button");
    fireEvent.click(closeButtons[0]);
    const tagsLeft = getAllByText(combobox, /option/);
    expect(tagsLeft.length).toBe(1);
    expect(listbox.style.display).toBe("none");
  });
});

describe("[Group Select] with option", () => {
  test("group create", () => {
    const { getAllByText } = render(
      <Select>
        <OptionGroup title="group1">
          <Option value="葡萄" label="葡萄"></Option>
          <Option value="桃子" label="桃子"></Option>
        </OptionGroup>
        <OptionGroup title="group2">
          <Option value="苹果" label="苹果" disabled></Option>
        </OptionGroup>
      </Select>
    );
    const groups = getAllByText(/group/);
    expect(groups.length).toBe(2);
  });
});

describe("[Clearable Select] with option", () => {
  test("clearable props", () => {
    const { getByRole, getByText } = render(
      <Select clearable>
        <Option value="葡萄" label="葡萄"></Option>
        <Option value="桃子" label="桃子"></Option>
        <Option value="苹果" label="苹果" disabled></Option>
      </Select>
    );
    const comb = getByRole("combobox");
    const grape = getByText("葡萄");
    fireEvent.click(comb);
    fireEvent.click(grape);

    expect(grape).toHaveClass("c-select__option--selected");

    fireEvent.mouseEnter(comb);

    const svg = comb.querySelector(".c-icon--svg");
    expect(svg).toHaveClass("c-icon--svg-circle");
    fireEvent.click(svg as Element);

    expect(grape).not.toHaveClass("c-select__option--selected");
  });
});

describe("[Filterable Select] with option", () => {
  test("filterable props", () => {
    const { getByRole } = render(
      <Select filterable>
        <Option value="葡萄">
          <div>
            grape<div>葡萄</div>
          </div>
        </Option>
        <Option value="桃子" label="桃子"></Option>
        <Option value="苹果" label="苹果" disabled></Option>
      </Select>
    );
    const comb = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    fireEvent.click(comb);
    const input = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "t" } });
    advanceTimersByTime(DELAY);
    expect(listbox.querySelectorAll(".c-select__option--empty").length).toBe(1);
    fireEvent.change(input, { target: { value: "葡萄" } });
    const filteredOptions = getAllByRoleWithin(listbox, "option");
    expect(filteredOptions.length).toBe(1);
    fireEvent.click(comb);
    advanceTimersByTime(DELAY);
    expect(listbox.style.display).toBe("none");
    // close and open again, all options should display
    fireEvent.click(comb);
    const options = getAllByRoleWithin(listbox, "option");
    expect(options.length).toBe(3);
  });
});

describe("[Filter Select] with function", () => {
  test("filterable props", () => {
    function Search() {
      const options = [
        { value: "orange", label: "🍊 橘子" },
        { value: "pear", label: "🍐 梨" },
        { value: "banana", label: "🍌 香蕉" },
        { value: "watermelon", label: "🍉 西瓜" },
        { value: "pineapple", label: "🍍 菠萝" },
        { value: "cantaloupe", label: "🍈 哈密瓜" }
      ];
      const [loading, updateLoading] = React.useState(false);
      const [filteredOptions, updateFilteredOptions] = React.useState(options);
      const onSearch: SelectProps["onSearch"] = ({ detail: { query } }) => {
        if (!query) {
          return updateFilteredOptions(options);
        }
        updateLoading(true);
        setTimeout(() => {
          updateLoading(false);
          updateFilteredOptions(
            options.filter(option => option.label.indexOf(query) > -1)
          );
        }, 800);
      };
      return (
        <Select async={true} loading={loading} onSearch={onSearch}>
          {filteredOptions.map(option => (
            <Option key={option.value} {...option} />
          ))}
        </Select>
      );
    }
    const { getByRole } = render(<Search />);
    const comb = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });

    const input = comb.querySelector(".c-input") as HTMLInputElement;
    expect(listbox.querySelectorAll(".c-select__option").length).toBe(6);
    fireEvent.change(input, { target: { value: "橘子" } });
    advanceTimersByTime(DELAY);
    expect(listbox.querySelectorAll(".c-select__option--empty").length).toBe(1);
    advanceTimersByTime(1000);
    expect(listbox.querySelectorAll(".c-select__option").length).toBe(1);
  });
});

describe("[Select] with non-option", () => {
  let recover: Function;
  beforeAll(() => {
    recover = overrideError();
  });
  afterAll(() => recover());
  test("case error", () => {
    expect(() =>
      render(
        <Select>
          <div></div>
        </Select>
      )
    ).toThrow();
  });
});

describe("[Select] with value", () => {
  test("do not change", () => {
    const cb = jest.fn();
    const { getByRole, getByText } = render(
      <Select value="葡萄" onChange={cb}>
        <Option value="葡萄" label="葡萄"></Option>
        <Option value="桃子" label="桃子"></Option>
        <Option value="苹果" label="苹果"></Option>
      </Select>
    );
    const comb = getByRole("combobox");
    const grape = getByText("葡萄");
    const peach = getByText("桃子");
    expect(grape).toHaveClass("c-select__option--selected");
    fireEvent.click(comb);
    fireEvent.click(peach);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(grape).toHaveClass("c-select__option--selected");
  });

  test("controlled", () => {
    const fn = jest.fn();
    const App = () => {
      const [value, setValue] = useState("");
      const onChange: SelectProps["onChange"] = e => {
        setValue(e.target.value);
        fn(e.target.value);
      };
      return (
        <Select value={value} onChange={onChange}>
          <Option value="葡萄" label="option-葡萄"></Option>
          <Option value="桃子" label="option-桃子"></Option>
          <Option value="苹果" label="option-苹果"></Option>
        </Select>
      );
    };
    const { getByRole } = render(<App />);
    const combobox = getByRole("combobox");
    const listbox = getByRole("listbox", { hidden: true });
    const options = getAllByRoleWithin(listbox, "option", { hidden: true });
    fireEvent.click(combobox);
    fireEvent.click(options[0]);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("葡萄");
    const input = getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("option-葡萄");
  });
});
