proj4.defs([
    ["EPSG:4301", //譚ｱ莠ｬ貂ｬ蝨ｰ邉ｻ/譌･譛ｬ貂ｬ蝨ｰ邉ｻ SRID=4301
        "+proj=longlat +ellps=bessel +towgs84=-146.414,507.337,680.507,0,0,0,0 +no_defs"
    ]
]);

Number.isNaN = Number.isNaN || function(any) {
  return typeof any === 'number' && isNaN(any);
};

function convertLonLat(lonStr, latStr, isForeign) {
  var lon = 0.0;
  var lat = 0.0;
  if (lonStr.match(/E/)) {
    lon = Number(lonStr.replace(/E/g, ''));
  }
  else if (lonStr.match(/W/)) {
    lon = Number(lonStr.replace(/W/g, '')) * -1;
  }
  else {
    lon = Number(lonStr);
  }

  if (latStr.match(/N/)) {
    lat = Number(latStr.replace(/N/g, ''));
  }
  else if (latStr.match(/S/)) {
    lat = Number(latStr.replace(/S/g, '')) * -1;
  }
  else {
    lat = Number(latStr);
  }
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return null;
  }
  if (isForeign == false) {
    return tokyo2world(lon, lat);
  }
  else {
    return [lon, lat];
  }
}

/**
 * tokyo2world(譌･譛ｬ貂ｬ蝨ｰ邉ｻ縺九ｉ荳也阜貂ｬ蝨ｰ邉ｻ縺ｫ螟画鋤)
 * @param {lon} num - 譌･譛ｬ貂ｬ蝨ｰ邉ｻ縺ｮ邨悟ｺｦ
 * @param {lat} num - 譌･譛ｬ貂ｬ蝨ｰ邉ｻ縺ｮ邱ｯ蠎ｦ
 * @return {array} 0�壻ｸ也阜貂ｬ蝨ｰ邉ｻ縺ｮ邨悟ｺｦ ��:荳也阜貂ｬ蝨ｰ邉ｻ縺ｮ邱ｯ蠎ｦ
 **/
function tokyo2world(lon, lat) {
    var ret = proj4("EPSG:4301", "EPSG:4326", [lon, lat]);
    return ret;
}
