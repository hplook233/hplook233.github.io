$(window).on('load',function(){
  var lang = loadLanguage();
  setCss(lang);
  setLanguageLinks(lang);
  setStaticText(lang);
});

function setCss(lang) {
  if (lang == 'mm') {
    $('#quakelevel_info table#qukelevel_table td.qukelevel_table_level').css({
      "line-height": "1.6"
    });
  }
}

function setLanguageLinks(lang) {
  document.getElementById('breadcrumb_home').href = document.getElementById('breadcrumb_home').href + "?lang=" + lang;
  document.getElementById('breadcrumb_list').href = document.getElementById('breadcrumb_list').href + "?lang=" + lang;
}

function setStaticText(lang) {
  $.support.cors = true;
  $.getJSON('../data/dictionary/' + lang + '.json')
  .done(function(json) {
    document.title = json.jma + ' | ' + json.earthquakeInformation;
    document.getElementById('menu_title').innerHTML = json.earthquakeInformation;
    document.getElementById('breadcrumb_home').innerHTML = json.home;
    document.getElementById('breadcrumb_list').innerHTML = json.earthquakeInformation;
    document.getElementById('breadcrumb_advisory').innerHTML = json.explanationOfTheSeismicIntensity;
    document.getElementById('header').innerHTML = json.earthquakeInformation + " : " + json.explanationOfTheSeismicIntensity;
    var intensity0 = " 0";
    var intensity1 = " 1";
    var intensity2 = " 2";
    var intensity3 = " 3";
    var intensity4 = " 4";
    var intensity5m = " 5-";
    var intensity5p = " 5+";
    var intensity6m = " 6-";
    var intensity6p = " 6+";
    var intensity7 = " 7";
    if (lang == "jp") {
      intensity0 = "0";
      intensity1 = "1";
      intensity2 = "2";
      intensity3 = "3";
      intensity4 = "4";
      intensity5m = "5蠑ｱ";
      intensity5p = "5蠑ｷ";
      intensity6m = "6蠑ｱ";
      intensity6p = "6蠑ｷ";
      intensity7 = "7";
    }
    document.getElementById('quake_level0').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity0;
    document.getElementById('quake_level1').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity1;
    document.getElementById('quake_level2').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity2;
    document.getElementById('quake_level3').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity3;
    document.getElementById('quake_level4').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity4;
    document.getElementById('quake_level5m').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity5m;
    document.getElementById('quake_level5p').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity5p;
    document.getElementById('quake_level6m').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity6m;
    document.getElementById('quake_level6p').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity6p;
    document.getElementById('quake_level7').innerHTML = "<span>" + json.seismicIntensity + "</span>" + intensity7;
    document.getElementById('quakeinfo_level0').innerHTML = json.explanationOfTheSeismicIntensity0;
    document.getElementById('quakeinfo_level1').innerHTML = json.explanationOfTheSeismicIntensity1;
    document.getElementById('quakeinfo_level2').innerHTML = json.explanationOfTheSeismicIntensity2;
    document.getElementById('quakeinfo_level3').innerHTML = json.explanationOfTheSeismicIntensity3;
    document.getElementById('quakeinfo_level4').innerHTML = json.explanationOfTheSeismicIntensity4;
    document.getElementById('quakeinfo_level5m').innerHTML = json.explanationOfTheSeismicIntensity5m;
    document.getElementById('quakeinfo_level5p').innerHTML = json.explanationOfTheSeismicIntensity5p;
    document.getElementById('quakeinfo_level6m').innerHTML = json.explanationOfTheSeismicIntensity6m;
    document.getElementById('quakeinfo_level6p').innerHTML = json.explanationOfTheSeismicIntensity6p;
    document.getElementById('quakeinfo_level7').innerHTML = json.explanationOfTheSeismicIntensity7;
    var high = json.resistanceToEarthquakesIsHigh;
    var low = json.resistanceToEarthquakesIsLow;
    if (lang == 'kh') {
      const browser = judgeBrowser();
      if (browser == BROWSER_FIREFOX || browser == BROWSER_IE || browser == BROWSER_EDGE) {
        const lengthHigh = high.length;
        const lengthLow = low.length;
        high = high.slice(0, lengthHigh / 2) + "<br>" + high.slice(lengthHigh / 2);
        low = low.slice(0, lengthLow / 2) + "<br>" + low.slice(lengthLow / 2);
      }
    }
    document.getElementById('img_cap_high6m').innerHTML = high;
    document.getElementById('img_cap_low6m').innerHTML = low;
    document.getElementById('img_cap_high6p').innerHTML = high;
    document.getElementById('img_cap_low6p').innerHTML = low;
    document.getElementById('img_cap_high7').innerHTML = high;
    document.getElementById('img_cap_low7').innerHTML = low;
  })
  .fail(function(jqXHR, textStatus, errorThrown) {

  })
  .always(function() {

  });
}

function onChangeLanguage(lang) {
  top.location.href = '?lang=' + lang;
}
