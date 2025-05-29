
function handleVideo(e) {
  console.log("Video clicked");
}

const video = document.querySelectorAll(".video-slide");

video.forEach((vid) => {
  vid.addEventListener("click", handleVideo);
});
