// 引入 Vue 3 的 createApp 函數
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// 使用 createApp 創建 Vue 應用程式
createApp({
  // data 函數返回資料物件，包含 apiUrl、apiPath、products、tempProduct 四個資料屬性
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2', // API 的基礎 URL
      apiPath: 'footballactivitytaiwan', // API 的路徑
      products: [], // 存放產品資料的陣列
      tempProduct: {}, // 暫存產品資料的物件
    }
  },
  // methods 函數包含了三個方法：checkAdmin、getData、openProduct
  methods: {
    // 檢查是否為管理員
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`; // 構建 API 請求的 URL
      axios.post(url) // 發送 POST 請求
        .then(() => {
          this.getData(); // 若請求成功，則呼叫 getData 方法取得資料
        })
        .catch((err) => {
          alert(err.response.data.message); // 若請求失敗，彈出錯誤訊息
          window.location = 'login.html'; // 重新導向至登入頁面
        })
    },
    // 取得產品資料
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`; // 構建 API 請求的 URL
      axios.get(url) // 發送 GET 請求
        .then((response) => {
          this.products = response.data.products; // 將取得的產品資料存入 products 中
        })
        .catch((err) => {
          alert(err.response.data.message); // 若請求失敗，彈出錯誤訊息
        })
    },
    // 開啟特定產品的詳細資料
    openProduct(item) {
      this.tempProduct = item; // 將點擊的產品資料存入 tempProduct 中
    }
  },
  // mounted 鉤子在實例被創建之後立即執行，這裡用來設定預設的 HTTP 標頭及執行檢查是否為管理員的方法
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token; // 設定 HTTP 標頭的 Authorization 欄位為取得的 Token

    this.checkAdmin(); // 呼叫檢查是否為管理員的方法
  }
}).mount('#app'); // 將 Vue 應用程式掛載到指定的 HTML 元素上（這裡是 id 為 app 的元素）
