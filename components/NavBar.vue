<template>
	<view class="wx"></view>
	<view class="nav-bar">
		<image src="../static/icons/cat.png" mode="" class="cat-img"></image>
		<u-search 		
		placeholder="欢迎来到猫商店🐱!想要买点啥？" 
		v-model="keyword" 
		shape="round"
		 :clearabled="true"
		 height="80"
		 :show-action="true"
		 :animation="true"
		 actionText="搜索"
		 bgColor="white"
		 searchIconSize=60
		 @search="onSearch"
		 ></u-search>
	</view>

</template>

<script setup>
import { ref ,onBeforeUnmount} from "vue";
import {useStore} from 'vuex'
import {onHide,onShow,onLoad} from '@dcloudio/uni-app'
	const store=useStore()
	const keyword=ref('')
	const onSearch=(v)=>{
	       store.commit('setKeyword',v)
		   uni.switchTab({
		   	url:'/pages/search/search'
		   })
	}
	store.commit('setKeyword','')
	onHide(
	()=>{
	        store.commit('setKeyword',keyword)
	}
	)
	onShow(
	()=>{
	        keyword.value=store.state.keyword
	}
	)
	
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
	.cat-img{
		width: 8vh;
		height: 8vh;
		margin-left: 10rpx;
	}

}
</style>