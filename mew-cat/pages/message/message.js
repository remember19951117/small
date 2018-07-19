// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    arrData:[
      { 'time': '5月2号·下午3:20', 'text': '老子今天心情不是很好，别惹我。', 'image': [ '../../img/dtu1.png','../../img/dtu2.png']},
      { 'time': '5月2号·下午3:20', 'text': '老子今天心情不是很好，别惹我。', 'image': ['../../img/dtu3.png',] },
     

    ],
   auto:{},
   open: true,
   //起点
   mark: 0,
   //终点
   newmark: 0,
   //开关
   istoright: false
  },
  tap_start: function (res) {
    // console.log(res);
    // console.log(res.touches[0].pageX);
    this.data.mark = this.data.newmark = res.touches[0].pageY;
    console.log('起点', this.data.mark, this.data.newmark)

  },
  //利用bindtouchmove判断移动方向
  tap_drag: function (res) {
    var that = this;
    console.log('终点', res.touches[0].pageY);
    //向下
    that.data.newmark = res.touches[0].pageY;
    if (that.data.mark < that.data.newmark) {
      that.data.istoright = true;
    }
    if (that.data.mark > that.data.newmark) {
      that.data.istoright = false;
    }

    // console.log(that.data.istoright);
  },
  //进行对开关的判断
  tap_end: function () {
    var that = this;
    if (that.data.istoright) {
      that.setData({
        open: true
      })
    } else {
      that.setData({
        open: false
      })
    }
    console.log(that.data.open)
  },
  onReady() {

    wx.getUserInfo({
      success: res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo
        })
      }
    });
  },
 
  imageLoad: function (e) {
    var _this = this;
    var $width = e.detail.width,    //获取图片真实宽度  
      $height = e.detail.height,
      ratio = $width / $height;   //图片的真实宽高比例  
    var viewWidth = '',           //设置图片显示宽度，  
      viewHeight = '';    //计算的高度值    
    wx.getSystemInfo({
      success: function (res) {
        viewWidth = 200;
        viewHeight = 200 / ratio
      }
    });
    var image = this.data.auto;
    image[e.target.dataset.index]={
      width: viewWidth,
      height: viewHeight
    } 
    this.setData({
      auto:image
    })
  }  

})
