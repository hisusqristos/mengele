const audioCtx = new AudioContext();
const audio = "../galasavoner/galasavo.mp3";
const audio2 = "../galasavoner/galasavo2.mp3";

const mergeBuffers = (buffer1, buffer2) => {
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

let buffer1, buffer2;

fetch(audio)
  .then((response) => response.arrayBuffer())
  .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
  .then((decodedBuffer) => {
    buffer1 = decodedBuffer;
    return fetch(audio2);
  })
  .then((response) => response.arrayBuffer())
  .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
  .then((decodedBuffer) => {

// too many callbacks, doesnt work.

    buffer2 = decodedBuffer;

    const mergedBuffer = mergeBuffers(buffer1, buffer2);

    var source = audioCtx.createBufferSource();
    source.buffer = mergedBuffer;
    source.connect(audioCtx.destination);

    const btn = document.createElement("button");
    btn.innerText = "klik";
    btn.addEventListener("click", () => {
      source.start();
    });
    document.body.appendChild(btn);
  })
  .catch((error) => {
    console.error(error);
  });
