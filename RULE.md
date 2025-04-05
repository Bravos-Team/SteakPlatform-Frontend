# <span style="color:yellow">(update mới mục 4. về *`CSS`*)</span> CODING, CẤU TRÚC DỰ ÁN VÀ Ý NGHĨA TRONG VUEJS VỚI VITE LÀ BUILD TOOL
- Cách **`import file`** cấp thư mục **`src`** trở đi, anh em dùng *`@`* + *`đường dẫn`*
* <span style="color:yellow">EX: </span> **`@/assets/styles/auth/auth.css`** nó sẽ biết bắt đầu từ *`src`* trở đi <- *`vite`* tự cấu hình *`alias`* từ lúc tạo dự án
---
### 1. Cấu trúc dự án
- Như **`java`** các file chứa biến môi trường nằm ở **`root`**.
* Cấu trúc thư mục bắt đầu từ **`src`**, một vài trường hợp đặt biệt, ví dụ như thư mục **`public`** chứa tài nguyên tĩnh, và các file cấu hình sẽ nằm ngoài **`src`**.
- **`assets`** sẽ chứa các **`folder`** *`images, css, scss, less, sass, fonts, audio`*, ngoài ra giống như **`public`** cũng chứa tài nguyên tĩnh, nhưng **`assets`** sẽ được *`vite/webpack`*  <span style="color: yellow">quản lý, hash đổi tên file</span> và <span style="color: yellow">tối ưu</span> resources khi <span style="color: yellow">build</span> và <span style="color: yellow">deploy</span>. 

- **`layouts`** các trang sẽ có các *`layout`* và các *`component`* khác nhau nên cần tạo các *`layout`* cho từng trang tương ứng, và lắp *`component`* vào, và *`content`* thay đổi liên tục sẽ làl phần thân.

- **`components`** dùng lưu trữ các <span style="color: yellow">component riêng biệt</span> cho từng trang hoặc <span style="color: yellow">tái sử dụng nhiều lần</span>, ví dụ như **`LoginPage`** có **`Header`** khác **`HomePage`** thì tạo *`src/components/auth/header.vue`* và gắn vào **`LoginPage`**, hoặc 1 **`ModalPopup`** thông báo muốn tái sử dụng cho nhiều trang thì tạo trong *`src/components/base/ModalPopup.vue`* rồi coding custom bằng thẻ `<slot></slot>` trong vue.

- **`router`** dùng để xử lý liên quan đến đường dẫn trong file **`index.js`**, có thể viết service rồi dùng nó trong **`index.js`**, **`router`** có phương thức *`beforeEach`*, đại khái **`router`** có khả năng như 1 *`filter`* trước khi người dùng truy cập vào thì nó sẽ chạy *`beforeEach`*.

- **`services`** dùng để <span style="color:yellow">coding</span> những thứ <span style="color:yellow">ko cần reactivity hoặc state toàn cục</span> -> reload trang mất dữ liệu.

- **`stores`** giống như **`services`** nhưng có <span style="color:yellow">state toàn cục và có thể reactivity</span> khi sử dụng *`defineStore`* của <span style="color:yellow">Pinia</span>.

- **`views`** chứa các *`components`* của trang đó và <span style="color:yellow">coding</span> dữ liệu. *`Component`* và **`view`** giao tiếp với nhau qua *`props`* và *`emit`*.

- **`main.js`** file khởi động *`vue application`* dùng để cấu hình plugin nếu có dùng plugin mới


### 2. <span style="color: yellow">Coding code</span> with <span style="color:green">Composition API</span>
- Khả năng khi tham khảo hay tìm cách trên chatGPT nó sẽ đưa code theo hướng Options API, nên cần chuyển đổi nó thành kiểu module hóa Compositon API with Script Setup - Single File Component, thân thiện với ae code Java hay Javascript đó giờ.
- Như ý trên đã nói, dùng <span style="font-weight: bold"> `<script setup></script>` thay vì `setup(){}`</span>
* <span style="color:yellow">Ex</span> - `Optional API`: 
```vue
<script>
    export default(){
        data(){
            return {
                message: "Hello Vue!" // các biến được khai báo trong data mặt định state reactive
            }
        }
    }
</script>
```
* <span style="color:yellow">Ex</span> - `Composition API`:
```vue
<script setup>
import {ref} from ".vue" // ở Composition API mọi thử đc import khi sử dụng như java, rất thuận tiện

const message =ref("") // muốn reactive bọc vào ref/reactive
</script>
```

### 3. Chuẩn code chung của team
- Dùng lớp service *`api.js`* để code với **`axios`** nhé
```vue
<script setup>
import {base_api} from "@services/api"

const getUsers = async () => {
    try{
        const response = await base_api.get("/users");
        return response.json()
    }catch(err){ console.log(err.message)}
}
</script>
```
- Hầu hết đều giống với việ code Backend nên không có gì đáng nói, có thể trong tương lai sẽ bổ sung sau

### 4. Cấu trúc file css global, native css variables với TailwindCss
- Anh em sẽ tải [Extension TailwindCss IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) về để code bổ trợ **`Tailwindcss`**
- **`assets/config/tailind.ss`** thư mục này chứa <span style="color:yellow">file cấu hình, biến css native và Css toàn cục</span>, bất kì file *`css`* hay *`Native Css Variables`* nào anh em muốn **`global`** cứ *`@import`* nó vào nhé

<span style="color:yellow">EX: </span>
```vue
URL: @assets/variables/auth/_auth.css  // quy ước chung file chứa biến toàn cục đặt tên có tiền tố _ trước tên

:root{ // root ở cấp html ngang hàng
  --mau-den: #000;  // Đây là Native Css Varibles
}
```
```vue
URL: @assest/styles/auth/auth.css

.header-black{
  color: var(--mau-den); // ví dụ trong auth.css có khai báo 1 css chỉnh header màu đen
}
```
```vue
@assest/config/tailwind.css

@import @assets/variables/auth/_auth.css // đã import vào nên auth.css có thể dùng biến --mau-den
@import "@/assets/styles/auth/auth.css" // import nó vào tailwind.css auto có thể .header-black hoặc class="header-black" ở bất cứ nơi nào
```