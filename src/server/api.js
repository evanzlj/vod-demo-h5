const api = require('@volcengine/openapi');
const express = require('express');
const _ = require('lodash');
const { ERROR_CODE } = require('./constant');
const { AK, SK } = require('./config');

const {
  INTERNAL_SERVER_ERROR,
  VIDEO_INFOS_ERROR,
} = ERROR_CODE;

const { vodOpenapi } = api;
const apiRouter = express.Router();

// 使用默认的service实例 也可以创建一个新实例 const vodOpenapiService = new vodOpenapi.VodService();
const vodOpenapiService = vodOpenapi.defaultService;

// 设置AK/SK
// 可登陆到火山引擎控制台后，从 https://console.volcengine.com/iam/keymanage/ 中获取
vodOpenapiService.setAccessKeyId(AK);
vodOpenapiService.setSecretKey(SK);

apiRouter.get('/SearchVideo', async (req, res) => {
  let openApiRes;
  try {
    openApiRes = await vodOpenapiService.fetchOpenAPI({
      Action: 'SearchVideo',
      Version: '2021-01-01',
      query: {
        ...req.query,
      },
    });
  } catch (e) {
    console.log('[error](vodOpenapiService)(SearchVideo): ', e);
    res.send({ success: false, errorCode: INTERNAL_SERVER_ERROR });
    return;
  }
  const videoInfos = _.get(openApiRes, 'Result.VideoSet.VideoInfos', []);
  if (!Array.isArray(videoInfos) || videoInfos.length === 0) {
    console.log('[error](vodOpenapiService)(SearchVideo): videoInfos is empty.');
    res.send({ success: false, errorCode: VIDEO_INFOS_ERROR });
    return;
  }
  try {
    const detail = await Promise.all(
      videoInfos.map(video => vodOpenapiService
        .GetPlayInfo({
          Vid: video.Vid,
        })
        .then(item => ({
          Vid: video.Vid,
          PosterUrl: _.get(video, 'BasicInfo.PosterUrl', ''),
          PlayUrl: _.get(item, 'Result.PlayInfoList[0].MainPlayUrl', ''),
          Title: _.get(video, 'BasicInfo.Title', ''),
        })))
    );
    res.send({ success: true, result: detail });
  } catch (e) {
    console.log('[error](vodOpenapiService)(GetPlayInfo): ', e);
    res.send({ success: false, errorCode: INTERNAL_SERVER_ERROR });
  }
});
module.exports = apiRouter;
