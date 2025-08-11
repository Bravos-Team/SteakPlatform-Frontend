<template>
  <SkeletonProfileSettings v-if="isUserProfileFetching" />
  <div v-else-if="userProfileData?.data && !isUserProfileFetching" class="min-h-[50rem] flex flex-col gap-y-6">
    <!-- TITLE -->
    <div class="flex flex-col gap-y-1 mb-[2rem]">
      <span class="tablet:text-4xl text-3xl font-bold gap-y-2 text-wrap">{{
        t('auth.informations.user.account.router.settings.title')
        }}</span>
      <span class="text-gray-400 text-sm tablet:text-md">{{
        t('auth.informations.user.account.router.settings.descriptions')
        }}</span>
    </div>
    <!-- END TITLE -->

    <div class="flex gap-x-6 justify-center">
      <label for="avatarUrl"
        class="cursor-pointer overflow-hidden rounded-full transition-all relative duration-200 group size-50 border-3 border-white/90">
        <img v-if="!previewAvatar.preview" class="object-cover hover:brightness-50 transition-all duration-300 inset-0"
          :src="'https://ccdn.steak.io.vn/PngItem_1050694.png'" alt="" />
        <img v-else :src="previewAvatar.preview" alt=""
          class="object-cover absolute inset-0 min-h-full min-w-full hover:brightness-50 transition-all duration-300" />
        <transition name="fade">
          <FileInput
            class="absolute inset-5/12 opacity-0 group-hover:opacity-100 z-10 transition-all delay-75 duration-300 ease-in-out" />
        </transition>
        <input @change="selectedAvatar" type="file" class="sr-only" id="avatarUrl" />
      </label>
    </div>

    <div class="flex flex-col gap-y-8">
      <div class="flex flex-col gap-y-2">
        <span class="font-bold text-lg tablet:text-xl">{{
          t('auth.informations.user.account.router.settings.profile_informations')
          }}</span>
        <div class="flex gap-x-1 text-center items-center">
          <span class="font-bold text-md">ID:</span>
          <span class="text-sm"> {{ userProfileData?.data.id }}</span>
        </div>
      </div>
      <div v-if="userProfileData?.data" class="grid grid-cols-12 gap-x-6">
        <!-- DISPLAY -->
        <div class="flex flex-col gap-y-1 w-full col-span-12 tablet:col-span-6">
          <div class="grid grid-cols-12 gap-x-2">
            <div class="flex flex-col gap-y-1 col-span-11">
              <label for="displayName">Display Name:</label>
              <input type="text" id="displayName" autocomplete="off" :placeholder="'Your display name'"
                class="w-full border-double border-2 transition-all duration-75 focus:border-3 border-white/50 rounded-sm h-10 text-white px-3"
                v-model="profile.displayName" />
            </div>
            <div class="flex flex-col justify-end col-span-1">
              <Dialog>
                <DialogTrigger as-child>
                  <button
                    class="tablet:col-span-1 col-span-3 h-10 w-10 flex items-center justify-center rounded-sm border-3 hover:border-white/30 transition-colors duration-200 cursor-pointer">
                    <Pencil :size="20" />
                  </button>
                </DialogTrigger>
                <dialog-content>
                  <dialog-header>
                    <dialog-title>
                      <span class="text-wrap"> Update your display name </span>
                    </dialog-title>
                  </dialog-header>
                  <DialogDescription>
                    <input type="text" id="displayName" :placeholder="'Your display name'"
                      class="w-full border-double col-span-11 border-2 transition-all duration-75 focus:border-3 border-white/50 rounded-sm h-10 text-white px-3"
                      autocomplete="off" v-model="profile.displayName" />
                  </DialogDescription>
                  <DialogFooter>
                    <div class="flex justify-end w-full">
                      <button :class="{
                        'cursor-pointer': !isUpdateUserProfilePending,
                        'cursor-progress': isUpdateUserProfilePending,
                      }" :disabled="isUpdateUserProfilePending" @click="handleUpdateName"
                        class="text-black text-sm bg-white/80 hover:bg-white transition-colors duration-250 px-4 py-1 rounded-md">
                        <LoaderCircle v-if="isUpdateUserProfilePending" class="animate-spin" />
                        <span v-else>Update</span>
                      </button>
                    </div>
                  </DialogFooter>
                </dialog-content>
              </Dialog>
            </div>
          </div>
        </div>
        <!-- END DISPLAY -->

        <!-- BIO -->
        <div class="flex flex-col gap-y-1 w-full tablet:col-span-6 col-span-12">
          <div class="grid grid-cols-12 gap-x-2">
            <div class="flex flex-col gap-y-1 col-span-11">
              <label for="bio">Bio:</label>
              <input type="text" id="bio" autocomplete="off" :placeholder="'Your bio'"
                class="w-full border-double border-2 transition-all duration-75 focus:border-3 border-white/50 rounded-sm h-10 text-white px-3"
                v-model="profile.bio" />
            </div>
            <div class="flex flex-col justify-end col-span-1">
              <Dialog>
                <DialogTrigger as-child>
                  <button
                    class="tablet:col-span-1 col-span-3 h-10 w-10 flex items-center justify-center rounded-sm border-3 hover:border-white/30 transition-colors duration-200 cursor-pointer">
                    <Pencil :size="20" />
                  </button>
                </DialogTrigger>
                <dialog-content>
                  <dialog-header>
                    <dialog-title>
                      <span class="text-wrap"> Update your bio </span>
                    </dialog-title>
                  </dialog-header>
                  <DialogDescription>
                    <input type="text" id="bio" :placeholder="'Your bio'"
                      class="w-full border-double col-span-11 border-2 transition-all duration-75 focus:border-3 border-white/50 rounded-sm h-10 text-white px-3"
                      autocomplete="off" v-model="profile.bio" />
                  </DialogDescription>
                  <DialogFooter>
                    <div class="flex justify-end w-full">
                      <button :class="{
                        'cursor-pointer': !isUpdateUserProfilePending,
                        'cursor-progress': isUpdateUserProfilePending,
                      }" :disabled="isUpdateUserProfilePending" @click="handleUpdateProfile"
                        class="text-black text-sm bg-white/80 hover:bg-white transition-colors duration-250 px-4 py-1 rounded-md">
                        <LoaderCircle v-if="isUpdateUserProfilePending" class="animate-spin" />
                        <span v-else>Update</span>
                      </button>
                    </div>
                  </DialogFooter>
                </dialog-content>
              </Dialog>
            </div>
          </div>
        </div>
        <!-- END BIO -->
      </div>

      <div class="flex justify-between flex-wrap">
        <RadioGroup v-model:model-value="sexSelected" class="flex flex-col gap-y-2">
          <div class="flex gap-x-3 items-center">
            <div class="flex gap-x-2 items-center">
              <radio-group-item id="female" value="false"></radio-group-item>
              <span>Female</span>
            </div>
            <div class="flex gap-x-2 items-center">
              <radio-group-item id="male" value="true"></radio-group-item>
              <span>Male</span>
            </div>
          </div>
        </RadioGroup>

        <div class="flex flex-col gap-x-3  w-full tablet:w-fit">
          <span>Date of Birth:</span>
          <Input v-model:model-value="profile.birthDate" type="date" />
          <!-- <DatePicker :message="'Change your birth date successfully'" :placeholder="'Select your birth date'"
            v-model:emit-estimated-release-date="birthDateSelected" /> -->
        </div>
      </div>

      <div class="flex flex-row gap-y-2 justify-end">
        <button :disabled="isUpdating" :class="{
          'cursor-pointer': !isUpdating,
          'cursor-progress': isUpdating,
        }" @click="handleUpdateProfile"
          class="bg-white/90 hover:bg-white transition-colors duration-250 text-black w-fit px-6 py-2 rounded-md">
          <LoaderCircle v-if="isUpdating" class="animate-spin" />
          <span v-else> Save</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AcceptableValue } from 'reka-ui'
import { useQueryUserProfile } from '@/hooks/user/useUserProfile'
import { useI18n } from 'vue-i18n'
import SkeletonProfileSettings from '@/components/user/SkeletonProfileSettings.vue'
import { FileInput, LoaderCircle, Pencil } from 'lucide-vue-next'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import { useMutateUpdateUserProfile } from '@/hooks/user/useUserProfile'
import { nextTick, onMounted, ref, watch } from 'vue'
import { USER_PROFILE_REQUEST_TYPE } from '@/types/user/UserProfileType'
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue'
import { useDebounceFn } from '@vueuse/core'
import {
  toastErrorNotificationPopup,
  toastNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import DatePicker from '@/components/common/date/DatePicker.vue'
import { useImageCompressor } from '@/composables/image/useImageCompression'
import {
  mutateDeleteFileUploaded,
  mutateGetPresignedImageUrl,
  mutatePostIntoPresignedUrl
} from "@/hooks/user/useUserUploadFile"
import Input from '@/components/ui/input/Input.vue'
const { compressImage } = useImageCompressor()
const { mutateAsync: mutateUpdateUserProfile, isPending: isUpdateUserProfilePending } =
  useMutateUpdateUserProfile()
const { mutateAsync: mutateAsyncGetPresignUrl } = mutateGetPresignedImageUrl()
const { mutateAsync: mutateAsyncPostIntoPresignedUrl } = mutatePostIntoPresignedUrl()
const { mutateAsync: mutateAsyncDeleteFileUploaded } = mutateDeleteFileUploaded()

const { t } = useI18n()

const { data: userProfileData, isFetching: isUserProfileFetching } = useQueryUserProfile()

const profile = ref<USER_PROFILE_REQUEST_TYPE>({
  id: 0n,
  displayName: '',
  birthDate: '',
  sex: false,
  avatarUrl: '',
  bio: '',
})

const sexSelected = ref<AcceptableValue>('false')
const birthDateSelected = ref<string | number>('')

const handleUpdateName = useDebounceFn(async () => {
  if (profile.value.displayName?.trim() === userProfileData.value?.data.displayName) {
    toastNotificationPopup('No changes detected', 'Please enter a new display name.')
    return
  }
  try {
    const response = await mutateUpdateUserProfile({
      id: profile.value.id,
      displayName: profile.value.displayName,
    })
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        'Update display name successfully',
        `Your display name has been updated to ${profile.value.displayName}.`,
      )
    }
  } catch (err: any) {
    toastErrorNotificationPopup('Change display name failed', err.message)
  }
}, 500)

const previewAvatar = ref<any>({
  file_instance: null,
  preview: null,
})
const selectedAvatar = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    const reader = new FileReader()

    const compressedFile = await compressImage(file)
    reader.onload = (e) => {
      previewAvatar.value = {
        file_instance: compressedFile,
        preview: e.target?.result,
      }
      profile.value.avatarUrl = previewAvatar.value.preview
    }
    reader.readAsDataURL(file)
  }
}

const isUpdating = ref(false)
const urlAssigned = ref<string>('')
const handleUpdateProfile = useDebounceFn(async () => {
  isUpdating.value = true
  try {
    console.log('File Instance:', previewAvatar.value)
    const presignUrlRes = await mutateAsyncGetPresignUrl({
      fileName: previewAvatar.value.file_instance.name,
      fileSize: previewAvatar.value.file_instance.size,
    })

    const responsePostPresignedUrl = await mutateAsyncPostIntoPresignedUrl({
      url: presignUrlRes.signedUrl,
      file: previewAvatar.value.file_instance,
    })

    if (responsePostPresignedUrl.status === 200) {
      urlAssigned.value = 'https://ccdn.steak.io.vn/' + presignUrlRes.cdnFileName
      profile.value.avatarUrl = urlAssigned.value
    } else {
      toastErrorNotificationPopup('Upload avatar failed', 'Failed to upload your avatar image.')
      await mutateAsyncDeleteFileUploaded(urlAssigned.value)
      return
    }

    const response = await mutateUpdateUserProfile({
      displayName: profile.value.displayName,
      // birthDate: birthDateSelected.value as string,
      birthDate: profile.value.birthDate,
      sex: sexSelected.value === 'true',
      ...profile.value,
      bio: profile.value.bio,
    })
    if (response.status === 200) {
      toastSuccessNotificationPopup('Update profile successfully', 'Your profile has been updated.')
    }
  } catch (err: any) {
    toastErrorNotificationPopup('Update profile failed', err.message)
    await mutateAsyncDeleteFileUploaded(urlAssigned.value)
    return
  } finally {
    isUpdating.value = false
  }
}, 200)

watch(() => userProfileData.value?.data, async () => {
  await nextTick()
  profile.value = {
    ...userProfileData.value?.data,
  }
  previewAvatar.value.preview = userProfileData.value?.data.avatarUrl || ''

  sexSelected.value = userProfileData.value?.data.sex ? 'true' : 'false'
}, { immediate: true, deep: true })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
