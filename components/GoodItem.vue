<template>
	<view class="item">		
		<view class="good">
			<image class="good-pic" :src="baseUrl+img" mode="aspectFit"></image>
			<view class="good-content">
				<view class="name">
					{{name}}
				</view>
				<view class="count">
					数量：{{count}}
				</view>
				<view class="price">
					<view class="single">
						单价：￥{{price}}
					</view>
					<view class="item-sum">
						小计：￥{{price*count}}
					</view>
				</view>		
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useStore
	} from 'vuex'
	import baseUrl from '@/config/index.js'
	import {
		ref,
		onMounted,
		toRefs
	} from 'vue'
	// import {onShow} from '@dcloudio/uni-app'
	const store = useStore()
	let props = defineProps(['img', 'name', 'price', 'count', 'isSelected'])
	let {
		img,
		name,
		count,
		price,
	} = toRefs(props)

</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		height: 15vh;
		// background-color: pink;
		align-items: center;
		// border-top: 1px dotted #8b8c90;
		// border-bottom: 1px dotted #8b8c90;
		margin-bottom: 1vh;
		.good {
			flex: 1 1 auto;
			display: flex;
			width: 80vw;
			height: 100%;
			.good-pic {
				flex: 4;
				height: 100%;
				align-self: center;
				border: 1px solid #cacaca;
			}

			.good-content {
				flex: 6;
				display: flex;
				justify-content: center;
				align-items: flex-start;
				flex-direction: column;
				margin-left: 2vw;
				.name {
					flex: 2;
					font-size: 3vh;
				}

				.price {
					flex: 2;
					font-size: 2.5vh;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #f77c55;
					width: 100%;
					
				}

				.count {
					align-items: center;
					flex: 2;
					display: flex;	
					font-size: 2.5vh;
				}
			}
		}

	}
</style>