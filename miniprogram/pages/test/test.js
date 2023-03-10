var t = require("../../utils/module"),
  a = t(require("../../questions.js")),
  i = t(require("../../mainInfo.js")),
  s = require("../../tipInfo.js");

Page({
  data: {

    images: {
      testTitle: "/images/test_title.png",
      save: "/images/save.png",
      share: "/images/share.png",
      restart: "/images/restart.png"
    },
    currentQ: 0,
    totalQuizzes: 10,
    answers: [],
    score: 0,
    page: "test",
    withAd: !0,
    city: "shanghai",
    writePhotosAlbumStatus: 0
  },

  generateData() {
    // 去重
    var set = new Set()
    var a = []
    while (set.size < this.data.totalQuizzes) {
      // 随机四种垃圾类别
      var i = Math.floor(4 * Math.random()),
        o = this.data.data[i][Math.floor(Math.random() * this.data.data[i].length)];
      if (!set.has(o.n)) {
        set.add(o.n)
        o.c = parseInt(o.c), a.push(o);
      }
    }
    this.setData({
      quizzes: a
    }); 
    console.log(set)
  },

  onLoad: function (t) {
    this.initData();
    // this.generateData();
    var n = this;
    wx.getSetting({
      success: function (t) {
        void 0 === t.authSetting["scope.writePhotosAlbum"] ? n.setData({
          writePhotosAlbumStatus: 0
        }) : !0 === t.authSetting["scope.writePhotosAlbum"] ? n.setData({
          writePhotosAlbumStatus: 1
        }) : !1 === t.authSetting["scope.writePhotosAlbum"] && n.setData({
          writePhotosAlbumStatus: 2
        });
      }
    }), wx.showShareMenu({
      withShareTicket: !0
    }), void 0 !== t.source && "chengjidan" === t.source && (0, s.log)(201, "");
  },
  initData: function () {
    void 0 === wx.getStorageSync("city") || 0 === wx.getStorageSync("city").length ? wx.setStorageSync("city", this.data.city) : this.setData({
      city: wx.getStorageSync("city")
    });
    this.setData({
      tipInfo: s.tipInfo,
      config: i.default
    })
  },
  onShow: function () {
    wx.getStorageSync("city") !== this.data.city && this.setData({
      city: wx.getStorageSync("city")
    });
    (
      this.setData({
        tipInfo: s.tipInfo
      }), this.updateData(), this.restart());
  },
  onShareAppMessage: function (t) {
    return {
      title: "全国垃圾分类统一考试",
      path: "/pages/test/test",
      imageUrl: "../../images/cover_test.png"
    };
  },
  select: function (t) {
    var a = this,
      e = t.currentTarget.dataset.quizIndex;
    //console.log(t)
    if (void 0 === this.data.answers[e]) {
      var i = e,
        s = parseInt(t.currentTarget.dataset.optionIndex),
        o = this.data.answers;
      //console.log(o)
      if (o[i] = s, this.setData({
          currentQ: ++i,
          answers: o
        }), i > this.data.totalQuizzes - 1) {
        var n = 0;
        o.forEach(function (t, e) {
          // trick: && 左边满足会判断右边 
          t === parseInt(a.data.quizzes[e].c) - 1 && (n += 1 / a.data.totalQuizzes * 100);
        }), this.setData({
          score: n,
          showShare: !1
        });
      }
    }
  },
  restart: function (t) {
    this.generateData();
    this.setData({
      currentQ: 0,
      answers: [],
      score: 0,
      showShare: !0
    });
  },
  share: function () {},
  toIndex: function () {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  withAd: function () {
    this.setData({
      withAd: !0,
      page: "test"
    });
  },
  withoutAd: function () {
    this.setData({
      withAd: !1,
      page: "testNoAd"
    });
  },
  closeAd: function () {
    this.setData({
      withAd: !1,
      page: "testNoAd"
    });
  },
  updateData: function () {
    var t = [];
    for (var i in a.default.data) {
      var s = a.default.data[i];
      t.push(s);
    }
    console.log(t)
    this.setData({
      data: t
    });
  }
});