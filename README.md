# Socializr

## Version 

0.1

## Dependencies

## About

Global var declaration for handling share features in a web app

## Usage


### Define the facebook application ID

```js
Social.fbAppId = $('meta[property="fb:app_id"]').attr('content');
```

### Define the version of the facebook SDK

Socializr.fbVersion = '2.4';

### Load an SDK

Facebook and Twitter are currently the only supported SDKs (more to come)

```js
Social.loadSdk('facebook');
```

### Initiate the share

```js
Social.share('twitter', 'http://mycurrenturl.com', {
    twitter: {
        via      : 'twitter_handle',
        text     : 'I love this handy little method',
        hashtags : 'socialzr'
    },

    success: function(platform, response) {
        alert('URL was shared to twitter!');
    }
});
```

```js
Social.share('email', 'http://mycurrenturl.com', {
    email: {
        mailto   : 'noreply@socializr.com',
        body     : 'Thanks for making sharing so easy to implement',
        subject  : 'Well done!'
    },

    success: function(platform, response) {
        alert('URL was shared by email!');
    }
});
```
