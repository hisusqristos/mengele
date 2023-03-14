const audioContext = new AudioContext();

const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

request1.open("GET", "../galasavoner/galasavo.mp3", true);
request2.open("GET", "../galasavoner/galasavo2.mp3", true);

request1.responseType = "arraybuffer";
request2.responseType = "arraybuffer";

request1.onload = () => {
  audioContext.decodeAudioData(request1.response, (buffer1) => {
    request2.onload = () => {
      audioContext.decodeAudioData(request2.response, (buffer2) => {
        // simply its buffer1 + buffer 2
        const combinedLength = buffer1.length + buffer2.length;
        const combinedBuffer = audioContext.createBuffer(
          2,
          combinedLength,
          audioContext.sampleRate
        );

        const channel1 = combinedBuffer.getChannelData(0);
        const channel2 = combinedBuffer.getChannelData(1);

        channel1.set(buffer1.getChannelData(0));
        channel1.set(buffer2.getChannelData(0), buffer1.length);

        channel2.set(buffer1.getChannelData(1));
        channel2.set(buffer2.getChannelData(1), buffer1.length);

        const source = audioContext.createBufferSource();
        source.buffer = combinedBuffer;
        source.connect(audioContext.destination);
        source.start();
      });
    };
    request2.send();
  });
};

request1.send();

const btn = document.createElement("button");
btn.innerText = "klik";
btn.addEventListener("click", () => {
  request1.send();
});
document.body.appendChild(btn); // im having problems with cors, gotta fix that
