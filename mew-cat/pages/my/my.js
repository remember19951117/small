// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    number:20,
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
    }

  })
