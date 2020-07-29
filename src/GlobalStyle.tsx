import React from "react";

type AnyStyleProperties = {[key: string]: string}

interface Props {
  className: string;
  style: AnyStyleProperties,
}

const GlobalStyle: React.FC<Props> = ({ className, style }) => {
  const [cssText, setCSSText] = React.useState("");
  React.useEffect(() => {
    const dom = document.createElement("div");
    for (let key of Object.keys(style)) {
      dom.style[key as any] = style[key];
    }
    setCSSText(dom.style.cssText as string);
    dom.remove();
  }, [className, style]);

  return (
    <style>
    {
    `.${className}{${cssText}}`
    }
    </style>
  );
};

export default GlobalStyle;
