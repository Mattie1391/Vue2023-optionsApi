// 引入 Vue 3 的 createApp 函數
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// 創建一個 Vue 3 應用程式
createApp({
  // 定義數據
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  // 定義方法
  methods: {
    // 登錄方法
    login() {
      // 定義 API 的 URL
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      
      // 使用 axios 發送 POST 請求
      axios.post(api, this.user).then((response) => {
        // 從 API 響應中獲取 token 和過期時間
        const { token, expired } = response.data;
        
        // 寫入 cookie，將 token 存儲在客戶端，並設置過期時間
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        
        // 重定向到 products.html 頁面
        window.location = 'products.html';
      }).catch((err) => {
        // 如果登錄失敗，顯示錯誤信息
        alert(err.response.data.message);
      });
    },
  },
}).mount('#app'); // 將 Vue 應用程式掛載到具有 id 為 'app' 的 HTML 元素上
