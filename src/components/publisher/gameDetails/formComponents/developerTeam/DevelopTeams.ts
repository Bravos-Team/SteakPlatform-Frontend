import { ref } from 'vue'
import { string } from 'zod'

export type DEVELOPTEAMS_TYPE = string[]

export const developTeams = ref<DEVELOPTEAMS_TYPE>([])
