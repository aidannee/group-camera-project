import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import DrawingCanvas from "./DrawingCanvas";
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 800,
  height: 800,
  facingMode: "user",
};
function Profile() {
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  // galery of images
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
    setIsCanvasActive(false);
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
  // function saveChanges(currentImage) {}
  return (
    <>
      <div className=" overflow-hidden h-screen flex flex-col ">
        <h1 className="bg-gray-200 text-center font-bold text-xl p-2 m-2">
          Hello World
        </h1>
        <div className="flex  h-[calc(100vh-60px)]">
          {/* Left part content */}
          <div className="w-1/5 bg-red-500 p-4  overflow-y-auto  h-full">
            {/* Place your content here */}
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
                  <div className="flex flex-col">
                    <div className="flex ">
                      <button
                        className="flex-1  bg-yellow-400 my-2 p-2"
                        onClick={(e) => deleteImage(index)}
                      >
                        Delete
                      </button>
                      <a
                        className="flex-1"
                        href={savedGallery[index]}
                        download={index}
                      >
                        <button className="  bg-green-400 m-2 p-2">
                          Download
                        </button>
                      </a>
                    </div>
                    <button
                      className=" bg-yellow-400 my-2 p-2"
                      onClick={(e) => drawImage(img, index)}
                    >
                      Draw
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Right part content */}
          <div className=" w-4/5 bg-green-500 p-4 overflow-y-auto  ">
            <div className="flex flex-col ">
              {/* Right part content */}
              {/* Place your content here */}
              {picture === "" ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                />
              ) : (
                ""
              )}
              <div>
                {picture !== "" ? (
                  <button
                    onClick={handleRetake}
                    className="bg-blue-400 px-4 py-2 m-4 "
                  >
                    Retake
                  </button>
                ) : (
                  <button
                    onClick={capture}
                    className="bg-red-400 px-4 py-2 m-4 "
                  >
                    Capture
                  </button>
                )}
              </div>
              <div className=" z-20">
                {isCanvasActive ? (
                  <DrawingCanvas
                    image={savedGallery[imageIndex]}
                    setSavedGallery={setSavedGallery}
                    savedGallery={savedGallery}
                    imgIdx={imageIndex}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
