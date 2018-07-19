// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    arrData:[
      { 'time': '5月2号·下午3:20', 'text': '猫丢了，呜呜呜呜呜呜，哦度杜克。', 'image': [ '../../img/dtu1.png','../../img/dtu2.png']},
      { 'time': '5月2号·下午3:20', 'text': '几天天气不错。', 'image': ['../../img/dtu3.png',] },
      { 'time': '5月2号·下午3:20', 'text': '树上的鸟儿成双对。', 'image': ['../../img/dtu2.png',] },
     

    ],
   auto:{},
   
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
    wx.request({
      url: 'http:127.0.0.1:8080/mew-cat/wap/cat/getAllCat', //仅为示例，并非真实的接口地址
      data: {
        curPage :3
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  
 
  imageLoad: function (e) {
    var _this = this;
    var ewidth = e.detail.width,    //获取图片真实宽度  
      eheight = e.detail.height,
      ratio = ewidth / eheight;   //图片的真实宽高比例  
    var viewWidth = '',           //设置图片显示宽度，  
      viewHeight = '';    //计算的高度值    
    wx.getSystemInfo({
      success: function (res) {
        viewWidth = 200
        viewHeight = 200/ratio
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
  } , 

  onShareAppMessage: function (res) {
    var that = this;
    //分享的类型为按键类型
    if (res.from == "button") {
      //分享为按键中的求助即id=1
      if (res.target.id == 0) {

        return {
          title: '按键1要分享的标题',
          path: '/pages/logs/logs',
          success: function (res) {

          }
        }

      }
      //分享为按键中的分享即id=2
      if (res.target.id == 1) {
        return {
          title: '按键2要分享的标题',
          path: '/pages/index/index',
          success: function (res) {

          }
        }
      }

    }

    //分享类型中右上角的分享
    else {

      return {
        title: '点击右上角要分享的标题',
        path: '/pages/index/index',
        success: function (res) {

        }
      }


    }

  },

    onLoad: function(option) {
      // 获取接收到的id值
      var getId = option.id;
      // 让接收到的id值传递到data:{}里面
      this.setData({
        currentId: getId
      });
      // 读取所有的文章列表点赞缓存状态
      var cache = wx.getStorageSync('cache_key');
      // 如果缓存状态存在
      if (cache) {
        // 拿到所有缓存状态中的1个
        var currentCache = cache[getId];
        // 把拿到的缓存状态中的1个赋值给data中的collection，如果当前文章没有缓存状态，currentCache 的值就是 false，如果当前文章的缓存存在，那么 currentCache 就是有值的，有值的说明 currentCache 的值是 true
        this.setData({
          collection: currentCache
        })
      } else {
        // 如果所有的缓存状态都不存在 就让不存在的缓存存在
        var cache = {};
        // 既然所有的缓存都不存在，那么当前这个文章点赞的缓存也不存在，我们可以把当前这个文章点赞的缓存值设置为 false
        cache[getId] = false;
        // 把设置的当前文章点赞放在整体的缓存中
        wx.setStorageSync('cache_key', cache);
      }
    },
  // 点击图片的点赞事件 这里使用的是同步的方式
  dianzan: function (event) {
    // 获取所有的缓存
    var cache = wx.getStorageSync('cache_key');
    // 获取当前文章是否被点赞的缓存
    var currentCache = cache[this.data.currentId];
    // 取反，点赞的变成未点赞 未点赞的变成点赞
    currentCache = !currentCache;
    // 更新cache中的对应的1个的缓存值，使其等于当前取反的缓存值
    cache[this.data.currentId] = currentCache;
    // 重新设置缓存
    wx.setStorageSync('cache_key', cache);
    // 更新数据绑定,从而切换图片
    this.setData({
      // collection 默认的是 false
      collection: currentCache
    });
  
  
  }



})
