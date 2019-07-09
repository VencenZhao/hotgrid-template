import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import '@fortawesome/fontawesome-free-solid';
import { Base64 } from 'js-base64';
import axios from 'axios';
import Login from '&/components/Login';
import Shell from '&/components/Shell';
import { getParams, getParamter, getLocalStorage, setLocalStorage } from '&/commonjs/util';
import api from '&/api';

import "antd/dist/antd.css";
import '&/css/common/common';

//跳转
let skipLoginInfos = (() => {
	var token = getParamter('token');
	var autologin = getParamter('autologin');
	if(token) {
		token = token.substr(8);
		let tokenArray = Base64.decode(token).split('+');
		let time = tokenArray[0];
		if(new Date().getTime() - new Date(time).getTime() > 60*60*1000) {
			return [];
		}else {
			return tokenArray;
		}
	}
	else if(autologin) {
		return ['',getParamter('username'),getParamter('password')];
	}
	else {
		return [];
	}
})();

let login = (infos) => {
	let params = getParams({
		userName : infos[1],
		password : infos[2],
		type: '1',
		param1: '',
		telephone: '',
		menuCode : 'SYNTHESIZE',
		macAddress: ''
	},'getApplicationGridLogin_SENSOR');

	axios.post(api['common']+'/login', params)
	.then( (response) => {
		setLocalStorage('isSessionLogin','login');
		let sta = response.data.response.status;
		if(sta == 1){
			var result = response.data.response.result;
			localStorage.setItem('user', JSON.stringify(result));
			window.history.pushState(null, null, '/home');
			window.history.go(0);
			// location.href = 'http://' + location.host + '/home';
		}
	})
	.catch( (error) => {
		console.log(error);
	});
}

function PrivateRoute({ component: Component, ...rest }) {
	return (
	  <Route
		{...rest}
		render={props =>
			getLocalStorage('isSessionLogin') === 'login' ? (
				<Component {...props} />
			) : (
				<Redirect
				to={{
					pathname: '/'
				}}
				/>
		  	)
		}
	  />
	);
}

function TopPage() {
	return (
		<Router>
			<Switch>
			{
				skipLoginInfos.length ? login(skipLoginInfos) : 
				(
					
					<Route path='/' exact component={ Login } />
						
				)
			}
				<PrivateRoute path="/home" exact component={ Shell } />
				<Redirect to='/'></Redirect>
			</Switch>
		</Router>
	)
}

ReactDOM.render(
	<TopPage />,
	document.getElementById('root')
);
