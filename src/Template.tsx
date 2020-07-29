import React from "react";

import { ReactSVG } from "react-svg";

interface Props {
  title: string;
  onLoad?: (svg: SVGElement) => void;
  onLoadError?: (err: Error) => void;
}

const Template: React.FC<Props> = ({ title, onLoad, onLoadError }: Props) => {
  React.useEffect(() => {
    const titleElement = document.querySelector("#title");
    if (titleElement === null) {
      return;
    }
    titleElement.textContent = title;
  }, [title]);

  const handleAfterInjection = (err: Error | null, svg?: SVGElement) => {
    if (err) {
      onLoadError && onLoadError(err);
      return;
    }
    if (svg) {
      onLoad && onLoad(svg);
    }
  };

  return <ReactSVG src="./drawing.svg" afterInjection={handleAfterInjection} />;
};

export default Template;
