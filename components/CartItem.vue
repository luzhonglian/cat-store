<template>
	<view class="item">
		<!-- :checked="isSelected" -->
		<!-- <radio-group @change="choose" > -->
		<radio @click="choose" class="select"  :value='name' :checked="isSelected" />
		<!-- </radio-group> -->
		<view class="good">
			<image class="good-pic" :src="baseUrl+img" mode="aspectFit"></image>
			<view class="good-content">
				<view class="name">
					{{name}}
				</view>
				<view class="price">
					￥{{price*count}}
				</view>
				<view class="count">
					<view class="minus-add" @click="handleCount('minus')">
						-
					</view>
					<text style="margin:0 3vw ;font-size:2.5vh">{{count}}</text>
					<view class="minus-add" @click="handleCount('add')">
						+
					</view>
				</view>
			</view>
		</view>
		<image class="del" @click="del" src="../static/icons/delete.png" mode="aspectFit"></image>
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
	const store = useStore()
	let props = defineProps(['img', 'name', 'price', 'count', 'isSelected'])
	let {
		img,
		name,
		count,
		price,
		isSelected
	} = toRefs(props)
	let goodName = name.value
	console.log(goodName)
	const choose = () => {
		store.commit('chooseOne', goodName)
	}
	const handleCount = (handle) => {
		if (count.value === 1 && handle === 'minus') {
			uni.showToast({
				title: '商品数量最少为1',
				icon: 'none'
			});
		} else {
			store.commit('setCount', {
				name: goodName,
				handle
			})
		}
	}
	const del = () => {
		store.commit('delGood', goodName)
	}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		height: 15vh;
		// background-color: pink;
		align-items: center;
		border-top: 1px dotted #8b8c90;
		border-bottom: 1px dotted #8b8c90;
		margin-bottom: 1vh;

		.select {
			flex: 0 0 10vw;
		}

		.del {
			flex: 0 0 10vw;
			height: 100%;
		}

		.good {
			flex: 1 1 auto;
			display: flex;
			width: 80vw;
			height: 100%;

			.good-pic {
				flex: 4;
				height: 100%;
				align-self: center;
			}

			.good-content {
				flex: 6;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.name {
					flex: 2;
					font-size: 3.5vh;
				}

				.price {
					flex: 1;
					font-size: 2.5vh;
				}

				.count {
					align-items: center;
					flex: 2;
					display: flex;

					.minus-add {
						border: 1px solid skyblue;
						width: 2vh;
						height: 2vh;
						background-color: #eeeeee;
						line-height: 2vh;
						text-align: center;
					}
				}
			}
		}

	}
</style>