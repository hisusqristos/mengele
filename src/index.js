const audioCtx = new AudioContext();
const audio = "../galasavoner/galasavo.mp3";
const audio2 = "../galasavoner/galasavo2.mp3";

const mergeBuffers = (buffer1, buffer2) => {
  console.log(buffer1.length);

  const mergedBuffer = audioCtx.createBuffer(
    buffer1.numberOfChannels,
    buffer1.length + buffer2.length,
    buffer1.sampleRate
  );

  for (let channel = 0; channel < buffer1.numberOfChannels; channel++) {
    const channelData = buffer1.getChannelData(channel);
    mergedBuffer.getChannelData(channel).set(channelData);
  }

  for (let channel = 0; channel < buffer2.numberOfChannels; channel++) {
    const channelData = buffer2.getChannelData(channel);
    mergedBuffer.getChannelData(channel).set(channelData, buffer1.length);
  }
  return mergedBuffer;
};

const returnMerged = async () => {
  let buffer1, buffer2;

  buffer1 = await fetch(audio)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
    .catch((error) => {
      console.error(error);
    });

  buffer2 = await fetch(audio2)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
    .catch((error) => {
      console.error(error);
    });

  const mergedBuffer = mergeBuffers(buffer1, buffer2);
  return mergedBuffer;
};

var source = audioCtx.createBufferSource();
source.buffer = returnMerged(); // missmatch. bzbz
source.connect(audioCtx.destination);

const btn = document.createElement("button");
btn.innerText = "klik";
btn.addEventListener("click", () => {
  source.start();
});
document.body.appendChild(btn);
