import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Spin } from '@arco-design/web-react';
import ErrorRetry from '../../component/ErrorRetry';
import Mp4XGPlayer from '../../component/Mp4Player';
import 'swiper/swiper.min.css';
import './index.css';

export default function TinyVideo() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const playingPlayer = useRef(null);
  const playerInstances = useRef([]);

  const getVideos = async () => {
    try {
      const params = new URLSearchParams({
        SpaceName: '1234567',
        Offset: 0,
        Limit: 10,
        Tags: 'tinyvideo',
      });
      const res = await fetch(`api/SearchVideo?${params.toString()}`);
      const response = await res.json();
      if (response.success) {
        setVideos(response.result || []);
      } else {
        setError(response.errorCode);
      }
    } catch (e) {
      console.error('get tiny video error', e);
      setError('REQUEST_ERROR');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  const playHandle = (playInstance) => {
    playingPlayer.current = playInstance;
  };
  const changeSlide = () => {
    if (playingPlayer.current && playingPlayer.current.isPlaying && playingPlayer.current.pause) {
      playingPlayer.current.pause();
    }
  };
  const changeVideo = (swiper) => {
    const index = swiper.snapIndex;
    if (playerInstances.current[index] && playerInstances.current[index].play) {
      playerInstances.current[index].play();
    }
  };
  const createHandle = (index, player) => {
    playerInstances.current[index] = player;
  };
  return (
    <div className={!error ? 'tiny-video-container' : ' '}>
      {isLoading && <Spin dot style={{ position: 'relative', top: '50%' }} />}
      {error && <ErrorRetry error={error} />}
      {
        (!error && videos.length > 0) && (
          <Swiper
            direction="vertical"
            onSlideChangeTransitionStart={changeSlide}
            onSlideChangeTransitionEnd={changeVideo}
          >
            {videos.map((item, index) => (
              <SwiperSlide key={item.PlayUrl + index}>
                <Mp4XGPlayer
                  config={{
                    url: item.PlayUrl,
                    poster: item.PosterUrl,
                    width: '100%',
                    height: '100%',
                    closePauseVideoFocus: true,
                    videoFillMode: 'fill',
                  }}
                  className="vod-xgplayer"
                  onplayHandle={playHandle}
                  onCreateHandle={createHandle}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )
      }
    </div>
  );
}
