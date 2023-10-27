import {
	createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate"
const store = createStore({
	state: { 
		"poster": "",
		"food": '',
		"can": '',
		'prePage': '',
		'keyword': '',
		'userInfo': {},
		'token': '',
		'goodList': [],
		// 'orderList': []
		'isOrder':false
	},
	mutations: {
		setIsOrder(state, value) {
			state.isOrder = value
		},
		setPoster(state, value) {
			state.poster = value
		},
		setFood(state, value) {
			state.food = value
		},
		setCan(state, value) {
			state.can = value
		},
		setPrePage(state, value) {
			state.prePage = value
		},
		setKeyword(state, value) {
			state.keyword = value
		},
		setUserInfo(state, value) {
			// state.userInfo
			Object.assign(state.userInfo,value)
		},
		setToken(state, value) {
			state.token = value
		},
		addGood(state, good) {
			state.goodList.push(good)
		},
		clearGood(state) {
			state.goodList.length = 0
		},
		chooseOne(state, name) {
			state.goodList.find(item => item.name === name).isSelected = !state.goodList.find(item => item
				.name === name).isSelected
		},
		delGood(state, name) {
			 let index=state.goodList.findIndex(item => item.name === name)
			 state.goodList.splice(index,1)
		},
		chooseAll(state,isAll){
			isAll?
			state.goodList.forEach(item=>item.isSelected=true):
			state.goodList.forEach(item=>item.isSelected=false)

		},
		setCount(state,{name,handle}){
			let good=state.goodList.find(item => item.name === name)
			handle==='minus'?good.count--:good.count++
			// console.log(good.count)
		}
		
	},
	getters: {
		all({
			poster,
			food,
			can
		}) {
			return [...poster, ...food, ...can]
		}
	},
	plugins: [createPersistedState({
        // 传入参数
		storage: {
			getItem: (key) => uni.getStorageSync(key),
			setItem: (key, val) => uni.setStorageSync(key, val),
			removeItem: (key) => uni.removeStorageSync(key)
		},
	})]
}) 

export default store