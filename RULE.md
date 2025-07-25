ya# 📋 TEAM DEVELOPMENT RULES & WORKFLOW

## 🚀 QUY TRÌNH LÀM VIỆC NHÓM (TEAM WORKFLOW)

### 1. Git Workflow & Branch Strategy

#### 🌳 Branch Naming Convention
```bash
# Feature branches
feat/feature-name               # Thêm tính năng mới
feat/store-slider-component     # VD: Component slider cho store

# Bug fix branches  
fix/bug-description            # Sửa lỗi
fix/slider-autoplay-issue      # VD: Sửa lỗi autoplay slider

# Hotfix branches (urgent fixes)
hotfix/critical-issue          # Sửa lỗi khẩn cấp
hotfix/cleanup-orphaned-images # VD: Cleanup images lỗi

# Release branches
release/v1.2.0                 # Chuẩn bị release

# Development branch
develop                        # Branch chính để phát triển
```

#### 🔄 Git Commands Workflow
```bash
# 1. Luôn pull latest từ develop trước khi tạo branch mới
git checkout develop
git pull origin develop

# 2. Tạo branch mới từ develop
git checkout -b feat/your-feature-name

# 3. Code và commit theo conventional commits
git add .
git commit -m "feat: add slider progress animation"

# 4. Push branch lên remote
git push origin feat/your-feature-name

# 5. Tạo Pull Request trên GitHub
# 6. Sau khi PR được approve, merge vào develop
# 7. Xóa branch local sau khi merge
git checkout develop
git pull origin develop
git branch -d feat/your-feature-name
```

#### 📝 Conventional Commits
```bash
feat: thêm tính năng mới
fix: sửa lỗi
docs: cập nhật documentation
style: format code, không thay đổi logic
refactor: refactor code mà không thay đổi chức năng
test: thêm hoặc sửa tests
chore: update dependencies, build config
perf: cải thiện performance
ci: thay đổi CI/CD config

# Examples:
git commit -m "feat: add progress bar animation for store slider"
git commit -m "fix: resolve autoplay timeout overlapping issue"
git commit -m "refactor: optimize thumbnail navigation logic"
git commit -m "docs: update README with deployment guide"
```

### 2. Code Review Process

#### ✅ Pull Request Checklist
- [ ] Code compile không lỗi (`npm run build`)
- [ ] Linting pass (`npm run lint`)
- [ ] Type checking pass (`npm run type-check`)
- [ ] Tests pass (`npm run test:unit`)
- [ ] Component responsive trên mobile/tablet/desktop
- [ ] Code follow coding standards (xem section dưới)
- [ ] Có comment cho logic phức tạp
- [ ] Remove console.log và debug code
- [ ] Optimize images và assets

#### 👥 Review Requirements
- **Mỗi PR cần ít nhất 1 approve** từ team member khác
- **Senior dev review** cho các thay đổi architecture lớn
- **Self-review** trước khi request review từ team

---

## 💻 CODING STANDARDS & BEST PRACTICES
### 3. File & Folder Structure Guidelines

#### 📁 Import Path Convention
- Dùng **`@`** cho import từ **`src`** directory
```typescript
// ✅ Correct
import { useImageStore } from '@/stores/image/useImageStored'
import HeaderAuth from '@/components/auth/HeaderAuth.vue'
import '@/assets/css/auth/auth.css'

// ❌ Incorrect
import { useImageStore } from '../../stores/image/useImageStored'
import HeaderAuth from '../../../components/auth/HeaderAuth.vue'
```

#### 🗂️ Component Organization
```
src/components/
├── auth/              # Authentication related components
├── common/            # Reusable components across pages
├── game/              # Game specific components  
├── publisher/         # Publisher dashboard components
├── store/             # Store/marketplace components
└── ui/                # Base UI components (Button, Input, etc.)
```

#### 📄 File Naming Convention
```bash
# Vue Components: PascalCase
GameSlider.vue
StoreTopBar.vue
UserProfile.vue

# Composables: camelCase with 'use' prefix
useImageCompressor.ts
useApiClient.ts
useLocalStorage.ts

# Stores: camelCase with store suffix
useImageStored.ts
useUserStore.ts

# Types: PascalCase with Type suffix
GameDetailsType.ts
ApiResponseType.ts

# Utils: camelCase
formatCurrency.ts
validateEmail.ts
```

### 4. Vue 3 + TypeScript Standards

#### 🔧 Component Template
```vue
<template>
  <!-- Use semantic HTML -->
  <section class="game-slider">
    <div class="slider-container">
      <!-- Template content -->
    </div>
  </section>
</template>

<script setup lang="ts">
// 1. Imports (external libs first, then internal)
import { ref, computed, onMounted } from 'vue'
import { useKeenSlider } from 'keen-slider/vue.es'
import { useImageStore } from '@/stores/image/useImageStored'

// 2. Props definition
interface Props {
  gameData: GameType[]
  autoplay?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  autoplay: true
})

// 3. Emits definition  
interface Emits {
  slideChanged: [index: number]
  slideClicked: [gameId: string]
}
const emit = defineEmits<Emits>()

// 4. Reactive variables
const currentSlide = ref(0)
const isPlaying = ref(false)

// 5. Computed properties
const totalSlides = computed(() => props.gameData.length)

// 6. Methods
const goToSlide = (index: number) => {
  // Method implementation
  emit('slideChanged', index)
}

// 7. Lifecycle hooks
onMounted(() => {
  // Initialization logic
})
</script>

<style scoped>
/* Minimal scoped styles only when necessary */
/* Prefer TailwindCSS classes */
</style>
```

#### 🎯 Composition API Best Practices
```typescript
// ✅ Use Composition API with <script setup>
<script setup lang="ts">
import { ref, reactive } from 'vue'

// Reactive primitives
const count = ref(0)
const isLoading = ref(false)

// Reactive objects
const user = reactive({
  name: '',
  email: ''
})
</script>

// ❌ Avoid Options API
<script>
export default {
  data() {
    return {
      count: 0,
      isLoading: false
    }
  }
}
</script>
```

### 5. API & State Management

#### 🌐 API Calls with React Query
```typescript
// hooks/useGameData.ts
export const useGameList = () => {
  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const response = await base_api.get('/games')
      return response.data
    }
  })
}

// Component usage
<script setup lang="ts">
import { useGameList } from '@/hooks/useGameData'

const { data: games, isLoading, error } = useGameList()
</script>
```

#### 🗄️ Pinia Store Pattern
```typescript
// stores/useGameStore.ts
export const useGameStore = defineStore('game', () => {
  // State
  const games = ref<GameType[]>([])
  const currentGame = ref<GameType | null>(null)
  
  // Getters (computed)
  const featuredGames = computed(() => 
    games.value.filter(game => game.featured)
  )
  
  // Actions
  const setCurrentGame = (game: GameType) => {
    currentGame.value = game
  }
  
  const fetchGames = async () => {
    try {
      const response = await base_api.get('/games')
      games.value = response.data
    } catch (error) {
      console.error('Failed to fetch games:', error)
    }
  }
  
  return {
    // State
    games,
    currentGame,
    // Getters  
    featuredGames,
    // Actions
    setCurrentGame,
    fetchGames
  }
})
```

### 6. CSS & Styling Guidelines

#### 🎨 TailwindCSS + CSS Variables
```css
/* assets/variables/colors.css */
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  
  /* Gradients */
  --gradient-primary: linear-gradient(128deg, #3b82f6 0%, #1d4ed8 100%);
  --gradient-secondary: linear-gradient(128deg, #10b981 0%, #059669 100%);
}

/* assets/styles/components.css */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors;
  background: var(--gradient-primary);
}

.card-container {
  @apply bg-white/10 backdrop-blur-sm rounded-lg border border-white/20;
}
```

#### 🚫 Tránh Styled Components In SFC
```vue
<!-- ❌ Avoid -->
<style scoped>
.my-component {
  background: linear-gradient(128deg, #3b82f6 0%, #1d4ed8 100%);
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>

<!-- ✅ Prefer -->
<template>
  <div class="btn-primary p-4 rounded-lg">
    <!-- Content -->
  </div>
</template>
```

### 7. Error Handling & Validation

#### 🛡️ Error Handling Pattern
```typescript
// utils/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.response?.status === 401) {
    // Redirect to login
    router.push('/auth/login')
  } else if (error.response?.status >= 500) {
    toastErrorNotificationPopup('Server Error', 'Please try again later')
  } else {
    toastErrorNotificationPopup('Error', error.message || 'Something went wrong')
  }
}

// Component usage
<script setup lang="ts">
import { handleApiError } from '@/utils/errorHandler'

const saveGame = async () => {
  try {
    await mutateAsyncCreateDraftProject(gameData)
    toastSuccessNotificationPopup('Success', 'Game saved successfully')
  } catch (error) {
    handleApiError(error)
  }
}
</script>
```

#### 📋 Form Validation with Zod
```typescript
// utils/validation/gameSchema.ts
import { z } from 'zod'

export const gameSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform')
})

export type GameFormData = z.infer<typeof gameSchema>

// Component usage
<script setup lang="ts">
import { gameSchema, type GameFormData } from '@/utils/validation/gameSchema'

const validateForm = (data: GameFormData) => {
  try {
    gameSchema.parse(data)
    return { success: true, errors: [] }
  } catch (error) {
    return { success: false, errors: error.errors }
  }
}
</script>
```

### 8. Performance & Optimization

#### ⚡ Component Optimization
```vue
<script setup lang="ts">
// ✅ Use defineAsyncComponent for heavy components
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() => 
  import('@/components/charts/HeavyChart.vue')
)

// ✅ Use shallowRef for large objects that don't need deep reactivity
import { shallowRef } from 'vue'
const gamesList = shallowRef<GameType[]>([])

// ✅ Use computed for expensive calculations
const filteredGames = computed(() => {
  return gamesList.value.filter(game => 
    game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
```

#### 🖼️ Image Optimization
```vue
<template>
  <!-- ✅ Use loading="lazy" for images below fold -->
  <img 
    :src="game.thumbnail" 
    :alt="game.title"
    loading="lazy"
    class="w-full h-48 object-cover rounded-lg"
  />
  
  <!-- ✅ Use WebP format when possible -->
  <picture>
    <source :srcset="game.thumbnailWebp" type="image/webp">
    <img :src="game.thumbnail" :alt="game.title">
  </picture>
</template>
```

### 9. Testing Guidelines

#### 🧪 Unit Testing with Vitest
```typescript
// components/__tests__/GameSlider.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GameSlider from '../GameSlider.vue'

describe('GameSlider', () => {
  const mockGames = [
    { id: '1', title: 'Game 1', thumbnail: 'thumb1.jpg' },
    { id: '2', title: 'Game 2', thumbnail: 'thumb2.jpg' }
  ]

  it('renders games correctly', () => {
    const wrapper = mount(GameSlider, {
      props: { games: mockGames }
    })
    
    expect(wrapper.findAll('.game-slide')).toHaveLength(2)
    expect(wrapper.text()).toContain('Game 1')
  })

  it('emits slideChanged when slide changes', async () => {
    const wrapper = mount(GameSlider, {
      props: { games: mockGames }
    })
    
    await wrapper.find('.next-button').trigger('click')
    
    expect(wrapper.emitted('slideChanged')).toBeTruthy()
    expect(wrapper.emitted('slideChanged')?.[0]).toEqual([1])
  })
})
```

### 10. Deployment & Build

#### 🚀 Pre-deployment Checklist
```bash
# 1. Run all checks locally
npm run type-check    # TypeScript check
npm run lint         # ESLint check  
npm run test:unit    # Unit tests
npm run build        # Production build

# 2. Check build output
npm run preview      # Preview production build

# 3. Check bundle size
npm run build:analyze # Analyze bundle size
```

#### 🔧 Environment Variables
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_CDN_BASE_URL=http://localhost:3001
VITE_APP_DEBUG=true

# .env.production  
VITE_API_BASE_URL=https://api.steak.io.vn
VITE_CDN_BASE_URL=https://ccdn.steak.io.vn
VITE_APP_DEBUG=false
```

---

## 🚨 COMMON MISTAKES TO AVOID

### ❌ DON'Ts
```typescript
// ❌ Don't use any type
const userData: any = await fetchUser()

// ❌ Don't mutate props directly
props.gameData.push(newGame)

// ❌ Don't use console.log in production
console.log('Debug info:', data)

// ❌ Don't ignore error handling
const result = await riskyApiCall() // No try/catch

// ❌ Don't use var
var count = 0

// ❌ Don't use Options API
export default {
  data() { return {} }
}
```

### ✅ DO's
```typescript
// ✅ Use proper typing
interface UserData {
  id: string
  name: string
  email: string
}
const userData: UserData = await fetchUser()

// ✅ Emit events to modify parent data
emit('updateGameData', newGame)

// ✅ Use proper logging
if (import.meta.env.DEV) {
  console.log('Debug info:', data)
}

// ✅ Handle errors properly
try {
  const result = await riskyApiCall()
} catch (error) {
  handleApiError(error)
}

// ✅ Use const/let
const count = 0
let mutableCount = 0

// ✅ Use Composition API
<script setup lang="ts">
const message = ref('Hello')
</script>
```

---

## 📞 SUPPORT & RESOURCES

### 🔗 Useful Links
- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)

### 💬 Team Communication
- **Code Review**: GitHub Pull Requests
- **Questions**: Team Discord/Slack channel
- **Documentation**: Update this RULE.md khi có thay đổi

### 🆘 When in Doubt
1. Kiểm tra file này trước
2. Hỏi team member
3. Tham khảo official documentation
4. Tạo issue trong GitHub repo

---

## 📋 LEGACY RULES (Giữ lại từ version cũ)

### Cấu trúc dự án
- Dùng **`@`** cho import từ **`src`** directory  
* <span style="color:yellow">EX: </span> **`@/assets/styles/auth/auth.css`**
- Như **`java`** các file chứa biến môi trường nằm ở **`root`**.
* Cấu trúc thư mục bắt đầu từ **`src`**, một vài trường hợp đặt biệt, ví dụ như thư mục **`public`** chứa tài nguyên tĩnh, và các file cấu hình sẽ nằm ngoài **`src`**.
- **`assets`** sẽ chứa các **`folder`** *`images, css, scss, less, sass, fonts, audio`*, ngoài ra giống như **`public`** cũng chứa tài nguyên tĩnh, nhưng **`assets`** sẽ được *`vite/webpack`*  <span style="color: yellow">quản lý, hash đổi tên file</span> và <span style="color: yellow">tối ưu</span> resources khi <span style="color: yellow">build</span> và <span style="color: yellow">deploy</span>. 

- **`layouts`** các trang sẽ có các *`layout`* và các *`component`* khác nhau nên cần tạo các *`layout`* cho từng trang tương ứng, và lắp *`component`* vào, và *`content`* thay đổi liên tục sẽ làl phần thân.

- **`components`** dùng lưu trữ các <span style="color: yellow">component riêng biệt</span> cho từng trang hoặc <span style="color: yellow">tái sử dụng nhiều lần</span>, ví dụ như **`LoginPage`** có **`Header`** khác **`HomePage`** thì tạo *`src/components/auth/header.vue`* và gắn vào **`LoginPage`**, hoặc 1 **`ModalPopup`** thông báo muốn tái sử dụng cho nhiều trang thì tạo trong *`src/components/base/ModalPopup.vue`* rồi coding custom bằng thẻ `<slot></slot>` trong vue.

- **`router`** dùng để xử lý liên quan đến đường dẫn trong file **`index.js`**, có thể viết service rồi dùng nó trong **`index.js`**, **`router`** có phương thức *`beforeEach`*, đại khái **`router`** có khả năng như 1 *`filter`* trước khi người dùng truy cập vào thì nó sẽ chạy *`beforeEach`*.

- **`services`** dùng để <span style="color:yellow">coding</span> những thứ <span style="color:yellow">ko cần reactivity hoặc state toàn cục</span> -> reload trang mất dữ liệu.

- **`stores`** giống như **`services`** nhưng có <span style="color:yellow">state toàn cục và có thể reactivity</span> khi sử dụng *`defineStore`* của <span style="color:yellow">Pinia</span>.

- **`views`** chứa các *`components`* của trang đó và <span style="color:yellow">coding</span> dữ liệu. *`Component`* và **`view`** giao tiếp với nhau qua *`props`* và *`emit`*.

- **`main.ts`** file khởi động *`vue application`* dùng để cấu hình plugin nếu có dùng plugin mới


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
- Dùng lớp service *`api.ts`* để code với **`axios`** nhé
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

### 5. Tránh coding css trong `<styles scoped></scoped>`
- Vì nó là 1 **`styles blocks`** nên khi mỗi lần build hay thay đổi ứng dụng vite sẽ phải build riêng biệt cho từng **`styles block`**, nó là cơ chế giúp tách biệt các *`css`* ra khỏi các **`component`** khác, nhưng rất tốn hiệu năng gây giật tugn c*c khi có quá nhiều css. 
- Ngoài ra *`Css module`* cũng có cơ chế tương tự `<styles scoped></styles>`, tránh sài *`Css module`*

<span style="color: yellow">resolve: </span>
* Coding file *`css`* riêng rồi *`import`* vào **`tailwind.css`**, **`tailwindCss`** có cơ chết **`JIT (Just In Time compile)`**, cái nào dùng thì nó build, và build 1 lần.
* Dùng **`Native Css Variables`** toàn cục, có tốt hiệu năng nhưng ko đáng kể

- Đọc ở đây sẽ chi tiết hơn: [Tương thích trong TailwindCss](https://tailwindcss.com/docs/compatibility#explicit-context-sharing)