import React, { useState, useEffect, useRef } from "react";
import { getVideo } from "../api/getVideo";

function observe(target) {
  console.log(target);
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        setTimeout(() => {
          target.play();
        }, 2000);
      } else {
        // setTimeout(() => {
        target.pause();
        // }, 2000);
      }
    });
  });
  observer.observe(target);
}

const VideoGallery = () => {
  const [videosList, setVideosList] = useState(null);

  useEffect(() => {
    (async () => {
      const videos = await getVideo();
      setVideosList(videos.data);
    })();
  }, []);

  return (
    <>
      <div
        id="scrollArea"
        style={{
          display: "flex",
          flexWrap: "wrap",
          flex: 1,
          height: "100vh",
          width: "100vw"
        }}
      >
        {videosList
          ? videosList.map((video) => {
              const videoId = video.id;

              return (
                <video
                  key={videoId}
                  id={videoId}
                  ref={(c) => {
                    if (c) {
                      c.pause();
                      observe(c);
                    }
                  }}
                  src={video.videoUrl}
                  width="100%"
                  height="100%"
                  muted
                  alt={video.title}
                ></video>
              );
            })
          : null}
      </div>
    </>
  );
};

export default VideoGallery;
