
import React from 'react'
import { render } from 'react-dom'
import { Router,Route,Link,HashHistory,Switch} from 'react-router-dom'
import RouteMap from './router.js'
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
console.disableYellowBox = true
render(
    <RouteMap/>,
    document.getElementById('root')
)