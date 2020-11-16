import { notification } from "@src/index";
import { placements, Placement } from "../lib/Notification";

describe("notification", () => {
  afterAll(() => {
    jest.useRealTimers();
    notification.closeAll();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    notification.closeAll();
    jest.runAllTimers();
  });

  it("should be able to hide manually", () => {
    const noti1 = notification.open({
      title: "Notification Title",
      content: "This is the content of the notification.",
      duration: 0
    });
    const noti2 = notification.open({
      title: "Notification Title",
      duration: 0
    });
    expect(document.querySelectorAll(".c-notification").length).toBe(2);
    noti1.close();
    jest.runAllTimers();
    expect(document.querySelectorAll(".c-notification").length).toBe(1);
    noti2.close();
    jest.runAllTimers();
    expect(document.querySelectorAll(".c-notification").length).toBe(0);
  });

  it("should be able to closed globally", () => {
    notification.open({
      title: "Notification Title",
      content: "This is the content of the notification.",
      duration: 0
    });
    notification.open({
      title: "Notification Title",
      content: "This is the content of the notification.",
      duration: 0
    });
    expect(document.querySelectorAll(".c-notification-container").length).toBe(
      1
    );
    expect(document.querySelectorAll(".c-notification").length).toBe(2);
    notification.closeAll();
    jest.runAllTimers();
    expect(document.querySelectorAll(".c-notification").length).toBe(0);
  });

  it("should hide close icon successfully", () => {
    notification.open({
      title: "Notification Title",
      duration: 0,
      showClose: false
    });
    expect(document.querySelectorAll(".c-notification-container").length).toBe(
      1
    );
    expect(
      document.querySelectorAll(".c-notification-container .c-icon--close")
        .length
    ).toBe(0);
  });

  it("should be able to open with different type", () => {
    notification.info({
      title: "Notification Title",
      content: "This is the content of the notification.",
      duration: 0
    });
    notification.error({
      title: "Notification Title",
      content: "This is the content of the notification.",
      duration: 0
    });
    notification.warning({
      title: "Notification Title",
      content: "This is the content of the notification.",
      duration: 0
    });
    notification.success({
      title: "Notification Title",
      content: "This is the content of the notification.",
      duration: 0
    });
    expect(document.querySelectorAll(".c-notification-container").length).toBe(
      1
    );
    expect(document.querySelectorAll(".c-notification").length).toBe(4);
  });

  it("should be able to open at different position", () => {
    const openNotificationWithPlacement = (placement: Placement) => {
      notification.open({
        title: "Notification Title",
        content: "This is the content of the notification.",
        placement,
        duration: 0
      });
      expect(
        document.querySelectorAll(`.c-notification-container--${placement}`)
          .length
      ).toBe(1);
    };
    placements.forEach(type => {
      openNotificationWithPlacement(type);
    });
  });
});
