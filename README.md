# webpackConfig
webpack多页应用配置

##目录结构
``` txt
├── build                               // webpack 配置目录
│   ├── webpack.base.conf.js            // 基础配置
│   ├── webpack.dev.conf.js             // 开发环境配置
│   └── webpack.prod.conf.js            // 生产环境配置
├── dist                                // 编译生产目录
├── src                                 // 开发目录
│   ├── assets                          // 资源
│   ├── common                          // 公共
│   ├── pages                           // 页面目录
│   │   ├── index
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   ├── page1
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   └── page2
│   │   │   ├── index.html
│   │   │   ├── index.js
│   │   │   └── index.scss
│   └── utils                           // 公共方法
├── static                              // 静态资源
├── .babelrc                            // babel配置
├── .gitignore
├── .postcssrc.js                       // postcss配置
├── package.json
├── README.md
```