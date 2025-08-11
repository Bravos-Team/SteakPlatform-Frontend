<template>
    <TableManageSkeleton v-if="isAccountsFetching" />


    <Card v-else class="gap-y-2 flex flex-col mx-auto py-6 w-full min-h-full px-2 bg-black/70 ">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">
                    {{
                        $t('title.subPagesCompo.sidebar.publisher.accounts_management.member') }}
                </h1>
                <p class="text-muted-foreground">Manage system users and their permissions</p>
            </div>
            <div class="flex items-center space-x-2">
                <Badge variant="secondary">{{ totalUsers }} Total Users</Badge>
                <Button @click="openCreateDialog">
                    <Plus class="w-4 h-4 mr-2" />
                    Add User
                </Button>
            </div>
        </div>

        <div v-if="accountsData?.data" class="grid grid-cols-1 md:grid-cols-2 w-full gap-4 min-h-full">
            <Card>
                <CardContent class="p-6">
                    <div class="flex items-center">
                        <Users class="h-4 w-4 text-muted-foreground" />
                        <span class="ml-2 text-sm font-medium">Total Users</span>
                    </div>
                    <div class="text-2xl font-bold">{{ totalUsers }}</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent class="p-6">
                    <div class="flex items-center">
                        <UserCheck class="h-4 w-4 text-green-600" />
                        <span class="ml-2 text-sm font-medium">Active Users</span>
                    </div>
                    <div class="text-2xl font-bold text-green-600">{{ totalUsers }}</div>
                </CardContent>
            </Card>
        </div>

        <!-- Users Table -->
        <Card class="h-full ">
            <CardHeader>
                <div class="flex justify-end gap-x-5 flex-wrap gap-y-2">
                    <div class="flex flex-col gap-y-1">
                        <Label for="searchIDValue">Search by ID</Label>
                        <Input id="searchIDValue" v-model:modelValue.lazy="searchIDValue"
                            @keyup.enter="handleSearchByID" class="tablet:w-[20rem] w-full" placeholder="Key word..." />
                    </div>
                    <div class="flex flex-col gap-y-1">
                        <Label for="searchNameValue">Search by Name</Label>
                        <Input id="searchNameValue" v-model:modelValue.lazy="searchNameValue"
                            @keyup.enter="handleSearchByName" class="tablet:w-[20rem] w-full"
                            placeholder="Key word..." />
                    </div>
                    <div class="flex flex-col justify-end gap-y-1">
                        <Label for="status">Status</Label>
                        <Select v-model:modelValue="filtersSearching.status" id="status">
                            <SelectTrigger class="w-[180px]">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem :value="status.value" v-for="(status, index) in statusOptions"
                                        :key="index">
                                        {{ status.label }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex flex-col gap-y-1 justify-center group items-center" @click="resetTable">
                        <ListRestart
                            class="size-7 text-white/60 cursor-pointer hover:text-white transition-colors duration-200" />
                    </div>
                </div>
            </CardHeader>
            <CardContent class="px-3 min-h-full ">
                <div class="rounded-md border ">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead class="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody v-if="!searchingAccountData?.data" class="">
                            <TableRow v-if="isAccountsRefetching"></TableRow>
                            <TableRow v-else @click="viewPublisherDetails(user.id)"
                                v-for="user in accountsData?.data.content" :key="user.id" class="cursor-pointer"
                                :class="{ 'bg-muted/50': selectedUsers.includes(user.id) }">
                                <TableCell class="">
                                    <div class="flex items-center space-x-3 ">
                                        <Avatar class="h-8 w-8">
                                            <AvatarImage
                                                :src="`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`" />
                                            <AvatarFallback>{{ getInitials(user.username) }}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div class="font-medium">{{ user.username }}</div>
                                            <div class="text-sm text-muted-foreground">User ID: {{ user.id }}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center space-x-2">
                                        <Mail class="h-4 w-4 text-muted-foreground" />
                                        <span>{{ user.email }}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <code class="bg-muted px-2 py-1 rounded text-xs">{{ user.id }}</code>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" :class="{
                                        'bg-green-200 text-green-700 border-green-200': user.status === 'ACTIVE',
                                        'bg-yellow-200 text-yellow-700 border-yellow-200': user.status === 'SUSPENDED',
                                        'bg-red-200 text-red-700 border-red-200': user.status === 'BANNED',
                                        'bg-gray-200 text-gray-700 border-gray-200': user.status === 'DELETED'
                                    }">
                                        <div :class="{
                                            'bg-green-500': user.status === 'ACTIVE',
                                            'bg-red-500': user.status === 'BANNED',
                                            'bg-gray-500': user.status === 'DELETED',
                                            'bg-yellow-500': user.status === 'SUSPENDED'
                                        }" class="w-2 h-2 rounded-full mr-1">
                                        </div>
                                        {{ user.status }}
                                    </Badge>
                                </TableCell>

                                <TableCell class="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal class="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody v-else>
                            <TableRow v-for="user in searchingAccountData?.data.content" :key="user.id"
                                class="cursor-pointer hover:bg-muted/50" @click="viewPublisherDetails(user.id)">
                                <TableCell class="">
                                    <div class="flex items-center space-x-3 ">
                                        <Avatar class="h-8 w-8">
                                            <AvatarImage
                                                :src="`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`" />
                                            <AvatarFallback>{{ getInitials(user.username) }}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div class="font-medium">{{ user.username }}</div>
                                            <div class="text-sm text-muted-foreground">User ID: {{ user.id }}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center space-x-2">
                                        <Mail class="h-4 w-4 text-muted-foreground" />
                                        <span>{{ user.email }}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <code class="bg-muted px-2 py-1 rounded text-xs">{{ user.id }}</code>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" class="bg-green-50 text-green-700 border-green-200">
                                        <div class="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                        Active
                                    </Badge>
                                </TableCell>
                                <TableCell class="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal class="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Showing {{ (currentPage * pageSize) + 1 }} to {{ Math.min((currentPage + 1) * pageSize,
                    totalUsers) }} of {{ totalUsers }} users</span>
            </div>
            <pagination v-slot="{ page }" :total="totalUsers" :items-per-page="filters?.size ?? 8"
                :default-page="accountsData?.data.page.number + 1" @update:page="filters.page = $event">
                <pagination-content v-slot="{ items }">
                    <pagination-first class="cursor-pointer" />
                    <pagination-previous :disabled="page === 1" class="cursor-pointer" />
                    <template v-for="(item, index) in items" :key="index" class="cursor-pointer">
                        <pagination-item v-if="item.type === 'page'" :value="item.value" :key="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </pagination-item>
                    </template>
                    <pagination-ellipsis :index="8" />
                    <pagination-next :disabled="page === accountsData?.data?.page.totalPages" class="cursor-pointer" />
                    <pagination-last :disabled="page === accountsData?.data?.page.totalPages" class="cursor-pointer" />
                </pagination-content>
            </pagination>
        </div>
    </Card>

    <Dialog :open="isDialogOpen" @update:open="setDialogOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ isEditing ? 'Edit User' : 'Create New User' }}</DialogTitle>
                <DialogDescription>
                    {{ isEditing ? 'Update user information below.' : 'Fill in the information to create a new user.' }}
                </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="submitUser" class="space-y-4">
                <div class="space-y-2">
                    <Label for="username">Username</Label>
                    <Input id="username" autocomplete="username" v-model="newPublisher.username"
                        placeholder="Enter username" required />
                </div>

                <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input id="email" v-model="newPublisher.email" type="email" placeholder="Enter email address"
                        required />
                </div>

                <div v-if="!isEditing" class="space-y-2">
                    <Label for="password">Password</Label>
                    <Input autocomplete="current-password" id="password" v-model="newPublisher.password" type="password"
                        placeholder="Enter password" required />
                </div>
                <!-- COMBOBOX PICKER -->
                <Card v-if="isCustomRolesFetching" class="animate-pulse  flex items-center justify-center">
                    <LoaderCircle class="size-4 animate-spin" />
                </Card>
                <Combobox v-else v-model:model-value="rolesToAssigned" v-model:open="openComboboxPicker"
                    :ignore-filter="true">
                    <combobox-anchor as-child>
                        <label for="roles">
                            <tags-input @click="openComboboxPicker = true" v-model="rolesToAssigned"
                                class="px-2 gap-2 w-full flex flex-col items-start bg-black/70 hover:bg-black/20 transition-colors duration-300 cursor-pointer">
                                <div class="flex gap-2 items-center flex-wrap">
                                    <tags-input-item v-for="role in rolesToAssigned" :key="role" :value="role">
                                        <tags-input-item-text />
                                        <tags-input-item-delete />
                                    </tags-input-item>
                                </div>

                                <combobox-input v-model="searchRole" as-child>
                                    <tags-input-input id="roles" :placeholder="'Search or add roles...'"
                                        class="min-w-full p-0 border-none focus-visible:ring-0 h-auto"
                                        @keydown.enter.prevent />
                                </combobox-input>
                            </tags-input>
                        </label>

                        <combobox-list align="end" side="top" class="w-[--reka-popper-anchor-width]">
                            <combobox-empty />
                            <combobox-group>
                                <scroll-area :class="{
                                    'h-[20rem]': filteredRoles.length > 6,
                                    'h-[10rem]': filteredRoles.length <= 6,
                                }">
                                    <combobox-item v-for="(role, index) in filteredRoles" :key="index" :value="role"
                                        @select.prevent="
                                            (event: any) => {
                                                if (typeof event.detail.value.name === 'string') {
                                                    searchRole = ''
                                                    newPublisher.assignedRoles = [...(newPublisher.assignedRoles || []), event.detail.value.id]
                                                    rolesToAssigned = [...(rolesToAssigned || []), event.detail.value.name]
                                                }

                                                if (filteredRoles.length === 0) {
                                                    openComboboxPicker = false
                                                }
                                            }
                                        ">
                                        {{ role.name }}
                                    </combobox-item>
                                </scroll-area>
                            </combobox-group>
                        </combobox-list>
                    </combobox-anchor>
                </Combobox>
                <DialogFooter>
                    <Button type="button" variant="outline" @click="setDialogOpen(false)">
                        Cancel
                    </Button>
                    <Button :class="{
                        'opacity-50 cursor-not-allowed': isSubmitting
                    }" type="submit" :disabled="isSubmitting">
                        <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                        {{ isEditing ? 'Update User' : 'Create User' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    <Dialog :open="isViewPublisherOpen" @update:open="setViewPublisherOpen">

        <DialogContent class="tablet:min-w-[40rem] laptop:min-w-[50rem] w-full">
            <template v-if="isReFetchingAccount || isFetchingPublisherInfo">
                <DialogSkeleton />
            </template>
            <template v-if="publisherInfo && !isReFetchingAccount">
                <DialogHeader>
                    <DialogTitle class="flex items-center gap-3">
                        <Avatar class="h-12 w-12">
                            <AvatarImage
                                :src="`https://api.dicebear.com/7.x/initials/svg?seed=${publisherInfo.data?.username}`" />
                            <AvatarFallback class="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                                {{ publisherInfo.data?.username?.substring(0, 2).toUpperCase() }}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 class="text-2xl font-bold">{{ publisherInfo.data?.username }}</h2>
                            <p class="text-muted-foreground font-normal">User Details</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div class="flex flex-col w-full gap-y-2">
                    <!-- User Status -->
                    <div class="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="font-medium">Status</span>
                        </div>
                        <Badge :variant="publisherInfo.data?.status === 'ACTIVE' ? 'default' : 'secondary'"
                            class="bg-green-100 text-green-800 hover:bg-green-100">
                            {{ publisherInfo.data?.status }}
                        </Badge>
                    </div>

                    <Card class="w-full">
                        <CardContent class="tablet:p-4 p-2 grid grid-cols-1 gap-y-3 tablet:grid-cols-2 gap-x-2 w-full">
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-blue-100 rounded-lg">
                                    <User class="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p class="text-sm text-muted-foreground">User ID</p>
                                    <p class="font-mono text-sm font-medium">{{ publisherInfo.data?.id }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 w-full">
                                <div class="p-2 bg-purple-100 rounded-lg">
                                    <Mail class="h-5 w-5 text-purple-600" />
                                </div>
                                <div class="w-full overflow-hidden">
                                    <p class="text-sm text-muted-foreground">Email</p>
                                    <p class="font-medium truncate ">{{ publisherInfo.data?.email }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 ">
                                <div>
                                    <p class="text-sm text-muted-foreground">Created At</p>
                                    <p class="font-medium">{{ new
                                        Date(publisherInfo.data?.createdAt).toLocaleDateString('vi') }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-orange-100 rounded-lg">
                                    <Shield class="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p class="text-sm text-muted-foreground">Total Roles</p>
                                    <p class="font-medium">{{ publisherInfo.data?.roles?.length || 0 }} role(s)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                    <div class="flex flex-col gap-y-2">
                        <div class="flex items-center gap-2">
                            <Shield class="h-5 w-5 text-muted-foreground" />
                            <h3 class="text-lg font-semibold">Assigned Roles</h3>
                        </div>

                        <div class="flex flex-wrap text-pretty gap-y-2">
                            <div v-for="roleItem in publisherInfo.data?.roles" :key="roleItem.id"
                                class="flex flex-wrap gap-y-1 items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div class="flex items-center gap-3">
                                    <div class="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                                        <Crown class="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 class="font-semibold">{{ roleItem.role }}</h4>
                                        <p class="text-sm text-muted-foreground">Role ID: {{ roleItem.id }}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" class="font-mono text-xs">
                                    ID: {{ roleItem.id }}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <!-- Activity Timeline -->
                    <div class="flex flex-col gap-y-4">
                        <div class="flex items-center gap-2">
                            <Clock class="h-5 w-5 text-muted-foreground" />
                            <h3 class="text-lg font-semibold">Recent Activity</h3>
                        </div>

                        <div class="flex flex-col gap-y-2">
                            <div
                                class="flex items-start gap-3 p-3 border-l-2 border-blue-500 bg-blue-50/10 rounded-r-lg">
                                <div class="p-1.5 bg-blue-500 rounded-full">
                                    <UserPlus class="h-3 w-3 text-white" />
                                </div>
                                <div>
                                    <p class="text-sm font-medium">Account Created</p>
                                    <p class="text-xs text-muted-foreground">{{ new
                                        Date(publisherInfo.data?.createdAt).toLocaleDateString('vi') }}</p>
                                </div>
                            </div>

                            <div
                                class="flex items-start gap-3 p-3 border-l-2 border-green-500 bg-green-50/10 rounded-r-lg">
                                <div class="p-1.5 bg-green-500 rounded-full">
                                    <CheckCircle class="h-3 w-3 text-white" />
                                </div>
                                <div>
                                    <p class="text-sm font-medium">Status: {{ publisherInfo.data?.status }}</p>
                                    <p class="text-xs text-muted-foreground">Current status</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter class="gap-2">
                    <Button variant="outline" @click="isViewPublisherOpen = false">
                        Close
                    </Button>
                    <Button variant="destructive" :class="{
                        'opacity-50 cursor-not-allowed': isDeleting,
                        'cursor-pointer': !isDeleting
                    }" @click="deletePublisherAccount(publisherInfo.data?.id)" :disabled="isDeleting">
                        <LoaderCircle v-if="isDeleting" class="w-4 h-4 mr-2 animate-spin" />
                        <div v-else class="flex items-center gap-x-1">
                            <Trash2 class="h-4 w-4 mr-2" />
                            Delete
                        </div>
                    </Button>
                </DialogFooter>
            </template>

        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from "@/components/ui/tags-input"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationNext,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Users, UserCheck, User, Clock, Plus,
    MoreHorizontal, Mail, Loader2,
    Shield,
    Crown,
    UserPlus,
    CheckCircle,
    LoaderCircle,
    ListRestart,
    Trash2
} from 'lucide-vue-next'
import { ACCOUNT_LIST_FILTERS, CREATE_ACCOUNT_PUBLISHER_PAYLOAD, CREATE_ACCOUNT_PUBLISHER_TEMP } from '@/types/publisher/account/AccountManageType'
import { PaginationContent, PaginationPrevious, PaginationItem } from '@/components/ui/pagination'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import { useQueryPublisherInformationsById } from '@/hooks/publisher/account/usePublisherAccountManage';
import DialogSkeleton from '@/components/publisher/ dialog/DialogSkeleton.vue'
import { useFilter } from 'reka-ui'
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toastErrorNotificationPopup, toastSuccessNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { useQueryClient } from '@tanstack/vue-query'
import { PUBLISHER_ACCOUNTS_MANAGE_KEYS } from '@/hooks/constants/publisher/account/account-key'

import { useQueryPublisherAccountsList, useMutateDeletePublisherAccount, useQueryCustomRolesList, useMutateCreatePublisherAccount, useQuerySearchingAccount } from '@/hooks/publisher/account/usePublisherAccountManage'
import TableManageSkeleton from '@/components/publisher/TableManageSkeleton.vue'
import { useDebounceFn } from '@vueuse/core'

const publisherId = ref<string>('')
const { data: publisherInfo, refetch: refetchPublisherInfo, isFetching: isFetchingPublisherInfo } = useQueryPublisherInformationsById(publisherId)
const { data: customRolesData, isFetching: isCustomRolesFetching } = useQueryCustomRolesList()
const { mutateAsync: createPublisherAccount } = useMutateCreatePublisherAccount()
const { mutateAsync: deletePublisherAccountMutate } = useMutateDeletePublisherAccount()

const isSearchingAccounts = ref(false)
const queryClient = useQueryClient()
const searchRole = ref('')
const openComboboxPicker = ref(false)

const { contains } = useFilter({ sensitivity: 'base' })

const rolesToAssigned = ref<string[]>([])
const newPublisher = ref<CREATE_ACCOUNT_PUBLISHER_PAYLOAD>({
    username: '',
    email: '',
    password: '',
    assignedRoles: []
})


const filtersSearching = ref<ACCOUNT_LIST_FILTERS>({
    status: 'ACTIVE',
    page: 1,
    size: 10
})
const { data: searchingAccountData, isFetching, refetch: refetchSearchingAccount } = useQuerySearchingAccount(filtersSearching)

const filteredRoles = computed(() => {
    const options = customRolesData.value!.data?.filter((role: any) => !rolesToAssigned.value.includes(role.name))
    return searchRole.value ? options.filter((option: string) => contains(option, searchRole.value)) : options
})

const searchNameValue = ref('')
const searchIDValue = ref('')

const handleSearchByName = async () => {
    isSearchingAccounts.value = true
    filtersSearching.value.keyword = searchNameValue.value
    await refetchSearchingAccount()
}

const handleSearchByID = async () => {
    isSearchingAccounts.value = true
    if (searchIDValue.value.trim() === '')
        filtersSearching.value.keyword = ''
    else
        filtersSearching.value.keyword = 'id:' + searchIDValue.value
    await refetchSearchingAccount()
}

const resetTable = () => {
    searchNameValue.value = ''
    searchIDValue.value = ''
    filtersSearching.value.keyword = ''
    filtersSearching.value.page = 1
    refetchSearchingAccount()
}

const statusOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'SUSPENDED', label: 'Suspended' },
    { value: 'BANNED', label: 'Banned' },
    { value: 'DELETED', label: 'Deleted' },
]
const { data: accountsData, isFetching: isAccountsFetching, isRefetching: isAccountsRefetching } = useQueryPublisherAccountsList(filtersSearching)
const selectedUsers = ref<number[]>([])

const isDialogOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const userForm = ref({
    id: null as number | null,
    username: '',
    email: '',
    password: ''
})


const totalUsers = computed(() => accountsData.value!.data.page.totalElements)
const currentPage = computed(() => accountsData.value!.data.page.number)
const pageSize = computed(() => accountsData.value!.data.page.size)

const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase()
}

const openCreateDialog = () => {
    isEditing.value = false
    rolesToAssigned.value = []
    newPublisher.value = {
        username: '',
        email: '',
        password: ''
        , assignedRoles: []
    }
    setDialogOpen(true)
}
const isViewPublisherOpen = ref(false)

const setDialogOpen = (open: boolean) => {
    isDialogOpen.value = open
}
const setViewPublisherOpen = (open: boolean) => {
    isViewPublisherOpen.value = open
}

const submitUser = useDebounceFn(async () => {
    isSubmitting.value = true
    try {
        const response = await createPublisherAccount(newPublisher.value, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: PUBLISHER_ACCOUNTS_MANAGE_KEYS.LIST(filtersSearching)
                })
            }
        })
        if (response.status === 200) {
            toastSuccessNotificationPopup('Publisher account created successfully!', 'Success')
        }
        isDialogOpen.value = false
    } catch (err: any) {
        toastErrorNotificationPopup(err?.response?.data?.detail || 'Failed to create publisher account', '')
    } finally {
        isSubmitting.value = false
    }
}, 100)
const isReFetchingAccount = ref(false)
const viewPublisherDetails = useDebounceFn(async (userId: bigint) => {
    isViewPublisherOpen.value = true
    isReFetchingAccount.value = true
    try {
        publisherId.value = userId.toString()
        const response = await refetchPublisherInfo()

        await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (err: any) {
        console.log('Error fetching publisher details:', err)
    } finally {
        isReFetchingAccount.value = false
    }
}, 50)

const isDeleting = ref(false)
const deletePublisherAccount = useDebounceFn(async (id: bigint) => {
    isDeleting.value = true
    try {
        const response = await deletePublisherAccountMutate(id.toString(), {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: PUBLISHER_ACCOUNTS_MANAGE_KEYS.LIST(filtersSearching)
                })
                toastSuccessNotificationPopup('Publisher account deleted successfully!', 'Success')
                isViewPublisherOpen.value = false
            }
        })
    } catch (err: any) {
        toastErrorNotificationPopup('Failed to delete publisher account', err.response.data.detail)
    } finally {
        isDeleting.value = false
    }
}, 100)
</script>