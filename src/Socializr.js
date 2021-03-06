/******************************************************************************
 * Socializr
 *****************************************************************************/

var Socializr = Socializr || {};


/******************************************************************************
 * Properties
 */

Socializr.fbAppId   = Socializr.fbAppId     || '';
Socializr.fbVersion = Socializr.fbVersion   || '2.5';
Socializr.lang      = Socializr.lang        || 'en_US';
Socializr.xfbml     = Socializr.xfbml       || 1;

/******************************************************************************
 * Methods
 */

/**
 * Helper method to load various SDKs
 */

Socializr.loadSdk = function(platform) {
    switch(platform) {
        case 'facebook':
            if(Socializr.fbAppId !== '') {
                (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = "//connect.facebook.net/" + Socializr.lang + "/sdk.js#xfbml=" + Socializr.xfbml + "&version=v" + Socializr.fbVersion + "&appId=" + Socializr.fbAppId;
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }

            break;

        case 'twitter':
                !function(d,s,id){
                    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
                    if(!d.getElementById(id)){
                        js=d.createElement(s);
                        js.id=id;
                        js.src=p+'://platform.twitter.com/widgets.js';
                        fjs.parentNode.insertBefore(js,fjs);
                    }
                }(document, 'script', 'twitter-wjs');
            break;

        case 'google-plus':
            break;

        case 'pinterest':
            (function(d){
                var f = d.getElementsByTagName('SCRIPT')[0], p = d.createElement('SCRIPT');
                p.type = 'text/javascript';
                p.async = true;
                p.src = '//assets.pinterest.com/js/pinit.js';
                f.parentNode.insertBefore(p, f);
            }(document));
            break;
    }

    return Socializr;
};

/**
 * Helper method to render sharing functionality
 */

Socializr.share = function(platform, url, options) {
    platform = platform.toLowerCase();

    switch(platform) {
        case 'facebook':
            var method = typeof options.facebook !== 'undefined' ? (
                    typeof options.facebook.method !== 'undefined' ? options.facebook.method : 'share'
                ) : 'share';

            FB.ui({
                method : method,
                href   : url
            }, function(response){
                if(typeof options.success === 'function') {
                    options.success('facebook', response);
                }
            });

            break;

        case 'google-plus':
        case 'pinterest':
        case 'twitter':
            var screenWidth    = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                screenHeight   = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
                dualScreenTop  = window.screenTop != undefined ? window.screenTop : screen.top;

            var width     = screenWidth >= 650 ? 650 : screenWidth / 2,
                left      = ((screenWidth / 2) - (width / 2)) + dualScreenLeft,
                top       = ((screenHeight / 2) - 300) + dualScreenTop,
                winParams = 'status=1, menubar=no, toolbar=no, scrollbars=yes, top=' + top + ', left=' + left + ', width=' + width + ', height=';

            if (platform === 'twitter') {
                url = 'https://twitter.com/intent/tweet?url=' + url;
                winParams += 253;

                if(typeof options.twitter !== 'undefined') {
                    if(typeof options.twitter.via !== 'undefined') {
                        url += '&via=' + options.twitter.via;
                    }

                    if(typeof options.twitter.text !== 'undefined') {
                        url += '&text=' + options.twitter.text;
                    }

                    if(typeof options.twitter.hashtags !== 'undefined') {
                        url += '&hashtags=' + options.twitter.hashtags;
                    }
                }

            } else if (platform === 'google-plus') {
                url = 'https://plus.google.com/share?url=' + url;
                url += '&h1=' + Socializr.lang.replace('_','-');
                winParams += 600;

            } else if (platform === 'pinterest') {
                url = 'http://pinterest.com/pin/create/button/?url=' + url;
                winParams += 520;

                if(typeof options.pinterest.media !== 'undefined') {
                    url += '&media=' + options.pinterest.media;
                }

                if(typeof options.pinterest.description !== 'undefined') {
                    url += '&description=' + options.pinterest.description;
                }
            }

            var newWindow = window.open(url, platform, winParams);

            if (window.focus) {
                newWindow.focus();
            }

            if(typeof options.success === 'function') {
                options.success(platform);
            }

            break;

        case 'email':
        case 'mail':
            var href = 'mailto:';

            if(
                typeof options.email !== 'undefined' &&
                typeof options.email.mailto !== 'undefined'
            ) {
                href += options.email.mailto;
            }

            href += '?body=';

            if(
                typeof options.email !== 'undefined' &&
                typeof options.email.body !== 'undefined'
            ) {
                href += encodeURIComponent(options.email.body + ' - ');
            }

            href += url;

            if(
                typeof options.email !== 'undefined' &&
                typeof options.email.subject !== 'undefined'
            ) {
                href += '&subject=' + encodeURIComponent(options.email.subject);
            }

            window.location = href;

            if(typeof options.success === 'function') {
                options.success('email');
            }

            break;
    }

    return Socializr;
};
