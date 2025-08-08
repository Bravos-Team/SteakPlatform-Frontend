import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { VueQueryPlugin, VueQueryPluginOptions, QueryClient } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import Particles from 'vue3-particles'
import { RouteLocationNormalized } from 'vue-router'
// import { VueReCaptcha } from 'vue-recaptcha-v3'
import i18n from '@/i18n/index'
import './assets/index.css'
import { mutationDefaults } from '@/hooks/mutationDefaults/mutations'
import { queryDefaults } from '@/hooks/queryDefaults/queries'
const queryClient = new QueryClient()

queryDefaults.forEach((query) => {
  queryClient.setQueryDefaults(query.key, {
    queryFn: query.fn,
    retry: query?.retry,
    refetchOnMount: query?.refetchOnMount,
    refetchOnWindowFocus: query?.refetchOnWindowFocus,
    refetchInterval: query?.refetchInterval,
    refetchOnReconnect: query?.refetchOnReconnect,
    select: query?.select,
    enabled: query?.enabled,
    staleTime: query?.staleTime,
  })
})
mutationDefaults.forEach((mutation) => {
  queryClient.setMutationDefaults(mutation.key, {
    mutationFn: mutation.fn,
    onSuccess: mutation?.onSuccessFn ?? undefined,
    onError: mutation?.onErrorFn ?? undefined,
    onSettled: mutation?.onSettledFn ?? undefined,
    onMutate: mutation?.onMutateFn ?? undefined,
    retry: mutation.retry,
  })
})

const pinia = createPinia()
pinia.use(persist)

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        retryOnMount: false,
        retry: true,
      },
    },
  },
}

const app = createApp(App).use(Particles)

app.use(router).use(pinia).use(VueQueryPlugin, vueQueryPluginOptions).use(i18n)

router.afterEach((to: RouteLocationNormalized) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
})

app.mount('#app')
