import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
	plugins: [
		uni()
	],
	// ifdef H5
	server: {
		proxy: {
			"/store-api": {
				target: "http://localhost:3000", 
				changeOrigin: true,
			},
			"/backstage-api": {
				target: "http://localhost:3000", 
				changeOrigin: true,
			},
		},


	},
	//endif
})