//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    Height: 0,
    scale: 13,
    latitude: "",
    longitude: "",
    markers: [],
    circles: [],
    fixed_map_data:{
      width: 30,
      height: 30,
      iconPath: "/images/ic_location.png",
      callout: {
        color: '#b3977c',
        content: '我的位置',
        fontSize: 16,
        borderRadius: 5,
        bgColor: '#FFFFFF',
        padding: 10,
        textAlign: 'center',
        display: "ALWAYS"
      }
    }
  },

  onLoad: function () {
    console.log(this.data.fixed_map_data)
    var _this = this;
    /*数据测试
    // var newMarker = {};
    // var marker
    // newMarker = [{"id":"1"},{"id":"3"}]
    // for (var p in newMarker) {//遍历json数组时，这么写p为索引，0,1
    //   var id = newMarker[p].id;
      
    //   marker = [{id: id}]
    // }
    */
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
         console.log(res)
        // console.log(res.longitude)

        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: _this.data.markers.concat([{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            width: 30,
            height: 30,
            iconPath: "/images/ic_location.png",
            callout: {
              color: '#b3977c',
              content: '我的位置',
              fontSize: 16,
              borderRadius: 5,
              bgColor: '#FFFFFF',
              padding: 10,
              textAlign: 'center',
              display: "ALWAYS"
            }
          },
          {
            id: "2",
            latitude: 34.755,
            longitude: 113.67839,
            width: 30,
            height: 30,
            iconPath: "/images/ic_location.png",
            callout: {
              color: '#b3977c',
              content: '橘猫',
              fontSize: 16,
              borderRadius: 5,
              bgColor: '#FFFFFF',
              padding: 10,
              textAlign: 'center',
              display: "ALWAYS"
            },
           
          },
          {
            id: "3",
            latitude: 34.753,
            longitude: 113.679,
            width: 30,
            height: 30,
            iconPath: "/images/ic_location.png",
            callout: {
              color: '#b3977c',
              content: '黑猫',
              fontSize: 16,
              borderRadius: 5,
              bgColor: '#FFFFFF',
              padding: 10,
              textAlign: 'center',
              display: "ALWAYS"
            },

          },
          {
            id: "2",
            latitude: 34.7532,
            longitude: 113.676,
            width: 30,
            height: 30,
            iconPath: "/images/ic_location.png",
            callout: {
              color: '#b3977c',
              content: '小红',
              fontSize: 16,
              borderRadius: 5,
              bgColor: '#FFFFFF',
              padding: 10,
              textAlign: 'center',
              display: "ALWAYS"
            },

          }
          ])
        })
      },
    })
    

  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },

  // 点击merkers
  markertap(e) {
    console.log(e.markerId);
    // wx.showActionSheet({
    //   itemList: ["A"],
    //   success: function (res) {
    //     console.log(res.tapIndex)

    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
    wx.navigateTo({
      url: '/pages/descCat/descCat?id=e.markerId'
    })
  },
  
  to_my_position:function(){
    var that = this 
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  fdcat:function(){
    wx.navigateTo({
      url: '/pages/addCat/addCat'
    })
  }
  //点击缩放按钮动态请求数据
  // controltap(e) {
  //   var that = this;
  //   console.log("scale===" + this.data.scale)
  //   if (e.controlId === 1) {
  //     // if (this.data.scale === 13) {
  //     that.setData({
  //       scale: --this.data.scale
  //     })
  //     // }
  //   } else {
  //     //  if (this.data.scale !== 13) {
  //     that.setData({
  //       scale: ++this.data.scale
  //     })
  //     // }
  //   }
  // },


})