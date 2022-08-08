import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [mysrc, setMysrc] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/stream/videos")
      .then((res) => res.json())
      .then((res) => {
        setMysrc(res);
      });
  }, []);

  const handleUpload = async () => {
    const file = document.getElementById("inputFile");
    const formData = new FormData();
    formData.append("myfile", file.files[0]);
    fetch("http://localhost:8000/stream/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <div className="App">
      <div>
        {mysrc.map((item, id) => {
          return (
            <div key={id}>
              <video id="videoPlayer" width="50%" controls muted="muted" autoPlay={false}>
              <source
                id="x"
                src={'http://localhost:8000/stream/video?name='+`${item.uniqueid}`}
                type="video/mp4"
              />
            </video>
            </div>
          );
        })}
      </div>
      <div>
        <input name="file" id="inputFile" type="file" />
        <button id="uploadBtn" onClick={handleUpload}>
          upload
        </button>
      </div>
    </div>
  );
}

export default App;
