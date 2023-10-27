<template>
	<nav-title title='购物车'></nav-title>
	<view class="cart">
		<scroll-view scroll-y="true" v-if="store.state.token" v-for="item in store.state.goodList" :key='item.name'>
			<CartItem v-bind='item'></CartItem>
		</scroll-view>
	</view>
	<view class="checkout" v-if="store.state.token">
		<view class="left">
			<image class="img" :src="allSrc" mode="aspectFit" @click="setAllSrc"></image>
			<text>全选</text>
		</view>
		<view class="clear" @click="clearCart">
			<image class="clear-img" 
			src="../../static/icons/delete.png" 
			mode="aspectFit" ></image>
			<text>清空</text>
		</view>
		<view class="right">
			合计：<text class="sum-text">￥{{sum}}</text>
			<button type="" class="btn" @click="checkout">结算</button>
		</view>

	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import NavTitle from "../../components/NavTitle.vue"
	import CartItem from "../../components/CartItem.vue"
	import {
		computed,
		ref
	} from "vue";
	const store = useStore()
	let allSrc=computed(
	()=>{
	       return isAll.value ? '../../static/icons/is-all.png' : '../../static/icons/not-all.png'
	}
	)
	let isAll = ref(false)
	const setAllSrc = () => {
		isAll.value= !isAll.value
		store.commit('chooseAll', isAll.value)

	}
	const clearCart=()=>{
	       store.commit('clearGood')
		   isAll.value=false
	}
	const sum = computed(
		() => {
			let fn = (pre, cur) => {
				return pre + cur.count * cur.price
			}
			return store.state.goodList.filter(item => item.isSelected === true).reduce(fn, 0)
		}
	)
	const checkout = async () => {
		//点击结算后生成一个order
		//		order---{sum,[goodList],time,oid}
		isAll.value=false
		let time = new Date()
		let oid = 'lzl' + Date.now()
		let goodList = store.state.goodList.filter(item => item.isSelected === true)
		let order = {
			time,
			oid,
			goodList,
			sum: sum.value
		}
		let uid = store.state.userInfo._id
		if(goodList.length===0){
			uni.showToast({
				title:'无商品选中',
				duration:1500,
				icon:'error'
			})
		}else{
			//post order&uid
			let res = await uni.$postWithToken(`/store-api/order/list/${uid}`, order)
			if (res.ActionType === 'ok') {
				uni.showToast({
					title: '订单已生成',
					mask: true,
					duration: 1000
				});
				setTimeout(
					() => {
						store.commit('clearGood')
						uni.switchTab({
							url: '/pages/order/order'
						})
					}, 1200
				)
			}
		}
		
	}
	onShow(
		() => {
			if (!store.state.token) {
				uni.showToast({
					title: '请登录后查看🐱'
				});
				setTimeout(
					() => {
						uni.switchTab({
							url: '/pages/user/user'
						})
					}, 1200
				)
			}
		}
	)
</script>

<style scoped lang="scss">
	.cart {
		padding-bottom: 7vh;
	}

	.checkout {
		display: flex;
		justify-content: space-between;
		background-color: #fefefe;
		position: fixed;
		bottom: 8vh;
		//#ifdef MP
		bottom: 0;
		//#endif
		width: 100%;
		height: 6vh;
		border-top: 1px dotted #aaabb0;
		
		.left {
			width: 20vw;
			display: flex;
			align-items: center;

			.img {
				width: 10vw;
				height: 100%;
			}
		}
		.clear{
			width: 20vw;
			display: flex;
			align-items: center;
			
			.clear-img {
				width: 10vw;
				height: 100%;
			}
		}
		.right {
			display: flex;
			width: 60vw;
			align-items: center;
			justify-content: flex-end;

			// border: 1px solid red;
			.sum-text {
				flex: 0 1 auto;
				// width: 40vw;
				color: #ee5100;

			}

			.btn {
				flex: 0 1 auto;
				justify-self: flex-end;
				height: 100%;
				background-color: #ff6339;
				color: white;
				margin: 0 2vw 0;
				line-height: 6vh;
			}
		}

	}
</style>