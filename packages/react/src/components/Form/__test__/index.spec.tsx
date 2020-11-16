import React from "react";
import {
  render,
  getByPlaceholderText,
  fireEvent
} from "@testing-library/react";
import {
  Form,
  FormItem,
  Checkbox,
  CheckboxGroup,
  Button,
  Controller,
  useForm,
  ErrorMessage
} from "@src/index";
import { overrideError } from "@src/utils";
import { formNativeFieldElementTypeList } from "../lib/utils";

const sleep = (time: number = 0) =>
  new Promise(resolve => setTimeout(resolve, time));

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
});

describe("Form", () => {
  test("Form basic structure", () => {
    const { container } = render(<Form>test</Form>);
    const rightHTMLStr = '<form class="c-form c-form--label-right">test</form>';
    expect(container.innerHTML === rightHTMLStr).toBe(true);
  });

  test("Form className property", () => {
    const { container } = render(<Form className="testform">test</Form>);
    expect(container.firstChild.className.indexOf("testform") !== -1).toBe(
      true
    );
  });

  test("Form style property", () => {
    const { container } = render(<Form style={{ color: "white" }}>test</Form>);
    const hasStyle = container.firstChild.style.color === "white";
    expect(hasStyle).toBe(true);
  });

  test("Form inline property", () => {
    const { container, rerender } = render(<Form inline={true}>test</Form>);
    expect(
      container.firstChild.className.indexOf(`c-form--inline`) !== -1
    ).toBe(true);
    rerender(<Form>test</Form>);
    expect(
      container.firstChild.className.indexOf(`c-form--inline`) !== -1
    ).toBe(false);
  });

  test("Form defaultValue property", () => {
    const defaultValue = {
      projectName: "abc",
      projectAttr: ["2"],
      phoneNumber: "177",
      projectDesc: "666",
      projectRule: true
    };
    render(
      <Form defaultValue={defaultValue}>
        <FormItem
          name="projectName"
          as="input"
          className="field0"
          placeholder="请输入名称"
          label="项目名称"
        />
        <FormItem
          name="projectAttr"
          className="field1"
          as={
            <CheckboxGroup>
              <Checkbox value="1">大数据</Checkbox>
              <Checkbox value="2">高科技</Checkbox>
              <Checkbox value="3">城市安全</Checkbox>
            </CheckboxGroup>
          }
          label="项目属性"
        />
        <FormItem
          className="field2"
          name="phoneNumber"
          as="input"
          label="联系电话"
          placeholder="请输入电话"
        />
        <FormItem
          name="projectDesc"
          className="field3"
          as="textarea"
          label="项目说明"
          placeholder="请输入内容"
        />
        <FormItem
          name="projectRule"
          className="field4"
          as={<Checkbox>我已阅读免责条例</Checkbox>}
          label="免责条例"
          valueName="checked"
        />
      </Form>
    );

    expect(document.querySelector(".field0").value).toBe("abc");
    expect(
      document
        .querySelector(".field1  input:checked")
        .parentNode.innerHTML.includes("高科技")
    ).toBe(true);
    expect(document.querySelector(".field2").value).toBe("177");
    expect(document.querySelector(".field3").value).toBe("666");
    expect(document.querySelector(".field4 input:checked")).toBeDefined();
  });

  test("Form labelPosition property", () => {
    const { container, rerender } = render(
      <Form labelPosition="left">test</Form>
    );
    expect(
      container.firstChild.className.indexOf(`c-form--label-left`) !== -1
    ).toBe(true);
    rerender(<Form labelPosition="top">test</Form>);
    expect(
      container.firstChild.className.indexOf(`c-form--label-top`) !== -1
    ).toBe(true);
    rerender(<Form labelPosition="right">test</Form>);
    expect(
      container.firstChild.className.indexOf(`c-form--label-right`) !== -1
    ).toBe(true);
    rerender(<Form>test</Form>);
    expect(
      container.firstChild.className.indexOf(`c-form--label-right`) !== -1
    ).toBe(true);
  });

  test("Form labelWidth property", () => {
    render(
      <Form labelWidth={80}>
        <FormItem name="test" label="me" as="input" />
      </Form>
    );
    const hasStyle =
      document.querySelector(".c-form-item__label").style.width === "80px";
    expect(hasStyle).toBe(true);
  });

  test("Form object ref", () => {
    const ref = React.createRef({});

    render(
      <Form labelWidth={80} ref={ref}>
        <FormItem name="test" label="me" as="input" />
      </Form>
    );

    expect(ref.current.getValue).toBeDefined();
    expect(ref.current.setValue).toBeDefined();
    expect(ref.current.reset).toBeDefined();
    expect(ref.current.control).toBeDefined();
    expect(ref.current.setDefaultValue).toBeDefined();
    expect(ref.current.validate).toBeDefined();
  });

  test("Form function ref", () => {
    let formIns;

    render(
      <Form labelWidth={80} ref={ins => (formIns = ins)}>
        <FormItem name="test" label="me" as="input" />
      </Form>
    );

    expect(formIns.getValue).toBeDefined();
    expect(formIns.setValue).toBeDefined();
    expect(formIns.reset).toBeDefined();
    expect(formIns.control).toBeDefined();
    expect(formIns.setDefaultValue).toBeDefined();
    expect(formIns.validate).toBeDefined();
  });

  test("Form function ref", () => {
    let formIns;

    render(
      <Form labelWidth={80} ref={ins => (formIns = ins)}>
        <FormItem name="test" label="me" as="input" />
      </Form>
    );

    expect(formIns.getValue).toBeDefined();
    expect(formIns.setValue).toBeDefined();
    expect(formIns.reset).toBeDefined();
    expect(formIns.control).toBeDefined();
    expect(formIns.setDefaultValue).toBeDefined();
    expect(formIns.validate).toBeDefined();
  });

  test("Form validate & reset", async done => {
    const formRef = React.createRef();

    const defaultValue = {
      projectName: "Clair Group",
      projectAttr: ["2"],
      phoneNumber: "177",
      projectDesc: "",
      projectRule: true
    };

    const rules = {
      projectName: [
        { required: true, message: "请输入项目名称", trigger: "blur" }
      ],
      projectAttr: [
        {
          type: "array",
          required: true,
          message: "项目属性不能为空",
          trigger: "change"
        }
      ],
      phoneNumber: [
        { required: true, message: "请输入联系电话", trigger: "change" },
        { min: 6, message: "请输入大于 6 位的数字", trigger: "change" }
      ],
      projectDesc: [
        { required: true, message: "请输入项目说明", trigger: "change" }
      ],
      projectRule: [
        {
          type: "boolean",
          required: true,
          message: "请阅读免责条例",
          trigger: "change",
          validator(_, value) {
            return Boolean(value);
          }
        }
      ]
    };

    const reset = () => {
      formRef.current.reset();
    };

    render(
      <Form ref={formRef} defaultValue={defaultValue}>
        <FormItem
          name="projectName"
          as="input"
          placeholder="请输入名称"
          rules={rules.projectName}
          label="项目名称"
        />
        <FormItem
          name="projectAttr"
          as={
            <CheckboxGroup>
              <Checkbox value="1">大数据</Checkbox>
              <Checkbox value="2">高科技</Checkbox>
              <Checkbox value="3">城市安全</Checkbox>
            </CheckboxGroup>
          }
          rules={rules.projectAttr}
          label="项目属性"
        />
        <FormItem
          name="phoneNumber"
          as="input"
          className="c-input c-input--normal"
          rules={rules.phoneNumber}
          label="联系电话"
          placeholder="请输入电话"
        />
        <FormItem
          name="projectDesc"
          as="textarea"
          className="c-input c-input--normal"
          label="项目说明"
          rules={rules.projectDesc}
          placeholder="请输入内容"
        />
        <FormItem
          name="projectRule"
          as={<Checkbox>我已阅读免责条例</Checkbox>}
          label="免责条例"
          valueName="checked"
          rules={rules.projectRule}
        />
        <Button id="submitAll" type="primary" htmlType="submit">
          提交
        </Button>
        <Button id="resetAll" onClick={reset}>
          重置
        </Button>
      </Form>
    );
    const submitBtn = document.getElementById("submitAll");
    fireEvent.click(submitBtn);
    await sleep(100);
    let errorItems = Array.from(
      document.querySelectorAll(".c-form-item--with-help")
    );
    expect(errorItems.length).toBe(2);
    formRef.current.setValue("phoneNumber", "123456789");
    formRef.current.setValue("projectDesc", "more~~~~~~~~~~");
    fireEvent.click(submitBtn);
    await sleep(100);
    errorItems = Array.from(
      document.querySelectorAll(".c-form-item--with-help")
    );
    expect(errorItems.length).toBe(0);
    formRef.current.reset();
    fireEvent.click(submitBtn);
    await sleep(100);
    errorItems = Array.from(
      document.querySelectorAll(".c-form-item--with-help")
    );
    expect(errorItems.length).toBe(2);
    done();
  });

  test("Form validate with no rules", async done => {
    const formRef = React.createRef();

    const onSubmit = isValid => {
      expect(isValid).toBe(true);
      done();
    };

    render(
      <Form ref={formRef} onSubmit={onSubmit}>
        <FormItem
          name="projectName"
          as="input"
          placeholder="请输入名称"
          label="项目名称"
        />
        <FormItem
          name="projectAttr"
          as={
            <CheckboxGroup>
              <Checkbox value="1">大数据</Checkbox>
              <Checkbox value="2">高科技</Checkbox>
              <Checkbox value="3">城市安全</Checkbox>
            </CheckboxGroup>
          }
          label="项目属性"
        />
        <FormItem
          name="phoneNumber"
          as="input"
          className="c-input c-input--normal"
          label="联系电话"
          placeholder="请输入电话"
        />
        <FormItem
          name="projectDesc"
          as="textarea"
          className="c-input c-input--normal"
          label="项目说明"
          placeholder="请输入内容"
        />
        <FormItem
          name="projectRule"
          as={<Checkbox>我已阅读免责条例</Checkbox>}
          label="免责条例"
          valueName="checked"
        />
        <Button id="submitAll" type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    );
    const submitBtn = document.getElementById("submitAll");
    fireEvent.click(submitBtn);
  });
});

describe("FormItem", () => {
  test("FormItem className property", () => {
    render(
      <Form>
        <FormItem name="test" className="test-item" as="input" />
      </Form>
    );
    expect(Boolean(document.querySelector("input.test-item"))).toBe(true);
  });

  test("FormItem style property", () => {
    render(
      <Form>
        <FormItem name="test" style={{ color: "black" }} as="input" />
      </Form>
    );
    expect(
      Boolean(document.querySelector("input").style.color === "black")
    ).toBe(true);
  });

  test("FormItem labelWidth property", () => {
    const { container, rerender } = render(
      <Form labelWidth={80}>
        <FormItem name="test" labelWidth={100} label="me" as="input" />
      </Form>
    );
    expect(
      container.querySelector(".c-form-item__label").style.width === "100px"
    ).toBe(true);
    rerender(
      <Form labelWidth={80}>
        <FormItem name="test" labelWidth="200px" label="you" as="input" />
      </Form>
    );
    expect(
      container.querySelector(".c-form-item__label").style.width === "200px"
    ).toBe(true);
  });

  test("FormItem helperText property", () => {
    const { container } = render(
      <Form>
        <FormItem name="test" helperText="hello" label="me" as="input" />
      </Form>
    );
    expect(
      container
        .querySelector(".c-form-item")
        .innerHTML.includes('<div class="c-form-item__helper-text">hello</div>')
    ).toBe(true);
  });

  test("FormItem as property -- form native field element", () => {
    const { rerender } = render(<span></span>);

    formNativeFieldElementTypeList.forEach(tagName => {
      rerender(
        <Form>
          <FormItem name="test" as={tagName} />
        </Form>
      );
      expect(Boolean(document.querySelector(tagName))).toBe(true);
    });
  });

  test("FormItem as property -- ReactComponent", () => {
    const Cpn = () => {
      return <input id="testinput" />;
    };
    render(
      <Form>
        <FormItem name="test" as={Cpn} />
      </Form>
    );

    expect(Boolean(document.querySelector("#testinput"))).toBe(true);
  });

  test("FormItem as property -- ReactElement", () => {
    const Cpn = ({ className }) => {
      return <input className={className} />;
    };
    render(
      <Form>
        <FormItem name="test" as={<Cpn className="test" />} />
      </Form>
    );

    expect(Boolean(document.querySelector("input.test"))).toBe(true);
  });

  test("FormItem as property -- ClairComponent -- Checkbox", () => {
    render(
      <Form>
        <FormItem name="test" value="apple" as={Checkbox} />
      </Form>
    );

    expect(Boolean(document.querySelector("input[type=checkbox]"))).toBe(true);
  });

  test("FormItem as property -- ClairComponent -- CheckboxGroup", () => {
    render(
      <Form>
        <FormItem
          name="test"
          value="strawberry"
          as={
            <CheckboxGroup name="fruit" className="testCheckboxGroup">
              <Checkbox value="苹果">苹果</Checkbox>
              <Checkbox value="香蕉">香蕉</Checkbox>
              <Checkbox className="testCheckbox" value="watermelon">
                西瓜
              </Checkbox>
              <Checkbox value="strawberry">草莓</Checkbox>
            </CheckboxGroup>
          }
        />
      </Form>
    );
    expect(Boolean(document.querySelector(".testCheckboxGroup"))).toBe(true);
    expect(Boolean(document.querySelector(".testCheckbox"))).toBe(true);
  });

  test("FormItem defaultValue property", () => {
    render(
      <Form>
        <FormItem name="test" defaultValue="strawberry" as="input" />
      </Form>
    );
    expect(document.querySelector("input").value).toBe("strawberry");
  });

  test("FormItem valueName property", () => {
    const Input = ({ text }) => <p>{text}</p>;

    render(
      <Form>
        <FormItem
          name="test"
          defaultValue="strawberry"
          valueName="text"
          as={Input}
        />
      </Form>
    );
    expect(document.querySelector("p").innerHTML).toBe("strawberry");
  });

  test("FormItem mapValue prop", () => {
    const { container } = render(
      <Form>
        <FormItem
          name="test"
          defaultValue="strawberry"
          placeholder="testinput"
          mapValue={() => "bingo"}
          as="input"
        />
      </Form>
    );
    expect(document.querySelector("input").value).toBe("strawberry");
    const input = getByPlaceholderText(container, "testinput");
    fireEvent.change(input, { target: { value: "a" } });
    expect(document.querySelector("input").value).toBe("bingo");
  });

  test("FormItem onChange prop", done => {
    const { container } = render(
      <Form>
        <FormItem
          name="test"
          defaultValue="strawberry"
          placeholder="testinput"
          onChange={e => {
            expect(e.target.value).toBe("a");
            done();
          }}
          as="input"
        />
      </Form>
    );

    const input = getByPlaceholderText(container, "testinput");
    fireEvent.change(input, { target: { value: "a" } });
  });

  test("FormItem onChangeName prop", done => {
    const Input = ({ text, onTextChange }) => (
      <input
        onChange={e => {
          onTextChange(e);
        }}
        value={text}
      />
    );

    render(
      <Form>
        <FormItem
          name="test"
          defaultValue="strawberry"
          placeholder="testinput"
          onChangeName="onTextChange"
          onTextChange={e => {
            expect(e.target.value).toBe("a");
            done();
          }}
          as={Input}
        />
      </Form>
    );

    const input = document.querySelector("input");
    fireEvent.change(input, { target: { value: "a" } });
  });

  test("FormItem onFocus prop", done => {
    render(
      <Form>
        <FormItem
          name="test"
          defaultValue="strawberry"
          placeholder="testinput"
          onFocus={e => {
            expect(Boolean(e)).toBe(true);
            done();
          }}
          as="input"
        />
      </Form>
    );

    const input = document.querySelector("input");
    fireEvent.focus(input);
  });

  test("FormItem onFocusName prop", done => {
    const Input = ({ text, onTextFocus }) => (
      <input
        onFocus={e => {
          onTextFocus(e);
        }}
        value={text}
      />
    );

    render(
      <Form>
        <FormItem
          name="test"
          defaultValue="strawberry"
          placeholder="testinput"
          onFocusName="onTextFocus"
          onTextFocus={e => {
            expect(e.target.value).toBe("a");
            done();
          }}
          as={Input}
        />
      </Form>
    );

    const input = document.querySelector("input");
    fireEvent.focus(input, { target: { value: "a" } });
  });

  test("FormItem onBlur prop", done => {
    render(
      <Form>
        <FormItem
          name="test"
          defaultValue="strawberry"
          placeholder="testinput"
          onBlur={e => {
            expect(Boolean(e)).toBe(true);
            done();
          }}
          as="input"
        />
      </Form>
    );

    const input = document.querySelector("input");
    fireEvent.blur(input);
  });

  test("FormItem onBlurName prop", done => {
    const Input = ({ text, onTextBlur }) => (
      <input
        onBlur={e => {
          onTextBlur(e);
        }}
        value={text}
      />
    );

    render(
      <Form>
        <FormItem
          name="test"
          defaultValue="strawberry"
          placeholder="testinput"
          onBlurName="onTextBlur"
          onTextBlur={e => {
            expect(e.target.value).toBe("a");
            done();
          }}
          as={Input}
        />
      </Form>
    );

    const input = document.querySelector("input");
    fireEvent.blur(input, { target: { value: "a" } });
  });
});

describe("Controller & ErrorMessage", () => {
  test("Controller & ErrorMessage", async () => {
    function Tip({ message, isValid }) {
      return <p id="tip">{isValid ? "1" : `${message}`}</p>;
    }

    function Test() {
      const { control, validate } = useForm({ clause: false });

      const onSubmit = e => {
        e.preventDefault();
        validate().then(valiList => {
          const isValid = !valiList.some(({ isValid }) => !isValid);
          expect(isValid).toBe(false);
        });
      };

      return (
        <form onSubmit={onSubmit}>
          <Controller
            as={<Checkbox>我已阅读免责条款</Checkbox>}
            name="clause"
            control={control}
            valueName="checked"
            onChange={e => e.target.value}
            rules={[
              {
                required: true,
                message: "请阅读免责条款",
                trigger: "change",
                validator(_, value) {
                  return Boolean(value);
                }
              }
            ]}
          />
          <ErrorMessage as={Tip} name="clause" control={control} />
          <button id="submitBtn" htmltype="submit">
            提交
          </button>
        </form>
      );
    }

    render(<Test />);
    fireEvent.click(document.getElementById("submitBtn"));
    await sleep(100);
    expect(
      document.getElementById("tip")?.innerHTML.includes("请阅读免责条款")
    ).toBe(true);
  });
});
