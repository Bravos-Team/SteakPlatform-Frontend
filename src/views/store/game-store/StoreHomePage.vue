<template>
  <!-- SLIDER -->
  <store-sliders></store-sliders>
  <!-- END SLIDER -->

  <div class="flex flex-col gap-y-[64px] my-[64px]">
    <!-- game by category -->
    <category-base-bar
      :game-by-category-list="gameByCategoryList"
      :title-category="'discover something new'"
      class=""
    ></category-base-bar>
    <!-- END GAME BY CATEGORY-->

    <!-- COLLABORATORS BAR -->
    <collaborators-bar
      :game-collaborators-list="gameCollaboratorsList"
      class=""
    ></collaborators-bar>
    <!-- END COLLABORATORS BAR -->

    <!-- GAME BY SAVINGS BAR -->
    <category-base-bar
      class=""
      :game-by-category-list="gameBySavingsSpotlightList"
      :title-category="'epic savings spotlight'"
    ></category-base-bar>
    <!-- END GAME BY SAVINGS BAR -->

    <!-- DEALS BAR -->
    <collaborators-bar
      class=""
      :gapCollacborationCardY="'15px'"
      :game-collaborators-list="gameDealsNotableList"
    ></collaborators-bar>
    <!-- END DEALS BAR -->

    <!-- FREE GAME BAR -->
    <free-game-bar :freeGameList="freeGameList"></free-game-bar>
    <!-- END FREE GAME BAR -->

    <!-- LIST GAME HORIZONTAL BAR -->
    <div class="flex flex-row">
      <game-card-horizontal title="top sellers" :data="topSellersList"></game-card-horizontal>
      <game-card-horizontal title="most played" :data="topSellersList"></game-card-horizontal>
      <game-card-horizontal
        title="top upcoming wishlisted"
        :data="topSellersList"
      ></game-card-horizontal>
    </div>
    <!-- END LIST GAME HORIZONTAL BAR-->
  </div>
</template>

<script setup>
import CategoryBaseBar from '@/components/common/CategoryBaseBar.vue'
import CollaboratorsBar from '@/components/common/CollaboratorsBar.vue'
import FreeGameBar from '@/components/common/FreeGameBar.vue'
import GameCardHorizontal from '@/components/store/GameCardHorizontal.vue'

import StoreSliders from '@/components/store/StoreSliders.vue'
import { ref } from 'vue'
const gameByCategoryList = ref([
  {
    id: 1,
    name: 'Cataclismo',
    price: 399000,
    salePercent: 0,
    type: 0,
    status: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-1cdwe.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 2,
    name: 'Mini Royale',
    price: 0,
    salePercent: 0,
    type: 0,
    status: 0,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/bec08df44a434459a5ae9b1254797d5b/mini-royale-1nhuh.png?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 3,
    name: 'Escape from Tarkov: Arena',
    price: 888500,
    salePercent: 0,
    type: 0,
    status: 1,
    recommend: 1,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/eb7eff84d8ba4b3e8d512589c5048187/escape-from-tarkov-arena-ziu5u.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 4,
    name: 'AI LIMIT',
    price: 565000,
    salePercent: 0,
    type: 0,
    status: 1,

    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/f6a8e39b059645a79c9457d9286f4dfc/ai-limit-zd6u6.png?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 5,
    name: 'Quiet is the Eyes',
    price: 0,
    salePercent: 0,
    type: 0,
    status: 0,
    recommend: 2,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/0789ab1813a642d48d6078c5865dd195/quiet-is-the-eyes-pxauv.png?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 6,
    name: '33 Immortals',
    price: 209000,
    salePercent: 0,
    type: 0,
    status: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/3209b4dceba04b16bb97558f97c18ea9/33-immortals-9zmqb.png?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 7,
    name: "Assasin's Creed Shadows",
    price: 1190000,
    status: 1,
    salePercent: 0,
    type: 0,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/offer/14a28903e3d14bd5aa3e6dbf10868126/EN_EGST_StorePortrait_1200x1600_1200x1600-a010fb65414cbbc48e055d1f6eac41b8?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 8,
    name: 'Commandos Origins',
    price: 850000,
    status: 1,
    salePercent: 0,
    type: 0,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/344758d27c2f4bf3b3edb7decd08b111/commandos-origins-1tdpq.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 9,
    name: 'Monster Energy Supercross 25 - The Official Video Game',
    price: 1439000,
    status: 1,
    recommend: 0,
    salePercent: 0,
    type: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/f6627f324bf24a378c73707c8fdc065c/monster-energy-supercross-2025-1uh7h.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 10,
    name: 'FATAL FURY: City of the Wolves',
    price: 1526436,
    status: 1,
    salePercent: 0,
    type: 0,
    recommend: 0,
    descriptions: 'Available 04/24/25',
    img: 'https://cdn1.epicgames.com/spt-assets/f6627f324bf24a378c73707c8fdc065c/monster-energy-supercross-2025-1uh7h.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
])
const gameCollaboratorsList = ref([
  {
    id: 1,
    name: 'Fortnite',
    descriptions:
      'This biz is about to get redonk! Go on an adventure with Finn the Human, Jake the Dog, Princess Bubblegum, and Marceline.',
    img: 'https://cdn2.unrealengine.com/fneco-34-30-agriculture-4up-social-1920x1080-1920x1080-eaea284c1194.jpg?resize=1&w=854&h=480&quality=medium',
    price: 0,
    type: 0,
  },
  {
    id: 2,
    name: 'Fortnite',
    price: 88000,
    salePercent: 0,
    type: 1,
    status: 0,
    recommend: 0,
    descriptions:
      'Xerick has set up an arid pit-stop. Relax at the pumps with the Xerick Starter Pack.',
    img: 'https://cdn2.unrealengine.com/en-fnleco-34-30-xerickstarterpack-egs-carousel-1920x1080-1920x1080-bc5f375c7f9c.jpg?resize=1&w=854&h=480&quality=medium',
  },
  {
    id: 1,
    name: 'Fortnite',
    descriptions: 'Kick it in style with new Vans Kicks!',
    img: 'https://cdn2.unrealengine.com/fneco-34-30-cobbler-drop22-fn-vans-xbox-1920x1080-1920x1080-f6f1cc3bab0c.jpg?resize=1&w=854&h=480&quality=medium',
    price: 0,
    type: 0,
  },
])
const gameBySavingsSpotlightList = ref([
  {
    id: 1,
    name: 'Need for Speed™ Heat Deluxe Edition',
    price: 1650000,
    salePercent: 90,
    type: 1,
    status: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/f4241a8649244c5693450ebda42f935b/need-for-speed-heat-1lhdh.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 2,
    name: 'Bloons TD 6',
    price: 199999,
    salePercent: 75,
    type: 0,
    status: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/764b2d57552c436590f50318bd7587f9/download-bloons-td-6-offer-100fo.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 3,
    name: 'Need for Speed™ Most Wanted',
    price: 470000,
    status: 1,
    salePercent: 75,
    type: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/5d07664430944a95ae550da120ed0eeb/need-for-speed-most-wanted-1lnma.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 4,
    name: 'Plants vs. Zombies™ GW2: Deluxe Edition',
    price: 699000,
    status: 1,
    salePercent: 70,
    type: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/spt-assets/a39e2271cd9a48a882b8c956205bc01f/plants-vs-zombies-gw2-deluxe-edition-m13gm.jpg?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 5,
    name: 'MotoGP™21',
    price: 599000,
    salePercent: 85,
    type: 0,
    status: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_MotoGP21_MilestoneSrl_S2_1200x1600-6d29e00ac5b2866a3c1f1db6d6827d46?resize=1&w=360&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
])
const gameDealsNotableList = ref([
  {
    id: 1,
    name: 'Tomb Raider IV-VI Remastered',
    price: 313000,
    salePercent: 25,
    type: 1,
    status: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn2.unrealengine.com/en-egs-dotw-tomb-raider-iv-vi-breaker-1920x1080-11332e29c2a6.jpg?resize=1&w=854&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
  {
    id: 2,
    name: 'Check out all the deals for this week.',
    price: 199999,
    salePercent: 75,
    type: 0,
    status: 1,
    recommend: 0,
    descriptions: '',
    img: 'https://cdn2.unrealengine.com/en-sales-specials-dotw-breaker-asset-1920x1080-1313ee288796.jpg?resize=1&w=854&h=480&quality=medium',
    category: { id: 1, name: 'Base Game' },
  },
])
const freeGameList = ref([
  {
    id: 1,
    name: 'Botanicula',
    status: 0,
    descriptions: 'Free Now - Apr 24 at 10:00 PM',
    img: 'https://cdn1.epicgames.com/spt-assets/ffe4df6e32664927a3423e4bde3b4051/botanicula-ddvfa.jpg?resize=1&w=360&h=480&quality=medium',
  },
  {
    id: 2,
    name: 'Firestone Online Idle RPG',
    status: 0,
    descriptions: 'Free Now - Apr 24 at 10:00 PM',
    img: 'https://cdn1.epicgames.com/spt-assets/69576a28f7154fe9a0dce97508da5163/firestone-online-idle-rpg-1v58n.png?resize=1&w=360&h=480&quality=medium',
  },
  {
    id: 3,
    name: 'Albion Online Free Welcome Gift',
    status: 3,
    descriptions: 'Free Apr 24 - May 01',
    img: 'https://cdn1.epicgames.com/spt-assets/92837229023341268267ff64cae425a5/albion-online-1rgrs.png?resize=1&w=360&h=480&quality=medium',
  },
  {
    id: 4,
    name: 'CHUCHEL',
    status: 3,
    descriptions: 'Free Now Apr 24 - May 01',
    img: 'https://cdn1.epicgames.com/spt-assets/6109686c842a4bd9b9ef8959ec4d97c6/chuchel-1731b.png?resize=1&w=360&h=480&quality=medium',
  },
])
const topSellersList = ref([
  {
    id: 1,
    name: 'Botanicula',
    price: 683000,
    status: 0,
    descriptions: 'Free Now - Apr 24 at 10:00 PM',
    img: 'https://cdn1.epicgames.com/offer/b0cd075465c44f87be3b505ac04a2e46/GTAV_CHARM_Epic_FirstParty_PortraitFOB_1200x1600_R02_1200x1600-a5528b33df876e64f5dee728830c80a3?resize=1&w=360&h=480&quality=medium',
  },
  {
    id: 2,
    name: 'Firestone Online Idle RPG',
    price: 339830,
    status: 0,
    descriptions: 'Free Now - Apr 24 at 10:00 PM',
    img: 'https://cdn1.epicgames.com/spt-assets/69576a28f7154fe9a0dce97508da5163/firestone-online-idle-rpg-1v58n.png?resize=1&w=360&h=480&quality=medium',
  },
  {
    id: 3,
    name: 'Albion Online Free Welcome Gift',
    price: 1650000,
    status: 0,
    descriptions: 'Free Apr 24 - May 01',
    img: 'https://cdn1.epicgames.com/spt-assets/92837229023341268267ff64cae425a5/albion-online-1rgrs.png?resize=1&w=360&h=480&quality=medium',
  },
  {
    id: 4,
    name: 'CHUCHEL',
    price: 1299000,
    status: 0,
    descriptions: 'Free Now Apr 24 - May 01',
    img: 'https://cdn1.epicgames.com/spt-assets/6109686c842a4bd9b9ef8959ec4d97c6/chuchel-1731b.png?resize=1&w=360&h=480&quality=medium',
  },
  {
    id: 5,
    name: 'CHUCHEL',
    price: 1129000,
    status: 0,
    descriptions: 'Free Now Apr 24 - May 01',
    img: 'https://cdn1.epicgames.com/spt-assets/6109686c842a4bd9b9ef8959ec4d97c6/chuchel-1731b.png?resize=1&w=360&h=480&quality=medium',
  },
])
</script>
