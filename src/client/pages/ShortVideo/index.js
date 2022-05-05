import React, { useEffect, useState, useRef } from 'react';
import {
  Grid, Card
} from '@arco-design/web-react';
import Player, { Events } from 'xgplayer';
import Loading from '../../component/Loading';
import Utils from '../../utils';
import './index.css';

const { Row, Col } = Grid;
const { isInViewPort } = Utils;

export default function SimpleSlider() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const playingPlayer = useRef(null);

  const getVideos = () => {
    fetch(
      `api/SearchVideo?${
        new URLSearchParams({
          SpaceName: '1234567',
          Offset: 0,
          Limit: 10,
          Tags: 'shortvideo',
        })}`
    )
      .then(res => res.json())
      .then((data) => {
        setVideos(data.result || []);
      });
  };
  const initPlay = () => {
    videos.forEach((item, index) => {
      const player = new Player({
        id: `video${index}`,
        autoplay: false,
        url: item.PlayUrl,
        poster: item.PosterUrl,
        playsinline: false,
        height: '100%',
        width: '100%',
        mobile: {
          disableGesture: true,
        },
        closeVideoStopPropagation: true,
        closeVideoPreventDefault: true,
        closeVideoClick: false,
        videoFillMode: 'fillWidth',
      });
      player.on(Events.PLAY, () => {
        if (playingPlayer.current && playingPlayer.current.config.id !== player.config.id) {
          playingPlayer.current.pause();
        }
        playingPlayer.current = player;
      });
    });
    setLoading(false);
  };
  const initScorllListen = () => {
    document.body.addEventListener('touchmove', () => {
      if (playingPlayer.current.isPlaying && !isInViewPort(playingPlayer.current.root)) {
        playingPlayer.current.pause();
      }
    });
  };
  useEffect(() => {
    getVideos();
  }, []);
  useEffect(() => {
    if (videos.length > 0) {
      initPlay();
      initScorllListen();
    }
  }, [videos]);

  return (
    <div
      className="videoWrapper"
    >
      {
        loading && <Loading />
      }
      <Row gutter={[24, 28]}>
        {videos.length > 0
          && videos.map((_, index) => (
            <Col span={24}>
              <Card
                className="shortVideoCard videoCard"
                cover={<div className="shortVideoCover" id={`video${index}`} />}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
}
