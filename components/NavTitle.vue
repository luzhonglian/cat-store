<template>
	<view class="wx"></view>
	<view class="nav-bar">
		<image src="../static/icons/cat.png" mode="" class="cat-img"></image>
		<view class="title">
			{{title}}
		</view>
	</view>

</template>

<script setup>
import { ref} from "vue";
// import {useStore} from 'vuex'
// import {onHide,onShow,onLoad} from '@dcloudio/uni-app'
	const {title}=defineProps(['title'])
	
</script>

<style lang="scss" scoped>
	.wx{ 
		//#ifdef MP-WEIXIN
		height: 40px;
		background-color: #f2f2f2;
		//#endif
	}
.nav-bar{
	background-color: #f2f2f2;
	height: 8vh;
	display: flex;
	width: 100vw;
	align-items: center;
	position: relative;
	.cat-img{
		width: 8vh;
		height: 8vh;
		margin-left: 10rpx;
	}
	.title{
		font-size: 4vh;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>