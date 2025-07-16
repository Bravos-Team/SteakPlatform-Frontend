<script setup lang="ts">
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import { type DEVELOPTEAMS_TYPE } from '@/components/publisher/gameDetails/formComponents/developerTeam/DevelopTeams'

const emitDevelopTeams = defineModel<DEVELOPTEAMS_TYPE>('developTeams', {
  default: [],
})
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400">
      {{ $t('title.pages.game_details.form.developer_teams.title') }}
    </span>
    <TagsInput v-model="emitDevelopTeams" value-prop="id" label-prop="label">
      <TagsInputItem v-for="developTeam in developTeams" :key="developTeam" :value="developTeam">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>

      <TagsInputInput
        :placeholder="$t('title.pages.game_details.form.developer_teams.descriptions')"
      />
    </TagsInput>
  </div>
</template>
