<template>
	<view>
		<NavBar></NavBar>
		<!-- 轮播图 -->
		<view>
			<u-swiper :list="swiperImg" :height="swiperHeight" indicatorMode="dot" indicator circular></u-swiper>
		</view>
		<!-- 海报 -->
		<List title="4K大幅海报" :list="posterList"></List>
		<List title="猫粮" :list="foodList"></List>
		<List title="猫罐头" :list="canList"></List>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue'
	import NavBar from "../../components/NavBar.vue"
	import List from "../../components/List.vue"
	import p1 from '../../static/homepage/store1.jpg'
	import p2 from '../../static/homepage/store2.jpg'
	import p3 from '../../static/homepage/store3.jpg'
	import {useStore} from 'vuex'
	const posterList = ref([])
	const foodList = ref([])
	const canList = ref([])
	const store=useStore()
	const swiperImg=[p1,p2,p3]
	const swiperHeight = 750 * 400 / 640

	const getList = async (type,list) => {
		let res = await uni.$get(`/store-api/${type}/list`)
		// let res = await uni.$get(`http://localhost:3000/store-api/${type}/list`)
		list.value = res.data
		store.commit("set"+type.at(0).toUpperCase()+type.substring(1),res.data)
		// console.log(poster.value)
	}
	onMounted(
		() => {
			getList('poster',posterList)
			getList('food',foodList)
			getList('can',canList)
		}
	)
</script>

<style scoped>



</style>