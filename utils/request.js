import store from '../store/index.js'
import baseUrl from '../config/index.js'
let $request = function(url, data, method) {
	return new Promise((resolve, reject) => {
		uni.request({
			//#ifdef H5
			url,
			//#endif
			//#ifdef MP-WEIXIN
			url:baseUrl+url,
			//#endif 
			data,
			method,
			success: ({
				data
			}) => {
				resolve(data)
			}
		})
	})
}

uni.$request = $request

uni.$get = function(url, data) {
	return $request(url, data, "GET")
}

uni.$getWithToken = function(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			//#ifdef H5
			url,
			//#endif
			//#ifdef MP-WEIXIN
			url:baseUrl+url,
			//#endif 
			data,
			method: 'GET',
			header: {
				'Authorization': `Bearer ${store.state.token}`,
			},
			success: (res) => {
				const {
					header,
					data,
					statusCode
				} = res
				if (statusCode === 401) {
					store.commit('setUserInfo', '')
					store.commit('setToken', '')
					store.commit('clearGood')
					store.commit('setIsOrder', false)
					uni.showToast({
						title: '登录过期，请重新登录',
						duration: 1500
					});
					uni.switchTab({
						url: '/pages/user/user'
					})
					A
				}else{
					store.commit('setToken', header.authorization ||header.Authorization)
				}

				resolve(data)
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}
uni.$postWithToken = function(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			//#ifdef H5
			url,
			//#endif
			//#ifdef MP-WEIXIN
			url:baseUrl+url,
			//#endif 
			data,
			method: 'POST',
			header: {
				'Authorization': `Bearer ${store.state.token}`,
			},
			success: (res) => {
				const {
					header,
					data,
					statusCode
				} = res
				if (statusCode === 401) {
					store.commit('setUserInfo', '')
					store.commit('setToken', '')
					store.commit('clearGood')
					store.commit('setIsOrder', false)
					uni.showToast({
						title: '登录过期，请重新登录',
						duration: 1500
					});
					uni.switchTab({
						url: '/pages/user/user'
					})
				}else{
					
				store.commit('setToken', header.authorization||header.Authorization)
				}
				resolve(data)
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}
uni.$post = function(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			//#ifdef H5
			url,
			//#endif
			//#ifdef MP-WEIXIN
			url:baseUrl+url,
			//#endif 
			data,
			method: "POST",
			success: (res) => {
				resolve(res) //这里要获得token，so不直接解构拿到data
			}
		})
	})
}