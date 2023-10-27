<template>
	<NavBar />
	<view class="my-search">
		<scroll-view scroll-y="true" class="left">
			<view v-for="(item,index) in category">
				<image :src="item" 
				class="category-img" 
				:class="{active:index===currentIndex}"
				@click="setIndex(index)"
				mode="aspectFit">
				</image>
			</view>
		</scroll-view>
		<!--  -->
		<scroll-view scroll-y="true" class="right" >
			<view class="not-found" v-if="!currentList.length">
				<image src="../../static/icons/404.png"
				 mode="aspectFit"
				 class="_404"
				 ></image>
				 <text>未找到相关商品</text>
			</view>
			<List v-else :col="'3'" :list="showList" ></List>
			
			<!-- templist 所有数据 -->
			<!-- currentlist 要显示的数据 -->
			<uni-pagination  
			class="page"
			@change="changePage"
			v-if="currentList.length>12"
			pageSize=12
			:total="currentList.length" ></uni-pagination>
		</scroll-view>
	</view>
</template>

<script setup>
import NavBar from "../../components/NavBar.vue"
import List from "../../components/List.vue"
import { computed, onMounted, ref, watch } from "vue";
import {useStore} from 'vuex'
	const category = ["../../static/icons/all.png", "../../static/icons/poster.png", 
	"../../static/icons/meat.png","../../static/icons/can.png"]
	const currentIndex=ref(0)
	const currentList=ref('')
	const store=useStore()
	const index2Cate=['all','poster','food','can']
	const setIndex=(index=0)=>{
		   currentPage.value=1
		   if(store.state.keyword){
			   let allGoods=store.getters['all']
			   currentList.value=allGoods.filter(item=>item.name.includes(store.state.keyword)||item.name.toLowerCase().includes(store.state.keyword))
		   }else{
			   currentIndex.value=index
			   if(index==0){
			   			   currentList.value=store.getters[index2Cate[index]]
			   }else{
			   			   currentList.value=store.state[index2Cate[index]]
			   }	
		   }
		 	   
	}
	const currentPage=ref(1)
	
	let showList=computed(	()=>{
	    return   currentList.value.slice((currentPage.value-1)*12,currentPage.value*12)
			   }
	)
	const changePage=({type,current})=>{
		currentPage.value=current
	}
	watch(()=>store.state.keyword,()=>{
		setIndex(0)
	})
	onMounted(
	()=>{
	       setIndex(0)
	}
	)
</script>

<style lang="scss" scoped>
	.my-search {
		display: flex;

		.left {
			display: flex;
			flex-direction: column;
			width: 220rpx;
			background-color: #edeff6;
			height: calc(100vh - 16vh);
			//#ifdef MP-WEIXIN
			height: 92vh;			
			//#endif
			.category-img {
				width: 100%;
				height: 15vh;
				margin: 20rpx 0;
			}
			.active{
				background-color: white;
			}
		}
		.right{
			height: calc(100vh - 16vh);
			position: relative;
			.page{
				position: absolute;
				width: 100%;
				height: 4vh;
				bottom: 0rpx;
			}
			.not-found{
				margin-top: 10vh;
				height: 40vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				._404{
					width: 100%;
				}				
			}
		}
	}
</style>