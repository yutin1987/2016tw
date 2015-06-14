var XLS = require('xlsjs');
var fs = require('fs');

// var city = process.argv[2];

var parse = function (city) {
  var workbook = XLS.readFile('../../raw/總統/2012/' + city + '.xls');
  var sheet = workbook.Sheets[workbook.SheetNames[0]];

  var index = 7;
  var area = '';
  var data = [];
  while(sheet['N' + index]) {
    if (sheet['A' + index] && sheet['A' + index].v.trim()) {
      area = sheet['A' + index].v.trim();
    } else if (sheet['B' + index]){
      var item = {
        '區別': area,
        '里別': sheet['B' + index].v.trim(),
        '投票所': sheet['C' + index].v.trim(),
        '蔡英文': sheet['D' + index].v,
        '馬英九': sheet['E' + index].v,
        '宋楚瑜': sheet['F' + index].v,
        '有效票數': sheet['G' + index].v,
        '無效票數': sheet['H' + index].v,
        '投票數': sheet['I' + index].v,
        '已領未投票數': sheet['J' + index].v,
        '發出票數': sheet['K' + index].v,
        '用餘票數': sheet['L' + index].v,
        '選舉人數': sheet['M' + index].v,
        '投票率': sheet['N' + index].v
      };
      data.push(item);
    }
    index += 1;
  }

  fs.writeFileSync('../../json/總統/2012/' + city + '.json', JSON.stringify(data, null, 2));
};


var cities = ['基隆市','臺北市','新北市','桃園縣','新竹市','新竹縣','苗栗縣','臺中市','彰化縣','南投縣','雲林縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣','臺東縣','花蓮縣','宜蘭縣','澎湖縣','金門縣','連江縣'];

for (var i = 0; i < cities.length; i++) {
  parse(cities[i]);
}