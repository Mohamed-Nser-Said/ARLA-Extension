

function handleSuccess(stream) {
    const video = document.querySelector('video');
    video.srcObject = stream;
}

navigator.mediaDevices.getUserMedia({video: {width: 440}, audio: false})
    .then(handleSuccess)

const sourceVideo = document.querySelector('video');
const drawCanvas = document.querySelector('canvas');



 sourceVideo.onplaying = async() => {

    sourceVideo.width = sourceVideo.videoWidth;
    sourceVideo.height = sourceVideo.videoHeight;

    const net = await bodyPix.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2
    });

    await predictLoop(net)


};


async function predictLoop(net) {

    while (true) {

        const segmentation = await net.segmentPersonParts(sourceVideo, {
            flipHorizontal: false,
            internalResolution: 'medium',
            segmentationThreshold: 0.7
        });

        if(segmentation.allPoses[0]==undefined) continue

        let nose = segmentation.allPoses[0].keypoints[0].score;
        let overall = segmentation.allPoses[0].score

        if(overall<0.40){
            console.log(overall)
        }


        const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
        const opacity = 0.7;
        const flipHorizontal = false;
        const maskBlurAmount = 0;


        bodyPix.drawMask(
            drawCanvas, sourceVideo, coloredPartImage, opacity, maskBlurAmount,
            flipHorizontal);



    }}


