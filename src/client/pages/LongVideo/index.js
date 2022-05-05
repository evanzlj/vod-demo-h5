import React, { useEffect, useState, useRef } from 'react';
import {
  Grid, Card, Typography
} from '@arco-design/web-react';
import Player, { Events } from 'xgplayer';
import Loading from '../../component/Loading';
import './index.css';

const { Row } = Grid;
const { Meta } = Card;
const { Col } = Grid;

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
          Tags: 'hugevideo',
        })}`
    )
      .then(res => res.json())
      .then((data) => {
        setVideos(data.result || []);
        setLoading(false);
      });
  };
  useEffect(() => {
    getVideos();
  }, []);

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
        videoFillMode: 'fillWidth',
      });
      player.on(Events.PLAY, () => {
        if (playingPlayer.current && playingPlayer.current.config.id !== player.config.id) {
          playingPlayer.current.pause();
        }
        playingPlayer.current = player;
      });
    });
  };

  useEffect(() => {
    if (videos.length > 0) {
      initPlay();
    }
  }, [videos]);

  return (
    <div className="videoWrapper">
      {
        loading && <Loading />
      }
      <Row gutter={[24, 60]} style={{ marginTop: 80 }}>
        <Col span={24}>
          <Card
            className="videoCard"
            cover={<div className="firstLongVideoCover" id="video0" />}
          >
            <Meta
              title={(
                <Typography.Text ellipsis={{ cssEllipsis: true }}>
                  {videos[0]?.Title}
                </Typography.Text>
                )}
            />
          </Card>
        </Col>
        {videos.length > 0
        && videos
          .filter((_, index) => index > 0)
          .map((video, index) => (
            <Col key={video.Vid} span={12}>
              <Card
                className="longVideoCard videoCard"
                cover={<div className="longVideoCover" id={`video${index + 1}`} />}
              >
                <Meta
                  title={(
                    <Typography.Text ellipsis={{ cssEllipsis: true }}>
                      {video.Title}
                    </Typography.Text>
                )}
                />
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}
