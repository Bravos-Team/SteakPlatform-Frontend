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
    'Windows 7 64-bit',
    'Windows 8.1 64-bit',
    'macOS 10.15 Catalina',
    'macOS 11 Big Sur',
    'Ubuntu 18.04 LTS',
    'Windows 10 64‑bit',
    'Windows 11 64‑bit',
    'macOS 13 Ventura',
    'macOS 14 Sonoma',
    'Ubuntu 22.04 LTS',
    'SteamOS',
    'macOS 15 Sequoia',
    'Ubuntu 24.04 LTS',
  ],
  cpu: [
    'Intel Core i3-2100',
    'Intel Core i5-3470',
    'AMD FX-6300',
    'AMD Ryzen 3 1200',
    'Intel Core i5‑10400',
    'Intel Core i5‑12400',
    'Intel Core i7‑12700',
    'Intel Core Ultra 7 200H',
    'AMD Ryzen 5 5500',
    'AMD Ryzen 7 5800X',
    'AMD Ryzen 9 9950X3D',
    'AMD Ryzen AI 7',
    'Intel Core i9-13900K',
    'Intel Core i9-14900KS',
    'AMD Ryzen 9 7950X3D',
    'AMD Threadripper PRO 7995WX',
  ],
  memory: [
    '512MB',
    '1GB',
    '2GB',
    '4GB',
    '6GB',
    '8 GB RAM',
    '16 GB RAM',
    '32 GB RAM',
    '64 GB RAM',
    '128 GB RAM',
    '256 GB RAM',
    '512 GB RAM',
    '1 TB RAM',
  ],
  gpu: [
    'NVIDIA GeForce GTX 750 Ti',
    'NVIDIA GeForce GTX 960',
    'AMD Radeon HD 7850',
    'AMD Radeon R9 270X',
    'NVIDIA GeForce GTX 1060',
    'NVIDIA GeForce RTX 4060',
    'NVIDIA GeForce RTX 4070',
    'NVIDIA GeForce RTX 50 series',
    'AMD Radeon RX 560',
    'AMD Radeon RX 580',
    'AMD Radeon RX 9060 XT',
    'NVIDIA GeForce RTX 4080 Super',
    'NVIDIA GeForce RTX 4090',
    'AMD Radeon RX 7900 XTX',
    'AMD Radeon PRO W7900',
  ],
  directX: ['DirectX 9.0c', 'DirectX 10', 'DirectX 11', 'DirectX 12'],
  storage: [
    '512 MB available space',
    '1 GB available space',
    '4 GB available space',
    '10 GB available space',
    '20 GB available space',
    '40 GB available space',
    '80 GB available space',
    '100 GB available space',
    '150 GB available space',
    '200 GB available space',
  ],
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
  buildInfo: z
    .object({
      versionName: z.string().optional().default(''),
      execPath: z.string().optional().default(''),
      downloadUrl: z.string().optional().default(''),
    })
    .optional()
    .nullable()
    .default({
      versionName: '',
      execPath: '',
      downloadUrl: '',
    }),

  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  updatedAt: z.union([z.string(), z.date(), z.number()]).optional().nullable().default(''),
  estimatedReleaseDate: z.coerce.string().default(''),
})

export type GameType = z.infer<typeof GameSchema>
export const getDefaultGameValue = (): GameType => GameSchema.parse({})
export const PartialGameSchema = GameSchema.partial()
export type PartialGameType = z.infer<typeof PartialGameSchema>
export type GameResubmitRequestType = {
  submissionId: bigint
  content: string
  attachments: string[]
}

export type GAME_OPENING_TYPE = {
  id: bigint
  name: string
  price: number
  status: string
  releaseDate: number
  genres: string[]
  tags: string[]
  createdAt: number
  updatedAt: number
}
export type GAME_OPENING_DETAILS_TYPE = {
  id: bigint
  title: string
  developerTeams: string[]
  regions: string[]
  thumbnail: string
  media: { type: string; url: string }[]
  shortDescription: string
  longDescription: string
  platforms: string[]
  systemRequirements: MinimumAndrecommendedType
  languageSupported: string[]
  updatedAt: bigint
}
export type GAME_OPENING_DATA_TYPE = {
  game: GAME_OPENING_TYPE
  details: GAME_OPENING_DETAILS_TYPE
}
export type GAME_GENRES_AND_TAG_TYPE = {
  id: number
  name: string
  description: string
  slug: string
}
