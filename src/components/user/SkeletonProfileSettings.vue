<template>
  <div class="min-w-full min-h-full animate-pulse">
    <div
      class="min-w-[3rem] min-h-[50rem] bg-gray-300/30 rounded-lg animate-pulse p-3 flex flex-col gap-y-8"
    >
      <div class="flex flex-col gap-y-2">
        <div class="animate-pulse bg-gray-200/30 max-w-[9rem] rounded-lg min-h-[2.5rem]"></div>
        <div class="animate-pulse bg-gray-200/30 max-w-[7rem] rounded-lg min-h-[1rem]"></div>
      </div>

      <div class="flex flex-col gap-y-3 w-full border-b-1 border-white/30 py-8">
        <div class="flex flex-col gap-y-1">
          <div class="animate-pulse bg-gray-200/30 max-w-[8rem] rounded-lg min-h-[1rem]"></div>
          <div class="animate-pulse bg-gray-200/30 max-w-[12rem] rounded-lg min-h-[1rem]"></div>
        </div>
        <div class="flex flex-col gap-y-1">
          <div class="animate-pulse bg-gray-200/30 max-w-[4rem] rounded-lg min-h-[1rem]"></div>
          <div class="flex gap-x-2 justify-between">
            <div class="flex flex-row gap-x-2 min-h-[2rem]">
              <div
                class="animate-pulse bg-gray-200/30 max-w-[12rem] min-w-[12rem] rounded-md min-h-[2rem]"
              ></div>
              <div
                class="animate-pulse bg-gray-200/30 max-w-[4rem] min-w-[2rem] rounded-md min-h-[1rem]"
              ></div>
            </div>

            <div class="flex flex-row gap-x-2 min-h-[2rem]">
              <div
                class="animate-pulse bg-gray-200/30 max-w-[12rem] min-w-[12rem] rounded-md min-h-[2rem]"
              ></div>
              <div
                class="animate-pulse bg-gray-200/30 max-w-[4rem] min-w-[2rem] rounded-md min-h-[1rem]"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-5">
        <div class="flex flex-col gap-y-1">
          <div class="animate-pulse bg-gray-200/30 max-w-[9rem] rounded-lg min-h-[2.5rem]"></div>
          <div class="animate-pulse bg-gray-200/30 max-w-[30rem] rounded-lg min-h-[3rem]"></div>
        </div>
        <div class="grid grid-cols-2 gap-x-3 gap-y-6">
          <div class="flex flex-col gap-y-1" v-for="i in 8" :key="i">
            <div
              class="animate-pulse bg-gray-200/30 max-w-[4rem] min-w-[4rem] rounded-md min-h-[1rem]"
            ></div>
            <div class="flex flex-row gap-x-2 min-h-[2rem]">
              <div
                class="animate-pulse bg-gray-200/30 max-w-[12rem] min-w-full rounded-md min-h-[2.5rem]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
