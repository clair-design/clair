type Callback = (...args: any) => void;

interface Hash {
  [eventName: string]: Callback[];
}

export const EventBus = class {
  hash: Hash = {};
  on(eventName: string, callback: Callback) {
    if (!Array.isArray(this.hash[eventName])) {
      this.hash[eventName] = [];
    }
    this.hash[eventName].push(callback);
  }
  off(eventName?: string, callback?: Callback) {
    if (typeof eventName === "string") {
      if (
        typeof callback === "function" &&
        Array.isArray(this.hash[eventName])
      ) {
        this.hash[eventName] = this.hash[eventName].filter(
          fn => fn !== callback
        );
      } else {
        this.hash[eventName] = [];
      }
    } else {
      this.hash = {};
    }
  }
  trigger(eventName: string, ...args: any) {
    const observers = this.hash[eventName];
    if (!Array.isArray(observers)) {
      return;
    }
    observers.forEach(observer => observer(...args));
  }
};

export type EventBusType = InstanceType<typeof EventBus>;
