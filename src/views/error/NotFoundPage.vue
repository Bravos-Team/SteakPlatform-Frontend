<template>
  <main
    class="grid min-h-[100vh] place-items-center text-white bg-[#101014] px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <p
        class="text-9xl font-black filter-[drop-shadow(0_0_1.5rem_rgba(99,102,241,0.5))] text-indigo-600 dark:text-indigo-300"
      >
        404
      </p>
      <h1
        class="mt-4 font-semibold tracking-tight text-balance text-gray-900 dark:text-white text-3xl"
      >
        Page not found
      </h1>
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Go back home</router-link
        >
        <router-link
          :to="{ name: 'SupportCenter' }"
          class="text-sm font-semibold text-gray-900 dark:text-white"
        >
          Contact support <span aria-hidden="true">&rarr;</span>
        </router-link>
      </div>
    </div>
  </main>
</template>
