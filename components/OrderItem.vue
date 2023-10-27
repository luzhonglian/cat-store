<template>
	<view class="one-order">
		<view class="oid-time">
			<view class="oid">
			订单号：{{oid}}
			</view>
			<view class="time">
			下单时间	:{{time}}
			</view>
		</view>
		<!-- good -->
		<view class="" v-for="good in goodList" :key='good._id'>		
		<good-item v-bind='good'></good-item>
		</view>
		<!-- 总价 -->
		<view class="sum">
			总计￥{{sum}}
		</view>
	</view>
	
</template>

<script setup>
	import GoodItem from './GoodItem.vue'
	import { toRefs} from 'vue'
	// import {onShow} from '@dcloudio/uni-app'
	const props = defineProps(['oid', 'time', 'goodList', 'sum','_id'])
	let {oid,time,goodList,sum}=toRefs(props)
</script>

<style lang="scss" scoped>
	.oid{
		color:#c76d28;
		line-height: 2.8vh;
		font-size: 2.8vh;
	}
	.time{
		margin: 0.5vh 0;
		color:#505561;
		line-height: 2.8vh;
		font-size: 2.5vh;
	}
	.sum{
		color:#5376ab;
		line-height: 3vh;
		font-size: 3.5vh;
		position: absolute;
		// bottom: 0.5vh;
		right: 1vw;
	}
	.one-order{
		position: relative;
		border-top: 2px solid #dedede;
		border-bottom: 1px solid #b0b0b0;
		padding-bottom: 4vh;
		padding-top: 1vh;
		margin: 0.5vh 0.5vw 4vh;
		border-radius: 3%;
		background-color: white;
		// overflow: hidden;
	}
</style>