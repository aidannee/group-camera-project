import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import DrawingCanvas from "./DrawingCanvas";
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
function Profile() {
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  let [savedGallery, setSavedGallery] = useState([]);
  let [imageIndex, setImageIndex] = useState(-1);
  let [isCanvasActive, setIsCanvasActive] = useState(false);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  });
  useEffect(() => {
    if (picture != "") setSavedGallery([...savedGallery, picture]);
  }, [picture]);
  useEffect(() => {
    // console.log(savedGallery);
  }, [savedGallery]);
  const handleRetake = () => {
    setPicture(""); // Reset the picture state to an empty string
  };
  function deleteImage(index) {
    setSavedGallery((preImg) => preImg.filter((img, idx) => idx !== index));
  }
  function drawImage(img, idx) {
    setIsCanvasActive(true);
    setImageIndex(idx);
    console.log(savedGallery[idx]);
    // console.log(savedGallery);
  }
  function saveChanges(currentImage) {}
  return (
    <div className="relative w-full h-full">
      <h1 className="w-screen z-50 text-center bg-blue-500 text-white text-5xl p-2">
        Image Capturing
      </h1>
      <div className="flex  h-full w-full">
        {/* Gallery area */}
        <div className="w-60 h-screen flex flex-col bg-red-500 gap-4 p-4 overflow-y-auto top-16">
          {savedGallery.map((img, index) => {
            return (
              <div key={index}>
                <img
                  onClick={(e) => {
                    setImageIndex(index);
                  }}
                  src={img}
                  alt="Image"
                />
                <div className=" mt-2 flex flex-col items-center">
                  <div className="flex ">
                    {/* edit */}
                    <button
                      className=" bg-yellow-400 rounded p-2"
                      onClick={(e) => drawImage(img, index)}
                    >
                      &#10000;
                    </button>

                    {/* delete */}
                    <button
                      className=" bg-pink-400 mx-2 rounded p-2"
                      onClick={(e) => deleteImage(index)}
                    >
                      &#128465;
                    </button>
                    {/* download */}
                    <a className="" href={savedGallery[index]} download={index}>
                      <button className="  bg-green-400 rounded  p-2">
                        &#8681;
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Right side */}
        <div className="absolute top-16 left-60 w-screen bg-green-500">
          <div>
            {picture === "" ? (
              <Webcam
                className="h-96 p-4"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            ) : (
              <div className="w-2/3 p-4"></div>
            )}
            <div>
              {picture !== "" ? (
                <div className="w-2/3 p-4">
                  <button
                    onClick={handleRetake}
                    className="bg-blue-400 px-4 py-2 m-4 "
                  >
                    Retake
                  </button>
                </div>
              ) : (
                <button onClick={capture} className="bg-red-400 px-4 py-2 m-4 ">
                  Capture
                </button>
              )}
            </div>
          </div>
          {/* Canvas area */}
          <div className="w-full z-50">
            {isCanvasActive ? (
              <div>
                <DrawingCanvas
                  image={savedGallery[imageIndex]}
                  setSavedGallery={setSavedGallery}
                  savedGallery={savedGallery}
                  imgIdx={imageIndex}
                />
                {/* <button
                  onClick={() => saveChanges(savedGallery[imageIndex])}
                  className="bg-blue-400 px-4 py-2 m-4 "
                >
                  Save Changes
                </button> */}
              </div>
            ) : (
              ""
            )}
            {/* <img src={savedGallery[imageIndex]} alt="" /> */}
          </div>
          {/* Camera input */}
        </div>
      </div>
      {/* <div className="bg-slate-500 opacity-80 top-28 left-52  w-full h-full absolute"></div> */}
    </div>
  );
}
export default Profile;
