(() => {



let play=false;




let pause_btn = document.getElementById("pause-btn");


pause_btn.addEventListener('click', function (e){
    if (play){play=false}
    else play=true
    main()
}, false);



function main() {




    function handleSuccess(stream) {
        const video = document.querySelector('video');
        video.srcObject = stream;
    }

    navigator.mediaDevices.getUserMedia({video: {width: 440}, audio: false})
        .then(handleSuccess)

    const sourceVideo = document.getElementById('vid-bodypix');
    const drawCanvas = document.getElementById('canvas-bodypix');

    sourceVideo.onplaying = async() => {

        sourceVideo.width = sourceVideo.videoWidth;
        sourceVideo.height = sourceVideo.videoHeight;

        const net = await tf.loadGraphModel("tfproject/TFODCourse/Tensorflow/workspace/models/my_ssd_mobnet/tfjsexport/model.json")

        // const net = await bodyPix.load({
        //     architecture: 'MobileNetV1',
        //     outputStride: 16,
        //     multiplier: 0.75,
        //     quantBytes: 2
        // });

        await predictLoop(net)


    };


    async function predictLoop(net) {

        while (play) {


            const img = tf.browser.fromPixels(sourceVideo)
            const resized = tf.image.resizeBilinear(img, [640,480])
            const casted = resized.cast('int32')
            const expanded = casted.expandDims(0)
            const obj = await net.executeAsync(expanded)

            const boxes = await obj[4].array()
            const classes = await obj[5].array()
            const scores = await obj[6].array()

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");

            // 5. TODO - Update drawing utility
            // drawSomething(obj, ctx)
            requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.9, videoWidth, videoHeight, ctx)});

            tf.dispose(img)
            tf.dispose(resized)
            tf.dispose(casted)
            tf.dispose(expanded)
            tf.dispose(obj)








            // const segmentation = await net.segmentPersonParts(sourceVideo, {
            //     flipHorizontal: false,
            //     internalResolution: 'medium',
            //     segmentationThreshold: 0.7
            // });
            //
            // if(segmentation.allPoses[0]==undefined) continue
            //
            // let parts = segmentation.allPoses[0].keypoints;
            // // let overall = segmentation.allPoses[0].score
            //
            // let all =[]
            // for (let i=0; i<parts.length; i++) {
            //     let part = parts[i]
            //     all.push(`${part.score} : ${part.part}`)
            //
            // }
            //
            //
            // document.getElementById('op').textContent=`${all}`
            //
            //
            //
            // const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
            // const opacity = 0.7;
            // const flipHorizontal = false;
            // const maskBlurAmount = 0;
            //
            //
            // bodyPix.drawMask(
            //     drawCanvas, sourceVideo, coloredPartImage, opacity, maskBlurAmount,
            //     flipHorizontal);



        }}
}


})()







