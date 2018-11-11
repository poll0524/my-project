// const API_HOST = "http://119.23.49.239:3000/mock/104";
// const API_HOST = "http://192.168.0.127:9006/api/healthHeadlines/v1";
const API_HOST = "https://api.maxbutterfly.com/api/healthHeadlines/v1";


function ajax(fn, url, method, data, header) {
  wx.request({
    url: API_HOST + url ,
    method: method ? method : "GET",
    data: data ? data : {},
    header: header ? header : { "Content-Type": "application/json" },
    success: function (res) {
      fn(res.data);
    }
  })
}

module.exports = {
  ajax: ajax
}