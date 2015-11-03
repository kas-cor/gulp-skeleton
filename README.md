gulp-skeleton
=============

My gulp skeleton

Make sure you have `gulp`, `jshint` and `bower` installed by building:
```bash
npm i -g gulp-cli bower jshint
```

Clone repo:
```bash
git clone https://github.com/kas-cor/gulp-skeleton.git project_name
cd project_name
npm i
bower i
gulp
gulp watch
```

Useing:

Input files (for charge):
```bash
_dev/global/css/global.less
_dev/admin/css/admin.less
_dev/site/css/site.less

_dev/global/js/script.js
_dev/admin/js/script.js
_dev/site/js/script.js

_dev/admin/img/**/*
_dev/site/img/**/*
```

Output files:
```bash
admin/css/style.min.js
admin/js/script.min.js

css/style.min.js
js/script.min.js

admin/img/**/*
img/**/*
```