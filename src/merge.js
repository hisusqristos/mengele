// const mergeBuffers = (buffer1, buffer2) => {
//     const mergedBuffer = audioCtx.createBuffer(
//       buffer1.numberOfChannels,
//       buffer1.length + buffer2.length,
//       buffer1.sampleRate
//     );
  
//     for (let channel = 0; channel < buffer1.numberOfChannels; channel++) {
//       const channelData = buffer1.getChannelData(channel);
//       mergedBuffer.getChannelData(channel).set(channelData);
//     }
  
//     for (let channel = 0; channel < buffer2.numberOfChannels; channel++) {
//       const channelData = buffer2.getChannelData(channel);
//       mergedBuffer.getChannelData(channel).set(channelData, buffer1.length);
//     }
//     return mergedBuffer;
//   };
  