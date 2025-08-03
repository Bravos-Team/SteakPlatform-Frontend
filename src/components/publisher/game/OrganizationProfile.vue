<template>
  <card class="bg-[#101014]/50 backdrop-blur-2xl w-full lg:w-5/12 z-10">
    <card-content class="flex flex-col gap-2">
      <card-header class="tablet:text-3xl text-xl font-bold text-wrap">{{
        $t('title.pages.game_management.your_organization')
      }}</card-header>
      <card-content class="flex lg:flex-row justify-start items-center lg:items-start flex-wrap">
        <img
          class="w-30 rounded-sm"
          src="https://ccdn.steak.io.vn/assets-guts-profile-pic.png"
          alt=""
        />
        <div class="flex flex-col">
          <card-header class="font-bold text-3xl">Steak</card-header>
          <card-content>
            <card-title>狗男孩</card-title>
            <card-description> Bravos Organization</card-description>
          </card-content>
        </div>
      </card-content>
      <card-footer class="flex lg:justify-start">
        <card-action as-child>
          <Button
            class="bg-[#69696B]/50 text-white text-md font-medium hover:bg-[#69696B]/80 cursor-pointer"
          >
            {{ $t('title.pages.game_management.changes_profile') }}
          </Button>
        </card-action>
      </card-footer>
    </card-content>
  </card>
  <card
    class="bg-[#101014]/50 backdrop-blur-2xl w-full lg:w-7/12 border-dashed border-gray-500/30 border-2 z-10"
  >
    <card-content class="flex flex-col gap-1">
      <card-header class="tablet:text-3xl text-xl font-bold">
        {{ $t('title.pages.game_management.notifications') }}
      </card-header>
      <card-content class="flex flex-wrap gap-y-1 h-full p-0 tablet:px-6">
        <Alert class="h-full bg-[#101014]/60">
          <Rocket class="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription> You can add components to your app using the cli. </AlertDescription>
          <Button variant="ghost" class="cursor-pointer w-5 h-5 absolute top-1.5 right-1.5">
            <circle-x class="w-5 h-5"></circle-x>
          </Button>
        </Alert>
      </card-content>

      <card-footer class="p-0 tablet:px-6">
        <card-action as-child>
          <Button
            variant="outline"
            class="text-md !border-red-200/20 hover:!bg-red-400/10 cursor-pointer font-black w-full"
          >
            {{ $t('title.pages.game_management.clear_all') }}</Button
          >
        </card-action>
      </card-footer>
    </card-content>
  </card>
</template>

<script setup lang="ts">
import { Rocket, CircleX } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardDescription,
  CardHeader,
  CardAction,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
</script>
