import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@arco-design/web-react';
import { pageTabs } from './config';
import './index.css';

const { Row } = Grid;
const { Col } = Grid;

function Home() {
  return (
    <div className="homeWrapper">
      <div className="vod-title">
        火山引擎VoD
      </div>
      <div className="vod-desc">
        体验一站式视频点播解决方案
      </div>
      <Row gutter={[36, 36]}>
        {pageTabs.map(item => (
          <Col key={JSON.stringify(item)} style={{ marginBottom: 24 }} span={12}>
            <Link to={item.link}>
              <div className="iconWrapper">
                <img src={item.picSrc} className="icon" alt={item.picAlt} />
                <div className="title">{item.name}</div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
