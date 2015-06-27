var csv = require('csv');
var fs = require('fs');

var citys = [];

var parse = function (city) {
  var raw = require('../../json/總統/2012/' + city + '.json');

  var data = {};
  data.name = city;
  data['民進黨'] = 0;
  data['國民黨'] = 0;
  data['親民黨'] = 0;
  data['無效票'] = 0;
  data['已領未投'] = 0;
  data['未領票'] = 0;

  raw.forEach(function(item) {
    data['民進黨'] += item['蔡英文'];
    data['國民黨'] += item['馬英九'];
    data['親民黨'] += item['宋楚瑜'];
    data['無效票'] += item['無效票數'];
    data['已領未投'] += item['已領未投票數'];
    data['未領票'] += item['用餘票數'];
  });

  citys.push(data);
};

var cities = ['基隆市','臺北市','新北市','桃園縣','新竹市','新竹縣','苗栗縣','臺中市','彰化縣','南投縣','雲林縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣','臺東縣','花蓮縣','宜蘭縣','澎湖縣','金門縣','連江縣'];

for (var i = 0; i < cities.length; i++) {
  parse(cities[i]);
}

fs.writeFileSync('sunburst2.json', JSON.stringify(citys, null, 2));