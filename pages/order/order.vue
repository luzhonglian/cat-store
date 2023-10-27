<template>
	<view class="order">
		<!--  v-if="store.state.token" -->
		<nav-title title='历史订单'></nav-title>
		<view class="" v-if="store.state.isOrder">
			<view v-if="!isEmpty" v-for="order in orderList" :key='order._id'>
				<order-item v-bind='order'></order-item>
			</view>
			<view class="not-found" v-else>
				<image src="../../static/icons/404.png" mode="aspectFit" class="_404"></image>
				<text>暂无订单</text>

			</view>
		</view>

	</view>

</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	import dayjs from 'dayjs'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref,
		onMounted,
		computed
	} from 'vue'
	import NavTitle from "../../components/NavTitle.vue"
	import OrderItem from "../../components/OrderItem.vue"
	const store = useStore()
	let orderList = ref([])
	const isEmpty = ref(false)
	const getOrderList = async () => {
		let res = await uni.$getWithToken(`/store-api/order/list/${store.state.userInfo._id}`)
		// console.log(res)
		if (!res.errorInfo) {
			if (res.data.length == 0) {
				isEmpty.value = true
			} else {
				isEmpty.value = false
				orderList.value = res.data[0].orderList
				// 后端传过来的time是字符串，索性直接在后端排好序了格式好后传过来
				// orderList.value.sort((a, b) => b.time.getTime() - a.time.getTime())
				orderList.value.forEach((order) => {
					order.time = dayjs(order.time).format("YYYY-MM-DD HH:mm:ss")
				})
			}
		}
		store.commit('setIsOrder', true)
	}

	onShow(
		//不登陆不给看
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
			} else {
				getOrderList()
			}
		}
	)
</script>

<style scoped lang="scss">
	.order {
		background-color: #f4f4f4;
	}

	.not-found {
		padding: 10vh;
		height: 40vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;

		._404 {
			width: 100%;
		}
	}
</style>