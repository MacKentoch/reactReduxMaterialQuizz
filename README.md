React-Redux JS material quizz
=========

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/Mp96tCWH2KdajZuBzqB6jwj8/MacKentoch/reactReduxMaterialQuizz'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/Mp96tCWH2KdajZuBzqB6jwj8/MacKentoch/reactReduxMaterialQuizz.svg' />
</a>

This is a simple dynamic quiz in [ReactJS](https://facebook.github.io/react/) + [Redux](http://rackt.org/redux/index.html) designed following [google material guidelines](https://www.google.com/design/spec/material-design/introduction.html) thanks to nice [material UI](http://www.material-ui.com) and [google material design lite](http://www.getmdl.io/index.html).

**feature :** 

- ReactJS (> 0.14)
- react-router (> 1.0.0)
- Redux
- react-redux
- redux-simple-router
- redux-devtools 
- JedWatson/classnames 
- Material UI (>0.14.0+) (+ *react-tap-event-plugin*)
- Material Design lite
- animate.css
- font-awesome
- ES6
- jspm 
- babel
- gulp 


## Intallation :

Clone or download then :

```bash
$ npm install 
$ jspm install
```

*Note :*

*Be sure to have JSPM installed otherwise install it before :*
```bash
npm install jspm -g
```


## Launch app : 

1- **warrior way** : start a server 
```bash
jspm-server
```

>IMPORTANT : if you encounter a SystemJS error related to `pop.js` (*pop.js only loads redux-devTools theme and is consired as an ad by AD blockers*) you will have to add `localhost` to whitelisted website in your AD blocker.


**Redux-devTools**
- is DEV friendly and active by default
- to disable it (production friendly) import the production store (*uncomment it and comment dev import*)
    in `/src/app/components/Routes/Routes.jsx`

    ```javascript
    // IMPORTANT : PRODUCTION : Store WITHOUT redux-devtools :
    //import configureStore           from '../../redux/store/quizStore.prod.jsx!jsx';

    // IMPORTANT : DEVELOPEMENT : Store WITH redux-devtools :
    import configureStore           from '../../redux/store/quizStore.dev.jsx!jsx';    
    ```

## WHAT'S NEXT

- [ ] add a dynamic switch dev to production mode (*Redux-devTools or not*)
- [x] babel 6+
- [ ] webpack version
- [ ] hot reloading (*should be linked to webpack version*)
- [x] unit tests (*currently implementing*)


Note : jspm v0.17.x should be 
- compatible with babel 6+
- able to offer hot reload

>If so, considering how simple and fast it is set up and future orientated nature (*with http2 we would have no more need to bundle*), JSPM may stay my preferred tool in my workflows. I don't mean webpack is bad. Webpack is powerfull the most widespread and offers more today. But imagine a new comer in javascript dev world, which one would he choose between webpack and jspm to give the same result? 

## License

The MIT License (MIT)

Copyright (c) 2016 Erwan DATIN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
