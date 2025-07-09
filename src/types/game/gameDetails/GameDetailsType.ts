import { z } from 'zod'
import SystemRequirements from '@/components/publisher/gameDetails/formComponents/systemRequirements/SystemRequirementsBar.vue'
export type REQUIREMENTS_TYPE = {
  osVersion?: string
  cpu?: string
  memory?: string
  gpu?: string
  directX?: string
  storage?: string
}

export type REQUIREMENTS_SUGGESTIONS_TYPE = {
  osVersion?: string[]
  cpu?: string[]
  memory?: string[]
  gpu?: string[]
  directX?: string[]
  storage?: string[]
}

export type SYSTEM_REQUIREMENTS_TYPE = {
  minimum?: REQUIREMENTS_TYPE
  recommend?: REQUIREMENTS_TYPE
}

export type SYSTEM_REQUIREMENTS_SUGGESTIONS_TYPE = {
  minimum?: REQUIREMENTS_SUGGESTIONS_TYPE
  recommend?: REQUIREMENTS_SUGGESTIONS_TYPE
}
export const systemRequirementSuggestions = {
  osVersion: [
    'Windows 10 64‑bit',
    'Windows 11 64‑bit',
    'macOS 13 Ventura',
    'macOS 14 Sonoma',
    'Ubuntu 22.04 LTS',
    'SteamOS',
  ],
  cpu: [
    'Intel Core i5‑10400',
    'Intel Core i5‑12400',
    'Intel Core i7‑12700',
    'Intel Core Ultra 7 200H',
    'AMD Ryzen 5 5500',
    'AMD Ryzen 7 5800X',
    'AMD Ryzen 9 9950X3D',
    'AMD Ryzen AI 7',
  ],
  memory: ['8 GB RAM', '16 GB RAM', '32 GB RAM'],
  gpu: [
    'NVIDIA GeForce GTX 1060',
    'NVIDIA GeForce RTX 4060',
    'NVIDIA GeForce RTX 4070',
    'NVIDIA GeForce RTX 50 series',
    'AMD Radeon RX 560',
    'AMD Radeon RX 580',
    'AMD Radeon RX 9060 XT',
  ],
  directX: ['DirectX 11', 'DirectX 12'],
  storage: ['40 GB available space', '80 GB available space', '100 GB available space'],
}

export const GameMediaSchema = z.object({
  type: z.enum(['video', 'image']),
  url: z.string().default(''),
})

export const SystemRequirementSchema = z.object({
  osVersion: z.string().default(''),
  cpu: z.string().default(''),
  memory: z.string().default(''),
  gpu: z.string().default(''),
  directX: z.string().default(''),
  storage: z.string().default(''),
})

export const SystemRequirementsPartial = SystemRequirementSchema.partial()
export type SystemRequirementsTypePartial = z.infer<typeof SystemRequirementsPartial>
export type SystemRequirementsType = z.infer<typeof SystemRequirementSchema>
export const getDefaultValueRequirements = (): SystemRequirementsType =>
  SystemRequirementSchema.parse({})
export type MinimumAndrecommendedType = {
  minimum: SystemRequirementsType
  recommend: SystemRequirementsType
}
export const GameSchema = z.object({
  id: z.bigint().default(0n),
  publisherId: z.number().default(0),
  createdBy: z.number().default(0),
  subtitles: z.string().nullable().optional().default(''),
  name: z.string().default(''),
  price: z.number().optional().nullable().default(0),
  developerTeams: z.array(z.string()).optional().nullable().default([]),
  regions: z.array(z.string()).optional().nullable().default([]),
  thumbnail: z
    .union(
      [
        z.string().optional().nullable(),
        z.instanceof(File).optional().nullable(),
        z.undefined().optional(),
      ],
      z.undefined(),
    )
    .default(''),
  media: z.array(GameMediaSchema).optional().nullable().default([]),
  shortDescription: z.string().optional().nullable().default(''),
  longDescription: z.string().optional().nullable().default(''),
  platforms: z.array(z.string()).optional().nullable().default([]),
  systemRequirements: z
    .object({
      minimum: SystemRequirementSchema,
      recommend: SystemRequirementSchema,
    })
    .default({
      minimum: {
        osVersion: '',
        cpu: '',
        memory: '',
        gpu: '',
        directX: '',
        storage: '',
      },
      recommend: {
        osVersion: '',
        cpu: '',
        memory: '',
        gpu: '',
        directX: '',
        storage: '',
      },
    }),
  internetConnection: z.boolean().optional().default(false),
  languageSupported: z.array(z.string()).optional().default([]),
  // buildInfo: z
  //   .object({
  //     versionName: z.string().optional().default(''),
  //     execPath: z.string().optional().default(''),
  //     downloadUrl: z.string().optional().default(''),
  //   })
  //   .optional()
  //   .nullable()
  //   .default({
  //     versionName: '',
  //     execPath: '',
  //     downloadUrl: '',
  //   }),

  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  updatedAt: z.union([z.string(), z.date(), z.number()]).optional().nullable().default(''),
  estimatedReleaseDate: z.coerce.string().default(''),
})

export type GameType = z.infer<typeof GameSchema>
export const getDefaultGameValue = (): GameType => GameSchema.parse({})
export const PartialGameSchema = GameSchema.partial()
