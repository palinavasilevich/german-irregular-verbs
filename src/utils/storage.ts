"use client";

export const storage = {
  setItem: <T>(name: string, item: T) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(item));
    }
  },
  getItem: (name: string) => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(name);

      if (item) {
        return JSON.parse(item);
      }
    }
  },
};
