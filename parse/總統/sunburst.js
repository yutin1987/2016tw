var csv = require('csv');
var fs = require('fs');

var data = {
  name: '全國',
  children: []
};

var ref = {
  '民進黨': {},
  '國民黨': {},
  '親民黨': {},
  '無效票': {},
  '已領未投': {},
  '未領票': {}
};

var parse = function (city) {
  var raw = require('../../json/總統/2012/' + city + '.json');

  ref['民進黨'][city] = {};
  ref['國民黨'][city] = {};
  ref['親民黨'][city] = {};
  ref['無效票'][city] = {};
  ref['已領未投'][city] = {};
  ref['未領票'][city] = {};

  raw.forEach(function(item) {

    if (!ref['民進黨'][city][item['區別']]) {
      ref['民進黨'][city][item['區別']] = 0;
    }

    ref['民進黨'][city][item['區別']] += item['蔡英文'];

    if (!ref['國民黨'][city][item['區別']]) {
      ref['國民黨'][city][item['區別']] = 0;
    }

    ref['國民黨'][city][item['區別']] += item['馬英九'];


    if (!ref['親民黨'][city][item['區別']]) {
      ref['親民黨'][city][item['區別']] = 0;
    }

    ref['親民黨'][city][item['區別']] += item['宋楚瑜'];

    if (!ref['無效票'][city][item['區別']]) {
      ref['無效票'][city][item['區別']] = 0;
    }

    ref['無效票'][city][item['區別']] += item['無效票數'];
    

    if (!ref['已領未投'][city][item['區別']]) {
      ref['已領未投'][city][item['區別']] = 0;
    }

    ref['已領未投'][city][item['區別']] += item['已領未投票數'];
    

    if (!ref['未領票'][city][item['區別']]) {
      ref['未領票'][city][item['區別']] = 0;
    }

    ref['未領票'][city][item['區別']] += item['用餘票數'];
  });
};

var cities = ['基隆市','臺北市','新北市','桃園縣','新竹市','新竹縣','苗栗縣','臺中市','彰化縣','南投縣','雲林縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣','臺東縣','花蓮縣','宜蘭縣','澎湖縣','金門縣','連江縣'];

for (var i = 0; i < cities.length; i++) {
  parse(cities[i]);
}

var parse = function(data) {
  if (data instanceof Object) {
    var children = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] instanceof Object) {
          children.push({
            name: key,
            children: parse(data[key])
          });
        } else {
          children.push({
            name: key,
            value: data[key]
          });
        }
      }
    }
    return children;
  } else {
    return data; 
  }
};

data.children = parse(ref);

fs.writeFileSync('sunburst.json', JSON.stringify(data, null, 2));