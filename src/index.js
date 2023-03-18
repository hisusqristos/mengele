const audioCtx = new AudioContext();
const audio = new Audio("../galasavoner/galasavo.mp3");
const audio2 = new Audio("../galasavoner/galasavo2.mp3");

const buffer1 = audioCtx.decodeAudioData(audio)
const buffer2 = audioCtx.decodeAudioData(audio2)


function mix(buffers, context) {
  var maxChannels = 0;
  var maxDuration = 0;
  for (let i = 0; i < buffers.length; i++) {
    if (buffers[i].numberOfChannels > maxChannels) {
      maxChannels = buffers[i].numberOfChannels;
    }
    if (buffers[i].duration > maxDuration) {
      maxDuration = buffers[i].duration;
    }
  }
  var out = context.createBuffer(
    maxChannels,
    context.sampleRate * maxDuration,
    context.sampleRate
  );

  for (var j = 0; j < buffers.length; j++) {
    for (
      var srcChannel = 0;
      srcChannel < buffers[j].numberOfChannels;
      srcChannel++
    ) {
      var output = out.getChanneData(srcChannel);
      var input = buffers[j].getChanneData(srcChannel);
      for (let i = 0; i < input.length; i++) {
        output[i] += input[i];
      }
    }
  }
  return out;
}


const buffers = [buffer1, buffer2]

const source = audioCtx.createBufferSource();
const newBuffer = mix(buffers, audioCtx)

source.buffer = newBuffer;
source.connect(audioCtx.destination)

const btn = document.createElement("button");
btn.innerText = "klik";
btn.addEventListener("click", () => {
  source.start()
});
document.body.appendChild(btn);
