# Socializr

## Version

0.2.0

## Installation

Add the package to your `bower.json` file. As it's not yet registered on bower, you might want to add the full repository

    ```json
    {
         "dependencies": {
             ...
             "socializr": "git@github.com:cozyt/socializr.git#v0.2"
         }
    }
    ```

## About

Collection of methods and properties for handling sharing in a web apps.

Capable of loading and initializing required SDK's using javascript provided by the platform SDKs.

Offers simple implementation by method call of sharing to various platforms.

## Usage

### Define the facebook application ID

```js
Socializr.fbAppId = $('meta[property="fb:app_id"]').attr('content');
```

### Define the version of the facebook SDK

```js
Socializr.fbVersion = '2.4';
```

### Load an SDK

Facebook and Twitter are currently the only supported SDKs (more to come)

```js
Socializr.loadSdk('facebook');
```

### Initiate the share

```js
Socializr.share('twitter', 'http://mycurrenturl.com', {
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
Socializr.share('email', 'http://mycurrenturl.com', {
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
