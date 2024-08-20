"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type LayoutEnum = "default" | "card";

// 创建 Context
const LayoutProviderContext = createContext({
  layout: "",
  setLayout: (layout: LayoutEnum) => {},
});

// 提供者组件
export const LayoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [layout, setLayout] = useState("default");

  useEffect(() => {
    const layout = localStorage.getItem("layout");
    if (layout) {
      setLayout(layout as LayoutEnum);
    }
  }, []);

  return (
    <LayoutProviderContext.Provider
      value={{
        layout,
        setLayout: (layout: LayoutEnum) => {
          localStorage.setItem("layout", layout);
          setLayout(layout);
        },
      }}>
      {children}
    </LayoutProviderContext.Provider>
  );
};

// 自定义 hook，用于获取布局信息
export const useLayout = () => {
  return useContext(LayoutProviderContext);
};
