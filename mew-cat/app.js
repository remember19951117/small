//app.js
App({
  onLaunch: function() {
    wx.login({
      success: function(res) {
        wx.getSetting({
          success(setRes) {
            console.log(12333)
            // 判断是否已授权  
            if (!setRes.authSetting['scope.userInfo']) {
              console.log(123)
              // 授权访问  
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  //获取用户信息  
                  wx.getUserInfo({
                    lang: "zh_CN",
                    success: function(userRes) {
                      //发起网络请求  
                      wx.request({
                        url: 'http:127.0.0.1:8080/mew-cat/wap/user/getUserInfo',
                        data: {
                          code: res.code,
                          encryptedData: userRes.encryptedData,
                          iv: userRes.iv
                        },
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'POST',
                        //服务端的回掉  
                        success: function(result) {
                          var data = result.data.result;
                          data.expireTime = nowDate + EXPIRETIME;
                          wx.setStorageSync("userInfo", data);
                          userInfo = data;
                        }
                      })
                    }
                  })
                }
              })
            } else {
              console.log(res)
              //获取用户信息  
              wx.getUserInfo({
                lang: "zh_CN",
                success: function(userRes) {
                  
                  //发起网络请求  
                  wx.request({
                    url: 'http:127.0.0.1:8080/mew-cat/wap/user/getUserInfo',
                   
                    data: {
                      
                      openid: 12323,
                      realname: 999
                    },
                    header: {
                      "Content-Type": "application/json"
                    },
                    method: 'POST',
                    success: function(result) {
                      var data = result.data.result;
                      data.expireTime = nowDate + EXPIRETIME;
                      wx.setStorageSync("userInfo", data);
                      userInfo = data;
                    }
                  })
                }
              })
            }

            wx.setTabBarStyle({
              color: '#929292',
              selectedColor: '#904617',

              borderStyle: 'white'
            })
          }
        })
      }
    })
  },
  getMyPorition: function() {
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        that.globalData.longitude = res.longitude;
        that.globalData.latitude = res.latitude;
      },
    })
  },
  globalData: {
    userInfo: null
  }

})