<script lang="ts">
    import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

    let username: string = '';
    let password: string = '';
    let errorMessage: string = '';
    let showPassword: boolean = false;
    let passwordInput: HTMLInputElement | null = null;

    async function handleLogin() {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                // 登录成功，执行页面重定向
                console.log('登录成功，跳转到 /home');
                window.location.href = '/home'; // 手动重定向
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || '登录失败';
            }
        } catch (error) {

            errorMessage = '请求失败，请检查网络';
        }
    }

    function togglePasswordVisibility() {
        showPassword = !showPassword;
        if (passwordInput) {
            passwordInput.type = showPassword ? 'text' : 'password';
        }
    }
</script>



<main class="login-container">
    <div class="login-left">
        <img src="/auth/login.png" alt="Login illustration" class="login-img" />
    </div>
    <div class="login-right">
        <h2>it-tools 欢迎您!</h2>
        <form on:submit|preventDefault={handleLogin} class="login-form">
            {#if errorMessage}
                <p class="error">{errorMessage}</p>
            {/if}
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" bind:value={username} placeholder="用户名" required />
            </div>
            <div class="form-group password-group">
                <label for="password">用户密码</label>
                <input type="password" id="password" bind:this={passwordInput} bind:value={password} placeholder="用户密码" required />
                <button type="button" class="password-toggle" on:click={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
            </div>

            <a href="/forgot-password" class="forgot-password">忘记密码？</a>
            <button type="submit" class="login-button">登录</button>
        </form>
    </div>
</main>
<!-- 引入样式 -->
<link rel="stylesheet" href="/auth/login.css">
