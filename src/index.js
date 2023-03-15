const audioCtx = new AudioContext();
const audio = new Audio("./galasavoner/galasavo.mp3");
const audio2 = new Audio("./galasavo/galasavo2.mp3");

const source = audioCtx.createMediaElementSource(audio);
source.connect(audioCtx.destination);

const source2 = audioCtx.createMediaElementSource(audio2);
source2.connect(audioCtx.destination);


const btn = document.createElement("button");
btn.innerText = "klik";
btn.addEventListener("click", () => {
  audio.play();
  audio2.play();
});
document.body.appendChild(btn);
