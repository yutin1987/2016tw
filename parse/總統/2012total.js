var fs = require('fs');

var data = {};

var parse = function (city) {
  var raw = require('../../json/總統/2012/' + city + '.json');

  raw.forEach(function(item) {
    data[city + ';' + item['區別'] + ';' + item['里別']] = {
      '縣市': city,
      '區別': item['區別'],
      '里別': item['里別'],
      '總統': {
        '投票所': item['投票所'],
        '民進黨': item['蔡英文'],
        '國民黨': item['馬英九'],
        '其他政黨': item['宋楚瑜'],
        '有效票數': item['有效票數'],
        '無效票數': item['無效票數'],
        '投票數': item['投票數'],
        '已領未投票數': item['已領未投票數'],
        '發出票數': item['發出票數'],
        '用餘票數': item['用餘票數'],
        '選舉人數': item['選舉人數'],
        '投票率': item['投票率']
      }
    };
  });
};

var parse2 = function (city) {
  var raw = require('../../json/立委/2012/政黨/' + city + '.json');

  raw['資料'].forEach(function(item) {

    data[city + ';' + item['區別'] + ';' + item['里別']]['立委政黨'] = {
      '投票所': item['投票所'],
      '民進黨': item['民主進步黨'],
      '國民黨': item['中國國民黨'],
      '其他政黨': item['台灣國民會議'] + item['人民最大黨'] + item['台灣團結聯盟'] + item['新黨'] + item['健保免費連線'] + item['綠黨'] + item['親民黨'] + item['中華民國臺灣基本法連線'] + item['台灣主義黨'],
      '有效票數': item['有效票數'],
      '無效票數': item['無效票數'],
      '投票數': item['投票數'],
      '已領未投票數': item['已領未投票數'],
      '發出票數': item['發出票數'],
      '用餘票數': item['用餘票數'],
      '選舉人數': item['選舉人數'],
      '投票率': item['投票率']
    };
  });
};

var cities = ['基隆市','臺北市','新北市','桃園縣','新竹市','新竹縣','苗栗縣','臺中市','彰化縣','南投縣','雲林縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣','臺東縣','花蓮縣','宜蘭縣','澎湖縣','金門縣','連江縣'];

for (var i = 0; i < cities.length; i++) {
  parse(cities[i]);
}

for (var i = 0; i < cities.length; i++) {
  parse2(cities[i]);
}

var results = [];

for (var key in data) {
  if (data.hasOwnProperty(key)) {
    results.push(data[key]);
  }
}

fs.writeFileSync('total.json', JSON.stringify(results, null, 2));