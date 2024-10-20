import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const { url, cookies } = event;
    const pathname = url.pathname;

    // 输出请求的路径
    console.log('Checking path:', pathname);

    // 放行静态文件、API 和登录页面（包括任何以 /login 开头的路径）
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/static')
    ) {
        console.log('Path is allowed without authentication:', pathname);
        return await resolve(event);
    }

    // 从 cookies 中获取登录状态和 token
    const authToken = cookies.get('token');

    // 打印 cookie 中 auth_token 的值
    console.log('auth_token:', authToken);

    // 如果没有登录，重定向到登录页面
    if (!authToken) {
        // 打印没有 token 的情况
        console.log('No auth token found. Redirecting to /login');
        throw redirect(302, '/login');
    }

    // 打印有 token 的情况，继续处理请求
    console.log('Auth token found. Proceeding with request.');

    // 如果已登录，继续处理请求
    return await resolve(event);
};
