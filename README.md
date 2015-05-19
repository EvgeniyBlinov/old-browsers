[![MIT License][license-image]][license-url]

# old-browsers
Show browser update links for old browsers.

## Usage

```javascript
require(['old-browsers'], function (OldBrowsers){ //if amd using
    (new OldBrowsers()).configure({
        imagePath: '/static/vendor/bower/old-browsers/images/',
        showBrowserMenu: function (config, template) {
            document.getElementById('page').innerHTML = template;
            throw new Error('You browser has old version!');
        }
    }).validate();
}); //if amd using
```

## License

[![MIT License][license-image]][license-url]

## Author

- [Blinov Evgeniy](mailto:evgeniy_blinov@mail.ru) ([http://blinov.in.ua/](http://blinov.in.ua/))

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

