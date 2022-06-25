// JavaScript Document

$(function() {
  var navLink = $('#gnav li a');

  var contentsArr = new Array();
  for (var i = 0; i < navLink.length; i++) {
    var targetContents = navLink.eq(i).attr('href');
    if(targetContents.charAt(0) == '#') {
      var targetContentsTop = $(targetContents).offset().top;
      var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
      contentsArr[i] = [targetContentsTop, targetContentsBottom]
    }
  };

  function currentCheck() {
    var windowScrolltop = $(window).scrollTop();
    for (var i = 0; i < contentsArr.length; i++) {
      if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop) {
        navLink.removeClass('current');
        navLink.eq(i).addClass('current');
        i == contentsArr.length;
      }
    };
  }

  $(window).on('load scroll', function() {
    currentCheck();
  });

  navLink.on('click', function() {
    $('html,body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 400);
    return false;
  })
});

(function($) {
    $(function() {
        var $header = $('#top-head');
        // Nav Fixed
        $(window).on("scroll", function() {
            if ($(window).scrollTop() > 350) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });
        $('header').on('click', function(){
          if($header.hasClass('open')) {
            $header.toggleClass('open');
          }
        });
        $('main').on('click', function(){
          if($header.hasClass('open')) {
            $header.toggleClass('open');
          }
        });
        // Nav Toggle Button
        $('#nav-toggle').on('click', function(){
            $header.toggleClass('open');
        });
    });
})(jQuery);

//繝壹�繧ｸ繝医ャ繝励∈
$(function() {
    var topBtn = $('#pagetop');
    topBtn.hide();
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    topBtn.on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

$(window).on('load',function(){
  const lang = loadLanguage();
  setLanguageSelect(lang);
  if (document.getElementById('globalMenuS') != null) {
    setLanguageLinksGeneral(lang);
    setStaticTextGeneral(lang);
  }
});

function setLanguageSelect(lang) {
  var select = document.getElementById('language_select');
  select.value = lang;
}

function setLanguageLinksGeneral(lang) {
  document.getElementById('tab_home').href = document.getElementById('tab_home').href + "?lang=" + lang;
  document.getElementById('tab_warn').href = document.getElementById('tab_warn').href + "?lang=" + lang;
  document.getElementById('tab_yoho').href = document.getElementById('tab_yoho').href + "?lang=" + lang;
  document.getElementById('tab_cyclon').href = document.getElementById('tab_cyclon').href + "?lang=" + lang;
  document.getElementById('tab_tsunami').href = document.getElementById('tab_tsunami').href + "?lang=" + lang;
  document.getElementById('tab_quake').href = document.getElementById('tab_quake').href + "?lang=" + lang;
  document.getElementById('tab_volcano').href = document.getElementById('tab_volcano').href + "?lang=" + lang;
  document.getElementById('tab_cloud').href = selectUrlCloud(lang);
  document.getElementById('tab_kotan').href = selectUrlKotan(lang);
  document.getElementById('tab_sub_landslide').href = selectUrlLandslide(lang);
  document.getElementById('tab_sub_inundation').href = selectUrlInundation(lang);
  document.getElementById('tab_sub_flood').href = selectUrlFlood(lang);
}

function setStaticTextGeneral(lang) {
  var urlPrefix = '../data/dictionary/';
  const urlPostfix = '.json';
  if (isHome()) {
    urlPrefix = './data/dictionary/';
  }
  $.support.cors = true;
  $.getJSON(urlPrefix + lang + urlPostfix)
  .done(function(json) {
    document.getElementById('language_select_label').innerHTML = json.selectLanguage;
    document.getElementById('tab_home').innerHTML = json.home;
    document.getElementById('tab_warn').innerHTML = json.weatherWarningAndAdvisory;
    document.getElementById('tab_yoho').innerHTML = json.weatherForecast;
    document.getElementById('tab_cyclon').innerHTML = json.tropicalCycloneInformation;
    document.getElementById('tab_tsunami').innerHTML = json.tsunamiWarningAndAdvisory;
    document.getElementById('tab_quake').innerHTML = json.earthquakeInformation;
    document.getElementById('tab_volcano').innerHTML = json.eruptionWarningAndForecast;
    document.getElementById('tab_sub_landslide').innerHTML = json.hazardDistribution + ' : ' + json.landslide;
    document.getElementById('tab_sub_inundation').innerHTML = json.hazardDistribution + ' : ' + json.inundation;
    document.getElementById('tab_sub_flood').innerHTML = json.hazardDistribution + ' : ' + json.flood;
    document.getElementById('tab_cloud').innerHTML = json.radarAndNowcasts;
    document.getElementById('tab_kotan').innerHTML = json.radarAndNowcastsShort;
    document.getElementById('copyright').innerHTML = json.jma + ' : ' + json.jmaAddress;

    document.getElementById('icon_jma').setAttribute('alt', json.jma);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {

  })
  .always(function() {

  });
}

function isHome() {
  const pathname = location.pathname;
  const tmp = pathname.split('/');
  const category = tmp[tmp.length - 2];

  return category != 'warn' && category != 'yoho' && category != 'tsunami' && category != 'quake' && category != 'volcano' && category != 'cyclone';
}

JMA_URL_PREFIX = 'https://www.jma.go.jp/bosai/';
JMA_URL_RISK = 'risk/' ;
JMA_URL_CLOUD = 'nowc/';
JMA_URL_KOTAN = 'kaikotan/';
JMA_URL_LANDSLIDE = '#elements:land' ;
JMA_URL_INUNDATION = '#elements:inund' ;
JMA_URL_FLOOD = '#elements:flood' ;

function selectUrlCloud(lang) {
  postfix = '#elements:hrpn' ;
  switch(lang) {
    case 'jp':
      return JMA_URL_PREFIX + JMA_URL_CLOUD + postfix ;
    case 'en':
      return JMA_URL_PREFIX + lang + '_' + JMA_URL_CLOUD + postfix ;
    default:
      return JMA_URL_PREFIX + 'multi_' + JMA_URL_CLOUD + '?lang=' + lang ;
  }
}

function selectUrlKotan(lang) {
  switch(lang) {
    case 'jp':
      return JMA_URL_PREFIX + JMA_URL_KOTAN ;
    case 'en':
      return JMA_URL_PREFIX + lang + '_' + JMA_URL_KOTAN ;
    default:
      return JMA_URL_PREFIX + 'multi_' + JMA_URL_KOTAN + '?lang=' + lang ;
  }
}

function selectUrlLandslide(lang) {
  switch(lang) {
    case 'jp':
      return JMA_URL_PREFIX + JMA_URL_RISK + JMA_URL_LANDSLIDE ;
    case 'en':
      return JMA_URL_PREFIX + lang + '_' + JMA_URL_RISK + JMA_URL_LANDSLIDE ;
    default:
      return JMA_URL_PREFIX + 'multi_' + JMA_URL_RISK + '?lang=' + lang + JMA_URL_LANDSLIDE ;
  }
}

function selectUrlInundation(lang) {
  switch(lang) {
    case 'jp':
      return JMA_URL_PREFIX + JMA_URL_RISK + JMA_URL_INUNDATION ;
    case 'en':
      return JMA_URL_PREFIX + lang + '_' + JMA_URL_RISK + JMA_URL_INUNDATION ;
    default:
      return JMA_URL_PREFIX + 'multi_' + JMA_URL_RISK + '?lang=' + lang + JMA_URL_INUNDATION ;
  }
}

function selectUrlFlood(lang) {
  switch(lang) {
    case 'jp':
      return JMA_URL_PREFIX + JMA_URL_RISK + JMA_URL_FLOOD ;
    case 'en':
      return JMA_URL_PREFIX + lang + '_' + JMA_URL_RISK + JMA_URL_FLOOD ;
    default:
      return JMA_URL_PREFIX + 'multi_' + JMA_URL_RISK + '?lang=' + lang + JMA_URL_FLOOD ;
  }
}

window.addEventListener("pageshow", function(event){
  if (event.persisted) {
    window.location.reload();
  }
});

OS_IPHONE = 'iphone';
OS_MAC = 'mac';
OS_WINDOWS = 'windows';
OS_OTHER = 'other';

setLayout();

function setLayout() {
  if (judgeOs() == OS_MAC) {
    $('select').css({
        "-webkit-appearance": "menulist-button",
        "height": "32px"
    });
  }
  else if (judgeOs() == OS_IPHONE) {
    $('select').wrapInner('<optgroup label=""></optgroup>');
  }
  else if (judgeOs() == OS_WINDOWS) {
    $('select').css({
        "height": "30px"
    });
  }
  else {
    $('select').css({
        "height": "24px"
    });
  }
}

function judgeOs() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.match(/iphone/)) {
    return OS_IPHONE;
  }
  else if (userAgent.match(/mac os x/)) {
    return OS_MAC;
  }
  else if (userAgent.match(/windows/)) {
    return OS_WINDOWS;
  }

  return OS_OTHER;
}

function isPc() {
  if (window.parent.screen.width >= 480) {
    return true;
  }

  return false;
}
