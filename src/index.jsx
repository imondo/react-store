import React from 'react';
import dva, { connect } from 'dva';
import dvaModel from './store/dva';
import DvaDemo from './Dva.jsx';

const createHistory = require("history").createHashHistory

const history = createHistory()

// 创建应用
const app = dva({
  history: createHistory()
});
app.model(dvaModel)
// 注册视图
app.router(() => <DvaDemo />);
// 启动应用
app.start('#app');