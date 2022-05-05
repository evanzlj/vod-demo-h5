import React from 'react';
import { ERROR_MAP } from '../constant';
import './index.css';

const ErrorRetry = (props) => {
  const { error } = props;
  const handleRetry = () => {
    window.location.reload();
  };
  return (
    <div className="error-retry">
      <p className="title">{ERROR_MAP[error]}</p>
      <p className="code">
        错误码为：
        {error}
      </p>
      <div className="retry" onClick={handleRetry}>
        重试
      </div>
    </div>
  );
};

export default ErrorRetry;
