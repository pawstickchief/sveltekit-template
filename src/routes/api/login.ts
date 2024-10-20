import axios from 'axios';
import type { RequestHandler } from '@sveltejs/kit';
interface LoginResponse {
    code: number;
    token: string;  // `token` 在成功时存在，失败时可以省略
    message: string;
}
export const POST: RequestHandler = async ({ request, cookies }) => {
    const { username, password } = await request.json();

    try {
        // 使用 axios 向后端 API 发出请求
        const apiResponse = await axios.post<LoginResponse>('http://dev.pawstickchief.com:8002/login', {
            UserName: username,
            UserCode: Number(password)
        }, {
            withCredentials: true  // 确保发送跨域请求时发送和接收 Cookie
        });

        const result = apiResponse.data;

        if (result.code === 1000) {
            // 登录成功
            const token = result.token;

            console.log('Token received from API:', token);

            // 设置登录状态 cookie
            cookies.set('token', token, { path: '/',  maxAge: 60 * 60 });

            return new Response(JSON.stringify({ message: '登录成功', token }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            // 返回登录失败的响应
            return new Response(JSON.stringify({ message: result.message || '登录失败' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('Error during API request:', error);

        return new Response(JSON.stringify({ message: '请求后端 API 失败' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
