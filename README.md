# 贪吃蛇小游戏（第二版）
![home](https://raw.githubusercontent.com/caohuilin/Snake_React_v2/develop/title.jpg)

一年半前层用react写过贪吃蛇小游戏（https://github.com/caohuilin/Snake_React）
那时刚刚学习React的我兴奋的尝试了很久
近些日子比较清闲，想着用学到的东西重新写个版本，于是V2就来了（https://caohuilin.github.io/Snake_React_v2/）

## 概述

React生态圈技术实现网页版贪吃蛇小游戏。模拟游戏机界面，传统的游戏模式，找回小时候的回忆！

## 游戏规则

贪吃蛇大家都不陌生了，吃掉一个食物，蛇的身体会变长，食物随机出现在屏幕的另一个位置。碰到自己或者碰到墙壁游戏结束。
注意一点就是设置目前只支持游戏模式的设置。
点击设置按钮后，点击左键或者右键进行模式切换。

## 项目安装部署

### Install

```
yarn install
```

### Start Serve

It's served in http://localhost:3000 .
```
yarn run serve
```

### Build

```
yarn run build
```

## 游戏思路介绍

### 基础项目搭建

采用webpack、gulp构建工具，搭建React开发脚手架

### 游戏界面划分

- 设计游戏界面（游戏界面分为标题，主界面，按键三部分组成）
- 根据划分的界面构建组件

###  基础组件界面实现
- Header采用蛇身体部分元素展示
- 主界面分为游戏屏幕界面和游戏过程中信息展示界面
- 按键界面主要为游戏方向控制键，游戏开始键和游戏设置相关键

### 让蛇动起来

- 定义snake初始值和初始方向
- snake初始值为游戏界面随机相邻的两个点

```
const index = modal === 1 ? 3 : 1;// modal为游戏模式
const x = Math.floor(Math.random() * (column - index)) + 1;// column为根据屏幕大小计算出的游戏界面的高度
const y = Math.floor(Math.random() * (Row - index)) + 1;// Row为游戏界面的宽度
const ISnakeRecord = Immutable.Record({
snake: Immutable.fromJS([
  {
    x: x,
    y: y
  }, {
    x: x,
    y: y - 1
  }
])
});
const IDirectionRecord = Immutable.Record({
snake: 3
});
```

- 定义设置snake的action
```
export const setSnackDirection = createAction('set snake direction');
```

- 开始游戏后，每500ms计算蛇下一个的位置
```
// goNext函数为计算snake下一个的位置，并触发设置snake的action，组件重新加载，从而模拟蛇前进的动画。
startGame = () => {
  if (this.timer ) { clearInterval(this.timer); }
  this.timer = setInterval(this.goNext, 500);
}
```

### 监听按键，改变蛇的运动方向
- 定义设置snake方向的action
```
export const setSnackDirection = createAction('set snake direction');
```
- DOM监听KeyDown事件
```
<div className='app' onKeyDown={this.keyDown} tabIndex={0}>
  ...
</div>
```
- keyDown事件的实现
除了改变蛇的方向的按键之外，还实现了游戏开始，游戏结束，游戏暂停，重新开始游戏，设置游戏模式等按键的监听，实现方式基本差不多，只是触发不同的action，改变不同的reducer
```
handleKeyDown = (code) => {
// init 为游戏当前所处状态，只有当初始化动画显示完毕开始游戏之后，方向键才起相应作用
  const init = this.props.game.get('init');
  if (code === 1) {
    this.props.actions.setVolume();
  } else if (init === 0) {// 初始化完毕
    if (code === 2 || code === 0 ) {// 开始游戏
      this.props.actions.setGameInit(1);
      this.props.actions.clearCode();
      this.props.actions.startGame();
    } else if (code === 3) {// 设置游戏模式
      this.props.actions.setGameInit(-2);
    }
  } else if (init === 1) {// 游戏中
    let direction = this.props.direction.get('snake');
    if (code === 38 && direction !== 1) {
      direction = 0;
    } else if (code === 40 && direction !== 0) {
      direction = 1;
    } else if (code === 37 && direction !== 3) {
      direction = 2;
    } else if (code === 39 && direction !== 2) {
      direction = 3;
    } else if (code === 32) {
      this.props.actions.pauseGame();
    } else if (code === 4) {
      this.props.actions.pauseGame({pause: true});
    } else if (code === 2) {
      this.props.actions.pauseGame({pause: false});
      this.props.actions.startGame();
    } else if (code === 0) {
      this.props.actions.endGame();
      this.props.actions.setGameInit(-1);
      this.props.actions.initSnack();
      setTimeout(this.handleKeyDown.bind(null, 2), 0);
    }
    this.props.actions.setSnackDirection(direction);
  } else if (init === -2) {// 设置游戏模式
    if (code === 37 || code === 39) {
      this.props.actions.setModal();
    } else if (code === 2) {
      this.props.actions.setGameInit(1);
      this.props.actions.startGame();
    }
  } else if (init === -1 && code === 2) {// 初始化中
    setTimeout(this.handleKeyDown.bind(null, 2), 0);
  }
}
keyDown = (event: any) => {
  const code = event.nativeEvent.keyCode;
  this.handleKeyDown(code);
}
```

### 食物的产生

- 初始化食物的位置
```
const index = modal === 1 ? 3 : 1;
const x =  Math.floor(Math.random() * (column - index)) + 1;
const y =  Math.floor(Math.random() * (Row - index)) + 1;
const IFoodRecord = Immutable.Record({
food: Immutable.fromJS(
  {
    x: x,
    y: y
  }
)
});
```

- 定义重新设置食物位置的action
```
export const setFood = createAction('set food');
```

- 让食物闪动起来
每隔200ms改变食物是否显示的样式，制造食物闪动的效果
```
this.foodTimer = setInterval(this.setFoodShowOrHide, 200);
setFoodShowOrHide = () => {
  this.setState({ showFood: !this.state.showFood});
}
<div className={`cell ${showFood ? 'food-o-cell' : 'food-cell'}`}></div>
```

- 判断snake头部下一个位置是否为食物的位置，若为食物的位置，蛇的长度+1，出发重新设置食物位置的action
```
  if (next.x !== currentFood.x || next.y !== currentFood.y) {
    currentSnake.pop();
  } else {
    this.props.actions.getCode();
    this.props.actions.setFood();
  }
```  
### 分数展示

初始设置分数为0，每一次判断到snake头部下一个位置是否为食物时，分数+1

### 模式选择

在设置模式下，左右按键实现模式切换

### 试玩

https://caohuilin.github.io/Snake_React_v2/

![game](https://raw.githubusercontent.com/caohuilin/Snake_React_v2/develop/game.png)

### 补充

基本功能已经实现，难免有处理不当或者没有考虑到的界限问题，欢迎提Issue，https://github.com/caohuilin/Snake_React_v2
祝大家玩的愉快！
