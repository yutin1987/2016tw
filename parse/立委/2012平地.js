var XLS = require('xlsjs');
var fs = require('fs');

var parse = function (city) {
  var workbook = XLS.readFile('../../raw/立委/2012/平地/立委-A05-4-平地(' + city + ').xls');

  var sheet = workbook.Sheets[workbook.SheetNames[0]];
  var candidate = [];
  var i = 3;
  while(sheet[String.fromCharCode(65 + i) + '3']) {
    var value = sheet[String.fromCharCode(65 + i) + '3'].v;
    value = value.split('\n');
    candidate.push({
      '姓名': value[1],
      '政黨': value[2]
    });
    i += 1;
  }

  var pos = 67 + candidate.length;
  var area = '';
  var data = [];
  var index = 7;
  while(sheet['D' + index]) {
    if (sheet['A' + index] && sheet['A' + index].v.trim()) {
      area = sheet['A' + index].v.trim();
    } else if (sheet['B' + index]){

      var item = {
        '區別': area,
        '里別': sheet['B' + index].v.trim(),
        '投票所': sheet['C' + index].v,
        '有效票數': sheet[String.fromCharCode(pos + 1) + index].v,
        '無效票數': sheet[String.fromCharCode(pos + 2) + index].v,
        '投票數': sheet[String.fromCharCode(pos + 3) + index].v,
        '已領未投票數': sheet[String.fromCharCode(pos + 4) + index].v,
        '發出票數': sheet[String.fromCharCode(pos + 5) + index].v,
        '用餘票數': sheet[String.fromCharCode(pos + 6) + index].v,
        '選舉人數': sheet[String.fromCharCode(pos + 7) + index].v,
        '投票率': sheet[String.fromCharCode(pos + 8) + index].v
      };

      

      for (var x = 0; x < candidate.length; x++) {
        item[candidate[x].姓名] = sheet[String.fromCharCode(68 + x) + index].v;
      }

      data.push(item);
    }
    index += 1;
  }

  fs.writeFileSync('../../json/立委/2012/平地/' + city + '.json', JSON.stringify({
    '參選人': candidate,
    '資料': data
  }, null, 2));
};

var cities = ['基隆市','臺北市','新北市','桃園縣','新竹市','新竹縣','苗栗縣','臺中市','彰化縣','南投縣','雲林縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣','臺東縣','花蓮縣','宜蘭縣','澎湖縣','金門縣','連江縣'];

for (var i = 0; i < cities.length; i++) {
  parse(cities[i]);
}