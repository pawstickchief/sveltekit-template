import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// 指定构建输出路径
		outDir: './dist'  // 你可以根据需求修改输出路径，例如 './build' 或其他
	},
	server: {
		// 指定默认监听地址和端口
		host: '0.0.0.0',  // 监听所有IP地址，包括局域网和容器内访问
		port: 8001 ,       // 指定默认监听端口
		fs: {
			allow: ['src', 'static'] // 确保 'src' 目录被允许访问
		}
	}
});
