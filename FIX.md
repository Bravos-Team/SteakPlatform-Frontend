# FIX BUG HOẶC THIẾU DEPENDENCIES VUEJS
## Khả năng khi khởi chạy dự án hoặc clone dự án về ae sẽ bị lỗi thiếu dependencies

### 1. chạy lệnh yarn install hoặc npm install trước khi chạy dự  án ( tương tự mvn clean install bên java)
- *`npm install yarn`* sử dụng **`yarn`** thay cho *`npm`* vì nó nhanh và nhẹ hơn, giúp đỡ conflict thư viện
---
### 2. Nếu sau khi chạy *`yarn install`* mà vẫn lỗi ae đọc log r tải đúng cái về thử
- yarn add -D tailwindcss @tailwindcss/vite <- thêm tailwindcss vào môi trường build của vite
- yarn add pinia-plugin-persistedstate <- plugins cho Pinia
- yarn add tailwindcss @tailwindcss/postcss postcss <- xử lí việc build file css
- yarn add tailwindcss @tailwindcss/cli <- CLI cho tailwind

### 3. Sử dụng [TailwindCss IntelliSense Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) code chung với Taildwind