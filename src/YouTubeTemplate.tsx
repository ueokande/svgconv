import React from "react";

import { ReactSVG } from "react-svg";

interface Props {
  title: string;
  color: string;
  onLoad?: (svg: SVGElement) => void;
  onLoadError?: (err: Error) => void;
}

const YouTubeTemplate: React.FC<Props> = ({ title, color, onLoad, onLoadError }: Props) => {
  React.useEffect(() => {
    const titleElement = document.querySelector("#title");
    if (titleElement === null) {
      return;
    }
    titleElement.textContent = title;

    const style = document.querySelector("#style-overwrite");
    if (style === null) {
      return;
    }
    style.textContent=`
	.st18 { fill:${color}; }
	.st37 { stroke:${color}; }
    `
  }, [title, color]);

  const handleAfterInjection = (err: Error | null, svg?: SVGElement) => {
    if (err) {
      onLoadError && onLoadError(err);
      return;
    }
    if (svg) {
      onLoad && onLoad(svg);
    }
  };

  return <ReactSVG src="./youtube_template.svg" afterInjection={handleAfterInjection} />;
};

export default YouTubeTemplate;

