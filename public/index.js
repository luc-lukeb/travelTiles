/* global Map storing pictures data */
var dataPicturesJson = {};

/**
 * Hodls id of current chosen picture
 */
var dataCurrentPictureId;

/**
 * Aligns layout classes to elements
 * @param aElementNumber
 * @returns {String}
 */
function fGetLayoutClass (aElementNumber) {
var aModulo = aElementNumber%3;
	if(aModulo===0) {
		return ("ui-block-a");
	} else if (aModulo===1) {
		return ("ui-block-b");		
	} else if (aModulo===2) {
		return ("ui-block-c");		
	}
}

/**
 * Creates map of query parameters
 * @returns {___anonymous694_695}
 */
function getUrlParams() {
    var result = {};
    var params = (window.location.href.split('?')[1] || '').split('&');//search
    for(var param in params) {
        if (params.hasOwnProperty(param)) {
            paramParts = params[param].split('=');
            result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
        }
    }
    return result;
}

/**
 * Creates img tag from photo object
 * @param photo
 * @returns {String}
The letter suffixes are as follows:
s	small square 75x75
t	thumbnail, 100 on longest side
m	small, 240 on longest side
-	medium, 500 on longest side
z	medium 640, 640 on longest side
b	large, 1024 on longest side*
o	original image, either a jpg, gif or png, depending on source format
 */
function fGenerateImgFromPhotoData(photo,aPhotoNr) {
	var aDivWidth = 500;
	
	t_url = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server
			+ "/" + photo.id + "_" + photo.secret + "_" + "m.jpg";//b z 
	p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
	
	return '<div class="photo"><a data-role="none" onclick="dataCurrentPictureId='+photo.id+';$.mobile.changePage(\'#details\');" style="width:'+aDivWidth+'px;height:'+aDivWidth+'px;background: white url(' + t_url +') no-repeat center center; background-size: cover;"></a><div class="t">' + photo.title + '</div></div>'

}

/**
 * Creates image url for photo object
 * @param photo
 * @param aSize
 * @returns {String}
 */
function fGetImageUrl (photo, aSize) {
	if (typeof(aSize) === 'undefined') {
		aSize = "m";
	}
	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + aSize+".jpg";
}

function fGetImageLocation(photo) {
	return photo.latitude.toString() + ','+ photo.longitude.toString();
}

/**
 * Processes photo collection
 * @param aPhotoData
 */
function fProcessPhotos(aPhotoData) {
	for ( var iPhoto in aPhotoData.photos.photo) {
		var currentPhoto = aPhotoData.photos.photo[iPhoto];
		dataPicturesJson[currentPhoto.id] = currentPhoto;
		
		$('#featured').append(fGenerateImgFromPhotoData(currentPhoto,iPhoto));
	}
	var $container = $('#featured');
	$container.imagesLoaded(function(){
	  $container.masonry({
		isAnimated: true,
	    itemSelector : '.photo',

	  });
	});
}

/**
 * Gets photos from flickr
 */
function fGetPhotos() {
	$.ajax({
		url : "/getPhotos/",
		dataType : "json",
		success : function(aResult) {
			//alert("call done!"+aResult.photos.total);
			fProcessPhotos(aResult);
		}
	});
}

/**
 * Adds results from expedia to the page
 * @param aResult
 */
function fProcessResults(aResult) {
	$('#results').empty();
	var aDivWidth = 300;
	//window.location.href="#travels";
	$.mobile.changePage('#travels?parm=123');
	for ( var iResult in aResult.HotelListResponse.HotelList.HotelSummary) {
		var rResult = aResult.HotelListResponse.HotelList.HotelSummary[iResult];
		//get normal size images
		var resultLink = '<div class="photo"><a data-role="none" href="' + rResult.deepLink + '" target="_blank" style="width:'+aDivWidth+'px;height:'+aDivWidth+'px;background: white url(http://images.travelnow.com' + rResult.thumbNailUrl.replace("_t.jpg", "_b.jpg") +') no-repeat center center; background-size: cover;"></a><div class="t">' + rResult.name + '</div><div class="ss">' + rResult.hotelRating + '</div></div>'
		$('#results').append(resultLink);
	}
	
	var $container = $('#results');
	$container.imagesLoaded(function(){
	  $container.masonry({
		isAnimated: true,
	    itemSelector : '.photo',

	  });
	});
}

/**
 * Gets expedia results for given GPS coordinates
 * @param aLongitude
 * @param aLatitude
 */
function fQueryLocation(aLongitude, aLatitude) {
	$.ajax({
		url : "/goExpedia/",
		dataType : "json",
		data : {
			longitude : aLongitude,
			latitude : aLatitude
		},
		success : function(aResult) {
			fProcessResults(aResult);
		}
	});
}