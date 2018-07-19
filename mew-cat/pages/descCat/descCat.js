// pages/descCat/descCat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cat: {
      name:'橘猫',
      desc:'案件丢哦啊和精神都i啊哈ui啊厚度啊是大'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
  },

  bindchange:function(e){
    console.log(e.detail.current);
    var cat_new = [{
      name:'橘猫',
      desc:'长得小巧可爱'
    },
    {
      name:'橘猫',
      desc:'长得小巧可爱'
    },
    {
      name:'橘猫',
      desc:'长得小巧可爱'
    }];
    var that = this;
    var cat_num = e.detail.current
    that.setData({
      'cat.name':cat_new[cat_num].name,
      'cat.desc':cat_new[cat_num].desc
    })

  }
 
})