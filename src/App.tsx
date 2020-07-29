import React from "react";
import Template from "./Template";
import styled from "styled-components";

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

  const canvas = React.createRef<HTMLCanvasElement>();
  const img = React.createRef<HTMLImageElement>();

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
    const dpr = window.devicePixelRatio || 1;
    if (canvas.current === null) {
      return;
    }

    const react = canvas.current.getBoundingClientRect();
    canvas.current.width = react.width * dpr;
    canvas.current.height = react.height * dpr;
  }, [canvas]);

  React.useEffect(() => {
    if (img.current === null) {
      return;
    }
    img.current.onload = () => {
      if (img.current === null) {
        return;
      }
      const ctx = canvas.current?.getContext("2d");
      ctx?.drawImage(img.current, 0, 0);
    };
  }, [img]);

  return (
    <Container>
      <canvas ref={canvas} style={{ width: "1920px", height: "1080px" }} />
      <Hidden>
        <Template title={title} />
        <img alt="dummy" ref={img} />
      </Hidden>
      <label>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={handleTitleChanged}
        />
      </label>
    </Container>
  );
};

export default App;
