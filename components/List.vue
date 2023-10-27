<template>
	<view>
		<view class="my-title">{{title}}</view>
		<u-grid :border="true" :col="col">
			<u-grid-item v-for="(item,index) in list" :key="item._id">
				<view class="my-item" @click="go2Detail(item._id)">
					<image :src="baseUrl+item.img" mode="aspectFit" class="my-img" lazy-load=true></image>
					<text class="my-name">{{item.name}}</text>
					<text class="my-price">￥{{item.price}}</text>
				</view>

			</u-grid-item>
		</u-grid>
	</view>
</template>

<script setup>
	import baseUrl from '../config/index.js'
	import {
		useStore
	} from 'vuex'
	const store = useStore()
	const {
		title,
		list,
		col
	} = defineProps({
		title: {
			type: String,
			default: ''
		},
		list: {},
		col: {
			type: String,
			default: '4'
		}
	})
	const go2Detail = (_id) => {
		if (!store.state.token) {
			uni.showToast({
				title: '请先登录',
				icon: 'error'
			});
			setTimeout(
				() => {
					uni.switchTab({
						url: '/pages/user/user'
					})
				}, 1000
			)
		} else {
			let pages = getCurrentPages()
			store.commit('setPrePage','/' +pages[pages.length - 1].route)
			uni.navigateTo({
				url: '/pages/Detail/Detail?id=' + _id
			})
		}

	}
</script>

<style lang="scss" scoped>
	.my-item {
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		height: 19vh;
	}

	.my-title {
		padding: 10rpx;
		font-size: 40rpx;
		margin-left: 10rpx;
		margin-top: 5rpx;
	}

	.my-img {
		width: 90%;
		height: 50%
	}

	.my-name {
		padding: 5rpx;
		font-size: 2vh;
	}

	.my-price {
		padding-right: 15rpx;
		padding-top: 15rpx;
		color: #2577af;
	}
</style>