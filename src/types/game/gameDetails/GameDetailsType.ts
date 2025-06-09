export type MINIMUM_REQUIREMENTS_TYPE = {
  osVersion?: string
  cpu?: string
  memory?: string
  gpu?: string
  directX?: string
  storage?: string
}
export type RECOMMEDED_REQUIREMENTS_TYPE = {
  osVersion?: string
  cpu?: string
  memory?: string
  gpu?: string
  directX?: string
  storage?: string
}

export type MINIMUM_REQUIREMENTS_SUGGESTIONS_TYPE = {
  osVersion?: string[]
  cpu?: string[]
  memory?: string[]
  gpu?: string[]
  directX?: string[]
  storage?: string[]
}
export type RECOMMEDED_REQUIREMENTS_SUGGESTIONS_TYPE = {
  osVersion?: string[]
  cpu?: string[]
  memory?: string[]
  gpu?: string[]
  directX?: string[]
  storage?: string[]
}

export type SYSTEM_REQUIREMENTS_TYPE = {
  minimum?: MINIMUM_REQUIREMENTS_TYPE
  recommend?: RECOMMEDED_REQUIREMENTS_TYPE
}

export type SYSTEM_REQUIREMENTS_SUGGESTIONS_TYPE = {
  minimum?: MINIMUM_REQUIREMENTS_SUGGESTIONS_TYPE
  recommend?: RECOMMEDED_REQUIREMENTS_SUGGESTIONS_TYPE
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
