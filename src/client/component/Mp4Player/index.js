import React, { useEffect, useRef } from 'react';
import Player, { Events } from 'xgplayer';

import './index.css';

const empty = () => {};

const Mp4XGPlayer = (props) => {
  const {
    config = {
      id: 'mse',
      url: '',
    },
    format = 'mp4',
    playerInit = empty,
    rootStyle = {},
    readyHandle = empty,
    completeHandle = empty,
    destroyHandle = empty,
    onplayHandle = empty,
    onCreateHandle = empty,
    className,
    index,
  } = props;
  const domRef = useRef(null);
  const lastConfig = useRef();

  const init = (innerProps) => {
    const { config: _config } = innerProps;
    if (_config?.url && _config.url !== '') {
      const player = new Player(_config) || {};
      player.once('ready', () => {
        readyHandle();
      });
      player.once('complete', () => {
        completeHandle();
      });
      player.once('destroy', () => {
        destroyHandle();
      });
      playerInit(player);
      onCreateHandle(index, player);
      player.on(Events.PLAY, () => {
        onplayHandle(player);
      });
    }
  };

  useEffect(() => {
    if (JSON.stringify(lastConfig.current) === JSON.stringify(config)) {
      return;
    }
    lastConfig.current = config;
    if (domRef.current) {
      const _config = {
        el: domRef.current,
        closePauseVideoFocus: true,
        plugins: [{
          mobile: {
            gestureX: true,
            gestureY: true,
            gradient: 'none',
            pressRate: 2,
          },
        }]
      };
      const _props = { ...props };
      _props.config = { ...config, ..._config };
      init(_props);
    }
  }, [config, format]);

  return <div ref={domRef} style={rootStyle} className={`mp4-player ${className}`} />;
};

export default Mp4XGPlayer;
