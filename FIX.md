# FIX KHI BỊ CHẠY BỊ BÁO LỖI
## Khả năng vì thiếu dependencies, đối với các dự án FE có dùng NodeJS thì phải chạy npm install về các dependencies trước khi chạy
### Đối với tailwindCss ae tải extension [TailwindCss IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
### 1. Có thể sẽ thiếu dependencies khi khởi chạy dự án hoặc pull code mới
- **`npm install yarn`** <-- dùng thay cho *`npm`* vì nhẹ và nhanh hơn, đỡ <span style="color:red">conflict</span> hơn
---
### 2. Optional nếu chạy lệnh trên vẫn thiếu dependencies thì đọc log rồi tải đúng phần thiếu về
- **`chạy lệnh yarn install`** trước khi chạy dự  án ( tương tự *`mvn clean install`* bên *`java`*)
- **`yarn add pinia-plugin-persistedstate`** <-- *`plugin`* cho *`Pinia`* 
- **`yarn add tailwindcss @tailwindcss/vite`** <-- *`dependencies tailwindcss*`
- **`yarn add tailwindcss @tailwindcss/postcss postcss`** <-- *`Plugin`* tích hợp *`tailwindcss`* vào dự án
- **`yarn add tailwindcss @tailwindcss/cli`**  <-- *`CLI tailwindcss`*
