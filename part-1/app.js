// Set constraints for the video stream
var constraints = { video: { facingMode: { exact: "environment" },
width: { ideal: 4096 },
height: { ideal: 2160 } }, audio: false };
// var constraints = { video: { facingMode: "user" ,
// width: { ideal: 4096 },
// height: { ideal: 2160 } }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

var radio=document.getElementsByName("quality");
var selectvalue=null;
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
      for(var i=0;i<radio.length;i++){
        if(radio[i].checked==true) {
                 selectvalue=radio[i].value;
                 break;
        }
      }
    console.log(selectvalue) // selectValue 0 represents normal while 1 represents abnormal
    if(selectvalue == null){alert("Select the type of dashboard first!")}
    else{
      cameraSensor.width = cameraView.videoWidth;
      cameraSensor.height = cameraView.videoHeight;
      cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
      cameraOutput.src = cameraSensor.toDataURL("image/webp");
      cameraOutput.classList.add("taken");
    }
    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
