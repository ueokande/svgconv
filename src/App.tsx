import React from "react";
import Template from "./Template";
import styled from "styled-components";
import { ColorResult, SketchPicker } from "react-color";

const Container = styled.div`
  text-align: center;
`;

const Hidden = styled.div`
  display: none;
`;

const App = () => {
  const [title, setTitle] = React.useState("Hello, world");
  const handleTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const [initialized, setInitialized] = React.useState(false);
  const canvas = React.createRef<HTMLCanvasElement>();
  const img = React.createRef<HTMLImageElement>();
  const screen = React.createRef<HTMLImageElement>();
  const [color, setColor] = React.useState("#3abbd7ff");

  React.useEffect(() => {
    if (img.current === null) {
      return;
    }
    const svg = document.querySelector("svg");
    if (svg === null) {
      return;
    }

    const xml = new XMLSerializer().serializeToString(svg);
    const b64 = window.btoa(unescape(encodeURIComponent(xml)));
    img.current.src = "data:image/svg+xml;charset=utf-8;base64," + b64;
  }, [title, canvas, img]);

  React.useEffect(() => {
    if (img.current === null) {
      return;
    }
    img.current.onload = () => {
      if (img.current === null || screen.current === null || canvas.current === null) {
        return;
      }
      const ctx = canvas.current?.getContext("2d");
      ctx?.drawImage(img.current, 0, 0);

      screen.current.src = canvas.current.toDataURL();
    };
  }, [img, canvas, screen]);

  const handleOnLoadSvg = () => {
    if (!initialized) {
      setTitle("Title here");
      setInitialized(true);
    }
  };
  const handleColorChanged = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <>
      <Container>
        <img ref={screen} width={330} height={135} />
        <br />
        <Hidden>
          <canvas
            ref={canvas}
            width={660}
            height={270}
            style={{ width: "330px", height: "135px" }}
          />
          <Template title={title} color={color} onLoad={handleOnLoadSvg} />
          <img alt="dummy" ref={img} />
        </Hidden>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={handleTitleChanged}
          />
        </label>
        <br />

        <label>
          Color:
          <SketchPicker
            color={color}
            disableAlpha={true}
            onChange={handleColorChanged}
          />
        </label>
      </Container>
    </>
  );
};

export default App;
