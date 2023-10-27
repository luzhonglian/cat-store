<template>
	<view class="wx"></view>
	<view class="back-des">
		<image src="../../static/icons/back.png" mode="aspectFill" @click="goBack" class="back"></image>
		<view class="des">商品详情</view>
	</view>
	<image :src="baseUrl+img" mode="aspectFit" class="pic"></image>
	<view class="name">
		{{name}}
	</view>
	<u-divider text="分割线" :dot="true"></u-divider>

	<view class="intro">
		🐱{{intro}}
	</view>

	<view class="price">
		￥{{price}}
	</view>
	<view class="add">
		<u-button type="error" :text="btnText" class="btn" @click="add2Cart" ></u-button>
	</view>
</template>

<script setup>
	// import {onLoad} from '@dcloudio/uni-app'
	import {
		onMounted,
		ref
	} from "vue";
	import {
		useStore
	} from 'vuex'
	import baseUrl from '../../config/index.js'
	const {
		id
	} = defineProps(['id'])
	const store = useStore()
	const isLike = ref(false)
	const likeIcons = ['../../static/icons/like.png', '../../static/icons/like-s.png']
	const {
		img,
		name,
		intro,
		price
	} = store.getters.all.filter(item => item._id === id)[0]
	const goBack = () => {

		uni.switchTab({
			url: store.state.prePage
		})
	}
	const btnText=ref('')
	btnText.value=store.state.goodList.find(item=>item.name===name)?'已加入购物车':'加入购物车'
	const add2Cart = () => {
		if(store.state.goodList.find(item=>item.name===name)){
			uni.showToast({
				title: '该商品已加入购物车'
			});
		}else{
			let good = {
				img,
				name,
				price,
				count:1,
				isSelected:false
			}
			store.commit('addGood',good)
			// store.commit('clearGood')
			btnText.value='已加入购物车'
			// console.log(store.state.goodList)
			uni.showToast({
				title: '成功加入购物车'
			});
		}

	}
	onMounted(
		() => {}
	)
</script>

<style lang="scss" scoped>
	.wx{
		//#ifdef MP-WEIXIN
		height: 40px;
		background-color: #f2f2f2;
		//#endif
	}
	// 100vh 顶部5vh 图片占90% 标题5 描述20 价格5 喜爱和购物车10
	.back-des {
		height: 5vh;
		display: flex;
		align-items: center;

		.back {
			height: 5vh;
			width: 5vh;
		}

		.des {
			font-size: 3vh;
			margin-left: 30vw;
		}
	}

	.pic {
		// height: 45vh;
		width: 90vw;
		margin: 0.5vh 5vw 2vh;
	}

	.ml-5 {
		margin-left: 5vw;
	}

	.name {
		@extend .ml-5;
		margin-bottom: 1vh;
		font-weight: 400;
		font-size: 4vh;
	}

	.intro {
		@extend .ml-5;
		font-size: 2.5vh;
		color: #5f5761;
	}

	.price {
		margin-top: 2vh;
		margin-left: 75vw;
		font-size: 3vh;
		color: #c06f44;
	}

	.add {
		height: 10vh;
		position: relative;
		margin-top: 1vh;
		.btn{
			width: 60%;
			position: absolute;
			right: 8vw;
		}
		
	}
</style>