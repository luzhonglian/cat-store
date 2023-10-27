<template>
	<view class="user">
		<!-- style="border: 1px solid black;" -->
		<nav-title title='个人中心'></nav-title>
		<view v-if="!store.state.token" class="unlogin">
			<u--form class="form" labelPosition="left" :model="userInfo" :rules="rules" ref="formRef">
				<u-form-item label="🐱用户名" prop="username" borderBottom labelWidth='150' >
					<u--input 
					placeholderStyle='color: #fc9c7c;'
					class="input"
					v-model="userInfo.username" placeholder="请输入用户名"></u--input>
				</u-form-item>
				<u-form-item label="🐈密码" prop="password" borderBottom labelWidth='150'>
					<u--input 
					class="input"
					placeholderStyle='color: #fc9c7c;'
					type='password' v-model="userInfo.password" placeholder="请输入密码"></u--input>
				</u-form-item>
			</u--form>
			<view class="_login"   >
				
			<u-button text="登录" type="success" @click="login"></u-button>
			</view>
			<!-- 为了做小程序的兼容，套了层view -->
			<view class="register">				
			<u-button text="注册" type="primary" @click="register"  ></u-button>
			</view>

		</view>
		<view v-else>
			<view class="show-name">
				<br>
				欢迎喜猫靓仔 <br>
				😺{{store.state.userInfo.username}}😸
				<br>
				在小猫商城享受
				<br>
				😼😽🙀
				<br>
				快乐的购物体验
				<br>
				😿😾🐱😻
				<br>
				<br>
			</view>
			<button type="warn" @click="quit" class="quit">退出登录</button>
		</view>
	</view>

</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue";
	import {
		useStore
	} from 'vuex'
	import NavTitle from "../../components/NavTitle.vue"
	const store = useStore()
	const userInfo = reactive({
		username: '',
		password: ''
	})
	const rules = {
		username: {
			type: 'string',
			min: 3,
			max: 12,
			message: '用户名长度在3-12之间',
			trigger: ['blur'],
			required: true
		},
		password: {
			type: 'string',
			min: 3,
			max: 12,
			message: '密码长度在3-12之间',
			trigger: ['blur'],
			required: true
		},
	}
	const formRef = ref(null)
	const login = async () => {
		let valid = await formRef.value.validate()
		if (valid) {
			const res = await uni.$post('/backstage-api/user/login', userInfo)
			const {
				header,
				data
			} = res
			// console.log(res)
			// console.log(header.authorization)
			if (data.ActionType === 'ok') {
				// console.log(data)
				store.commit('setUserInfo', data.data)
				store.commit('setToken', header.authorization)
				uni.showToast({
					title: '登录成功😸',
					mask: true,
					icon: 'success',
					duration: 800
				});
			} else {
				uni.showToast({
					title: '账号或密码错误😿',
					mask: true,
					icon: 'error',
				});
			}
		}
	}
	const register = async () => {
		let valid = await formRef.value.validate()
		if (valid) {
			const res = await uni.$post('/backstage-api/user/add', userInfo)
			// console.log(res)
			if (res.statusCode === 201) {
				uni.showToast({
					title: '注册成功!😼',
					mask: true,
					icon: 'success',
					duration: 1000
				});
			}
		}
	}
	const quit = () => {
		uni.showModal({
			title: '确认退出？🙀',
			fail: () => {},
			success: () => {
				store.commit('setUserInfo', '')
				store.commit('setToken', '')
				store.commit('clearGood')
				store.commit('setIsOrder', false)
				userInfo.username = ''
				userInfo.password = ''
			}
		});

	}
</script>

<style scoped lang="scss">
	.user {
		background-image: url('http://localhost:3000/user.jpg');
		height: 92vh;
		//#ifdef MP-WEIXIN
			height: 100vh;
		//#endif
		background-size: contain;
		// background-color: pink;
		.show-name {
			width: 60vw;
			// height: 50vh;
			background-color: rgba(255, 255, 255, 0.85);
			border-radius: 10%;
			margin-top: 10vh;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: 4vh;
			text-align: center;
		
		}
		.quit {
			position: absolute;
			bottom: 1vh;
			left: 50%;
			transform: translateX(-50%);
			width: 50%;
		}

		

		.unlogin {
			background-color: rgba(255, 255, 255, 0.85);
			border-radius: 10%;
			margin-top: 10vh;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: 4vh;
			// text-align: center;
			width: 80vw;
			padding: 5vh 2vw;
			display: flex;
			flex-direction: column;
			justify-items: center;
			::v-deep .u-input{
				box-shadow: 0 0 1px black;
			}
			 ._login {
			
				height: 6vh;
				width: 60%;
				margin-left: 20%;
				margin-top: 2vh;
				margin-bottom: 2vh;
			}
			
			.register {
				height: 6vh;
				width: 60%;
				margin-bottom: 2vh;
				margin-left: 20%;
			}
		}

		

	}
</style>