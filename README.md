# SteakPlatform Frontend

🎮 **SteakPlatform** là một nền tảng phân phối game kỹ thuật số được phát triển bởi **Bravos Team**. Dự án này cung cấp giao diện người dùng cho cả game thủ và nhà phát triển game.

## 🚀 Tổng quan

SteakPlatform Frontend được xây dựng với Vue 3, TypeScript và Vite, cung cấp trải nghiệm mượt mà cho việc:

- **🛒 Mua sắm game**: Giao diện store hiện đại với slider carousel, tìm kiếm nâng cao
- **👥 Quản lý publisher**: Tools cho nhà phát triển game để upload và quản lý sản phẩm
- **💳 Thanh toán**: Hệ thống thanh toán tích hợp
- **🌍 Đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- **📱 Responsive**: Tối ưu cho mọi thiết bị

## 🛠️ Tech Stack

- **Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Pinia
- **Router**: Vue Router
- **UI Components**: Custom components + Shadcn/ui
- **Testing**: Vitest
- **Linting**: ESLint
- **Internationalization**: Vue I18n

## 📁 Cấu trúc thư mục

```
src/
├── apis/           # API endpoints và services
├── assets/         # Static assets (images, css, variables)
├── components/     # Vue components
│   ├── auth/       # Authentication components
│   ├── common/     # Shared components
│   ├── game/       # Game-related components
│   ├── publisher/  # Publisher dashboard components
│   ├── store/      # Store/marketplace components
│   └── ui/         # Base UI components
├── composables/    # Vue composables
├── hooks/          # React Query hooks cho API
├── i18n/           # Internationalization
├── layouts/        # Page layouts
├── router/         # Routing configuration
├── stores/         # Pinia stores
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── views/          # Page components
```

## 🚀 Bắt đầu

### Yêu cầu hệ thống

- Node.js >= 18
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone https://github.com/Bravos-Team/SteakPlatform-Frontend.git

# Di chuyển vào thư mục dự án
cd SteakPlatform-Frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

### Scripts có sẵn

```bash
npm run dev          # Chạy development server
npm run build        # Build cho production
npm run preview      # Preview production build
npm run test:unit    # Chạy unit tests
npm run lint         # Kiểm tra code style
npm run type-check   # Kiểm tra TypeScript
```

## 🏗️ Kiến trúc

### Components Architecture

- **Atomic Design**: Components được tổ chức theo nguyên tắc atomic design
- **Composition API**: Sử dụng Vue 3 Composition API cho logic tái sử dụng
- **TypeScript**: Type-safe development với TypeScript

### State Management

- **Pinia**: Quản lý state toàn cục
- **Composables**: Local state management với Vue composables
- **React Query**: Server state management cho API calls

### Styling

- **TailwindCSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Giao diện tối chủ đạo

## 🎨 Features chính

### 🛍️ Store/Marketplace

- **Game Carousel**: Slider với thumbnail navigation và autoplay
- **Search & Filter**: Tìm kiếm game với nhiều bộ lọc
- **Game Details**: Trang chi tiết game với media gallery
- **Shopping Cart**: Giỏ hàng với wishlist integration

### 👨‍💻 Publisher Dashboard

- **Game Management**: Upload và quản lý game
- **Asset Management**: CDN integration cho media files
- **Analytics**: Thống kê và báo cáo
- **Verification System**: Quy trình duyệt game

### 💳 Payment System

- **Multiple Payment Methods**: Hỗ trợ nhiều phương thức thanh toán
- **Order Management**: Quản lý đơn hàng
- **Transaction History**: Lịch sử giao dịch

### 🌐 Internationalization

- **Multi-language**: Tiếng Việt và Tiếng Anh
- **Dynamic Language Switching**: Chuyển đổi ngôn ngữ realtime
- **Localized Content**: Nội dung được bản địa hóa

## 🔧 Development Guidelines

### Code Style

- ESLint configuration tuân theo Vue 3 best practices
- Prettier cho code formatting
- TypeScript strict mode

### Git Workflow

```bash
# Tạo branch mới cho feature
git checkout -b feat/feature-name

# Hoặc bugfix
git checkout -b fix/bug-description

# Hoặc hotfix
git checkout -b hotfix/critical-fix

# Commit với conventional commits
git commit -m "feat: add new game slider component"
git commit -m "fix: resolve thumbnail navigation issue"
git commit -m "hotfix: cleanup orphaned images"
```

### Component Guidelines

```vue
<template>
  <!-- Template với semantic HTML -->
</template>

<script setup lang="ts">
// Composition API với TypeScript
// Props, emits, và logic được định nghĩa rõ ràng
</script>

<style scoped>
/* Scoped styles với TailwindCSS */
</style>
```

## 🧪 Testing

```bash
# Chạy unit tests
npm run test:unit

# Chạy tests với coverage
npm run test:coverage

# Chạy tests trong watch mode
npm run test:watch
```

## 📦 Deployment

### Build Production

```bash
npm run build
```

### Environment Variables

```env
VITE_API_BASE_URL=https://api.steak.io.vn
VITE_CDN_BASE_URL=https://ccdn.steak.io.vn
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Tạo Pull Request

## 📝 Changelog

### [Latest] - 2025-07-24

#### Added
- 🎯 Progress bar animation cho store slider thumbnails
- ⚡ Optimized autoplay timeout management
- 🎨 Enhanced GameSlider với thumbnail interaction
- 🗂️ CDN assets manager improvements
- 🌐 I18n translations updates

#### Fixed
- 🐛 Slider vertical thumbnail navigation
- 🔄 Autoplay timeout overlapping issues
- 🖼️ Image cleanup for orphaned files

## 📄 License

Copyright © 2025 Bravos Team. All rights reserved.

## 👥 Team

**Bravos Team** - Passionate game platform developers

---

🎮 **Happy Gaming!** 🎮
