import React from 'react';
import {
  Card, Skeleton, Typography
} from '@arco-design/web-react';
import { skeletonPic } from '../constant';
import './index.css';

const { Meta } = Card;

const Loading = () => (
  <div>
    {
      new Array(5).fill(0).map(() => (
        <Card
          className="loadingCard"
          cover={(
            <Skeleton
              loading
              text={{ rows: 0 }}
              animation
              image={{ style: { width: 1000, height: 280, margin: '16px 16px 0 16px' } }}
            >
              <div
                style={{
                  height: 280,
                  overflow: 'hidden',
                }}
              >
                <img
                  style={{ width: '100%', transform: 'translateY(-20px)' }}
                  alt="dessert"
                  src={skeletonPic}
                />
              </div>
            </Skeleton>
            )}
        >
          <Meta
            avatar={(
              <Skeleton
                style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}
                loading
                text={{ rows: 1, width: 'calc(100vw - 104px)' }}
                image={{ shape: 'circle', style: { width: 24, height: 24 } }}
                animation
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography.Text>Video</Typography.Text>
                </div>
              </Skeleton>
              )}
          />
        </Card>
      ))
    }

  </div>
);


export default Loading;
