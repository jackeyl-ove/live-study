import { useEffect } from "react";

function useListen(videoElement) {
  useEffect(() => {
    let timer
    let tip:number = 0
    if (videoElement !== null) {
      videoElement.addEventListener('play', () => {
        console.log('play');
        videoElement.currentTime += tip
        tip = 0
        if(timer)clearInterval(timer)
      })
      videoElement.addEventListener('pause', () => {
        console.log('paste');
        timer = setInterval(()=>{
          tip += 1
        }, 1000)
      })
      videoElement.addEventListener('volumechange', function (e) {
        if (videoElement.volume < 0.1) {
          console.log('静音');
        }
      })
      videoElement.addEventListener('ended', () => {
        console.log('end');
      })
    }
  }, [videoElement])
}

export default useListen;