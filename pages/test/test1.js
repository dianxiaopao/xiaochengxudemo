// pages/test/test1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    page :1,
    limit:10
  },
getinfo:function(message){
  let that = this;
  wx.request({
    url: 'http://cnodejs.org/api/v1/topics', //仅为示例，并非真实的接口地址
    data: {
      page: that.data.page,
      limit: that.data.limit
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.data)
      if (that.data.page == 1){
        that.setData({
          array: res.data.data
        })
      }else{
        if (res.data.data.length==0){
          wx.showToast({
            title: '没有数据了',
          })
        }
        that.setData({
          array: that.data.array.concat(res.data.data)
        })
      }
   
    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getinfo("正在加载数据")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: 1
    })
    this.getinfo("正在加载数据")
    //此处强制 结束下拉，使下拉回去
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      page: this.data.page + 1
    })
    this.getinfo("正在加载数据")
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})