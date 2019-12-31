import { useState, useEffect } from "react";

export default (fluid) => {
  const [img, setImg] = useState(fluid.base64);
  useEffect(() => {
    fetch(fluid.src).then(async (resp) => {
      const body = await resp.blob();
      const url = URL.createObjectURL(body);
      setImg(url);
    });
  }, []);
  return img;
}