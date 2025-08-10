<template>
    <DetailsSkeleton v-if="isCustomRoleByIdFetching" />
    <Card v-else class="min-h-full bg-black/60 p-3">
        <div class="flex gap-y-2 flex-col min-h-full">
            <!-- Header Section -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class="p-3 bg-white rounded-xl shadow-lg">
                        <Shield class="h-8 w-8 text-black" />
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold text-white">Master Role</h1>
                        <p class="text-gray-400 font-normal">Role Management Details</p>
                    </div>
                </div>

            </div>

            <!-- Role Information Card -->
            <Card class="bg-gray-900/40 border-gray-800 w-full">
                <CardContent>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                                <Hash class="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <p class="text-sm text-gray-400">Role ID</p>
                                <p class="font-mono text-sm font-medium text-white">{{ customRole?.data.id }}</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-purple-600/20 border border-purple-600/30 rounded-lg">
                                <Users class="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <p class="text-sm text-gray-400">Assigned Users</p>
                                <p class="font-medium text-white">{{ customRole?.data.assignedAccounts.length ?? 0 }}
                                    account(s)</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-green-600/20 border border-green-600/30 rounded-lg">
                                <CheckCircle class="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                                <p class="text-sm text-gray-400">Status</p>
                                <p :class="customRole?.data.isActive ? 'text-green-400 ' : 'text-red-400'"
                                    class="font-mono ">{{ customRole?.data.isActive ? 'Active' : 'Inactive'
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-start gap-3 text-pretty">
                        <div class="p-2 bg-orange-600/20 border border-orange-600/30 rounded-lg">
                            <FileText class="h-5 w-5 text-orange-400" />
                        </div>
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold text-white mb-2">Description</h3>
                            <p class="text-gray-300 leading-relaxed">
                                {{ customRole?.data.description || 'No description provided.' }}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Assigned Accounts Section -->
            <Card class="bg-gray-900/50 border-gray-800">
                <CardHeader>
                    <div class="flex items-center justify-between flex-wrap">
                        <div class="flex items-center gap-2 flex-wrap">
                            <Users class="h-5 w-5 text-gray-400" />
                            <h3 class="text-xl font-semibold text-white">Assigned Accounts</h3>
                            <Badge variant="outline" class="bg-gray-800 text-gray-300 border-gray-700">
                                {{ customRole?.data.assignedAccounts.length ?? 0 }} accounts
                            </Badge>
                        </div>
                        <Button @click="openAssignUsersDialog" variant="outline" size="sm"
                            class="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                            <UserPlus class="h-4 w-4 mr-2" />
                            Assign User
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="rounded-md border border-gray-800 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow class="border-gray-800 hover:bg-black/30 bg-black/50">
                                    <TableHead class="text-gray-300">User</TableHead>
                                    <TableHead class="text-gray-300">Email</TableHead>
                                    <TableHead class="text-gray-300">User ID</TableHead>
                                    <TableHead class="text-gray-300">Status</TableHead>
                                    <TableHead class="text-right text-gray-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="(account, index) in customRole?.data.assignedAccounts"
                                    :key="account.id" class="bg-black/50 border-gray-800"
                                    :class="{ ' hover:bg-black/30 cursor-pointer': !detachingRoleRow.isDetaching, 'cursor-not-allowed animate-pulse': detachingRoleRow.index === index }">
                                    <TableCell>
                                        <div class="flex items-center gap-3">
                                            <Avatar class="h-10 w-10 border-2 border-gray-700">
                                                <AvatarImage
                                                    :src="`https://api.dicebear.com/7.x/initials/svg?seed=${account.username}`" />
                                                <AvatarFallback class="bg-gray-700 text-gray-300 font-semibold">
                                                    {{ account.username.charAt(0).toUpperCase() }}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 class="font-semibold text-white">{{ account.username }}</h4>
                                                <!-- <p class="text-sm text-gray-400">Master Role</p> -->
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div class="flex items-center gap-2">
                                            <Mail class="h-4 w-4 text-gray-400" />
                                            <span class="text-gray-300">{{ account.email }}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <code
                                            class="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">{{ account.id }}</code>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            :class="{ 'bg-green-600 text-white hover:bg-green-600': account.status === 'ACTIVE', 'bg-red-600 text-white hover:bg-red-600': account.status !== 'ACTIVE' }">
                                            <div class="w-2 h-2 bg-white rounded-full mr-1"></div>
                                            {{ account.status }}
                                        </Badge>
                                    </TableCell>
                                    <TableCell class="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm"
                                                    class="text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800">
                                                    <MoreVertical class="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent class="bg-[#101014] border-gray-800 cursor-pointer">

                                                <DropdownMenuItem :disabled="detachingRoleRow.isDetaching"
                                                    @click="handleDetachRoleFromAccount(account.id, index)"
                                                    class="text-red-400 hover:bg-red-900/20 hover:text-red-300 cursor-pointer">
                                                    <LoaderCircle v-if="detachingRoleRow.isDetaching"
                                                        class="w-4 h-4 mr-2 animate-spin" />
                                                    <UserMinus v-else class="w-4 h-4 mr-2" />
                                                    Remove from Role
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </div>
    </Card>
    <Dialog :open="isOpenAssignUsersDialog" @update:open="openAssignUsersDialog">
        <DialogOverlay @click="isOpenAssignUsersDialog = false" />
        <DialogContent class="tablet:min-w-fit w-full bg-[#101014] border-gray-800" :hideCloseButton="true"
            :hideDefaultOverlay="true">
            <DialogHeader class="flex flex-row justify-between">
                <DialogTitle class="flex items-center gap-3 text-white">
                    <div class="p-3 bg-white rounded-xl">
                        <Users class="h-8 w-8 text-black" />
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold">Select Users</h2>
                        <p class="text-gray-400 font-normal">Choose users to assign to role</p>
                    </div>
                </DialogTitle>
                <DialogClose as-child>
                    <X class="text-white/50 hover:text-white transition-colors duration-300"
                        @click="isOpenAssignUsersDialog = false" />
                </DialogClose>
            </DialogHeader>

            <div
                class="flex flex-col gap-y-2 overflow-x-hidden tablet:min-w-[40rem] laptop:min-w-[60rem] desktop:min-w-[70rem]">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="flex items-center gap-4 flex-wrap">
                        <Badge variant="outline" class="bg-gray-800 text-gray-300 border-gray-700">
                            {{ usersData?.data.content?.length || 0 }} Total Users
                        </Badge>
                        <Badge variant="outline" class="bg-blue-900 text-blue-300 border-blue-700">
                            {{ selectedUserIds.length }} Selected
                        </Badge>
                    </div>
                </div>

                <Card class="bg-gray-900/50 border-gray-800">
                    <CardContent class="p-4">
                        <div class="flex flex-col sm:flex-row gap-4 flex-wrap">
                            <div class="relative">
                                <Search
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input v-model="searchQuery" placeholder="Search users by username or email..."
                                    class="pl-10 bg-gray-800/80 border-gray-700 text-white placeholder-gray-400" />
                            </div>

                            <div class="flex gap-2 flex-wrap">
                                <Button variant="outline" @click="selectAll"
                                    class="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                                    <CheckSquare class="h-4 w-4 mr-2" />
                                    Select All
                                </Button>
                                <Button variant="outline" @click="clearSelection"
                                    class="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                                    <Square class="h-4 w-4 mr-2" />
                                    Clear All
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Users Table -->
                <Card class="bg-gray-900/50 border-gray-800">
                    <CardContent class="p-0">
                        <div class="!overflow-x-auto w-full">
                            <div class="min-h-[20rem]  " v-if="isUsersFetching">
                                <div class="animate-pulse w-full min-h-[3rem] bg-white/10 border-y border-white/10"
                                    v-for="n in 6">
                                </div>
                            </div>
                            <Table class="min-w-full" v-else>
                                <TableHeader>
                                    <TableRow class="border-gray-800 hover:bg-gray-800/50">
                                        <TableHead class=" text-gray-300">
                                            <Checkbox :checked="isAllSelected" :indeterminate="isIndeterminate"
                                                @update:modelValue="(value) => toggleSelectAll(value as boolean)"
                                                class="border-gray-600" />
                                        </TableHead>
                                        <TableHead class="text-gray-300">User</TableHead>
                                        <TableHead class="text-gray-300">Email</TableHead>
                                        <TableHead class="text-gray-300">User ID</TableHead>
                                        <TableHead class="text-gray-300">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow @click="toggleUserSelection(user.id)"
                                        v-for="(user, index) in filteredUsers" :key="user.id"
                                        class="border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                                        :class="{ 'bg-blue-950/30': selectedUserIds.includes(user.id) }">
                                        <TableCell>
                                            <Checkbox :modelValue="selectedUserIds.includes(user.id)"
                                                @click.stop="toggleUserSelection(user.id)" class="border-gray-600" />
                                        </TableCell>
                                        <TableCell>
                                            <div class="flex items-center gap-3">
                                                <Avatar class="size-9 border-2 border-gray-700">
                                                    <AvatarImage
                                                        :src="`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}&backgroundColor=1e293b`" />
                                                    <AvatarFallback class="bg-gray-700 text-gray-300 font-semibold">
                                                        {{ user.username?.substring(0, 2).toUpperCase() }}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 class="font-semibold text-white">{{ user.username }}</h4>
                                                    <p class="text-sm text-gray-400">Active User</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div class="flex items-center gap-2">
                                                <Mail class="h-4 w-4 text-gray-400" />
                                                <span class="text-gray-300">{{ user.email }}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <code
                                                class="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">{{ user.id }}</code>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                :class="user.status === 'ACTIVE' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'">
                                                <div
                                                    :class="`w-2 h-2 rounded-full mr-1 ${user.status === 'ACTIVE' ? 'bg-white' : 'bg-gray-400'}`">
                                                </div>
                                                {{ user.status }}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <!-- Selected Users Preview -->
                <Card v-if="selectedUserIds.length > 0" class="bg-blue-950/20 border-blue-800">
                    <CardContent class="p-4">
                        <div class="flex items-center gap-2 mb-3">
                            <CheckCircle class="h-5 w-5 text-blue-400" />
                            <h3 class="text-lg font-semibold text-white">Selected Users ({{ selectedUserIds.length }})
                            </h3>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <Badge v-for="userId in selectedUserIds" :key="userId" variant="outline"
                                class="bg-blue-900/50 text-blue-300 border-blue-700">
                                {{ getUsernameById(userId) }}
                                <button @click="removeFromSelection(userId)"
                                    class="ml-1 hover:text-red-400 transition-colors">
                                    <X class="h-3 w-3" />
                                </button>
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <!-- Pagination Info -->
                <div class="flex items-center justify-between text-sm text-gray-400">
                    <span>
                        Showing {{ usersData?.data.content?.length || 0 }} of {{ usersData?.data.page?.totalElements ||
                            0 }}
                        users
                    </span>
                    <span>
                        Page {{ (usersData?.data.page?.number || 0) + 1 }} of {{ usersData?.data.page?.totalPages || 1
                        }}
                    </span>
                </div>
            </div>

            <DialogFooter class="gap-2">
                <Button variant="outline" @click="() => isOpenAssignUsersDialog = false"
                    class="bg-transparent cursor-pointer border-gray-700 text-gray-300 hover:bg-gray-800">
                    Cancel
                </Button>
                <Button @click="handleAssignUsers" :class="{
                    '!cursor-not-allowed opacity-50': selectedUserIds.length === 0,
                    'cursor-pointer opacity-100': selectedUserIds.length > 0
                }" :disabled="selectedUserIds.length === 0" class="bg-blue-600 hover:bg-blue-700 text-white ">
                    <LoaderCircle v-if="isAssigningUsers" />
                    <UserPlus v-else class="h-4 w-4 mr-2" />
                    Assign {{ selectedUserIds.length }} User(s)
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import DetailsSkeleton from '@/components/common/DetailsSkeleton.vue'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import DialogOverlay from '@/components/ui/dialog/DialogOverlay.vue'
import { toastErrorNotificationPopup, toastSuccessNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { PUBLISHER_CUSTOM_ROLES_LIST_KEYS } from '@/hooks/constants/publisher/account/account-key'
import { useMutateAssignCustomRoleToAccount, useMutateDetachRoleFromAccount, useQueryPublisherAccountsList, useQueryRoleInformationsById } from '@/hooks/publisher/account/usePublisherAccountManage'
import { ACCOUNT_LIST_FILTERS } from '@/types/publisher/account/AccountManageType'
import { useQueryClient } from '@tanstack/vue-query'
import { useDebounceFn } from '@vueuse/core'
import {
    CheckCircle,
    CheckSquare,
    FileText,
    Hash,
    LoaderCircle,
    Mail,
    MoreVertical,
    Search,
    Shield,
    Square,
    UserMinus,
    UserPlus,
    Users,
    X
} from "lucide-vue-next"
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
const { data: customRole, isFetching: isCustomRoleByIdFetching } = useQueryRoleInformationsById(route?.params.id as string);
const { mutateAsync: detachRoleFromAccount } = useMutateDetachRoleFromAccount();
const { mutateAsync: assignCustomRoleToAccount } = useMutateAssignCustomRoleToAccount();

const filters = ref<ACCOUNT_LIST_FILTERS>({
    page: 1,
    size: 100
})
const { data: usersData, isFetching: isUsersFetching } = useQueryPublisherAccountsList(filters);

const isOpenAssignUsersDialog = ref(false);
const openAssignUsersDialog = () => {
    isOpenAssignUsersDialog.value = true;
}
const searchQuery = ref('')
const selectedUserIds = ref<number[]>([])

type UserAssigned = {
    id: number;
    username: string;
    email: string;
    status: string;
}

const filteredUsers = computed(() => {
    if (!usersData.value?.data.content) return []
    const assignedUserIds =
        new Set(customRole.value?.data.assignedAccounts?.map((user: UserAssigned) => user.id)) || []
    const availableUsers =
        usersData.value.data.content.filter((user: UserAssigned) =>
            !assignedUserIds.has(user.id))
    const query = searchQuery.value.trim().toLowerCase()
    return availableUsers.filter((user: UserAssigned) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query))
})

const isAllSelected = computed(() => {
    return filteredUsers.value.length > 0 &&
        filteredUsers.value.every((user: UserAssigned) => selectedUserIds.value.includes(user.id))
})
const isIndeterminate = computed(() => {
    const selectedCount = filteredUsers.value.filter((user: UserAssigned) =>
        selectedUserIds.value.includes(user.id)
    ).length
    return selectedCount > 0 && selectedCount < filteredUsers.value.length
})
const toggleUserSelection = (userId: number) => {
    const index = selectedUserIds.value.indexOf(userId)
    if (index > -1) {
        selectedUserIds.value.splice(index, 1)
    } else {
        selectedUserIds.value.push(userId)
    }
}
const toggleSelectAll = (checked: boolean) => {
    if (checked) {
        const newIds = filteredUsers.value
            .filter((user: UserAssigned) => !selectedUserIds.value.includes(user.id))
            .map((user: UserAssigned) => user.id)
        console.log('Selecting all users:', newIds)
    } else {
        const filteredIds = filteredUsers.value.map((user: UserAssigned) => user.id)
        selectedUserIds.value = selectedUserIds.value.filter(id => !filteredIds.includes(id))
    }
}
const selectAll = () => {
    const allIds = usersData.value?.data.content.map((user: UserAssigned) => user.id) || []
    selectedUserIds.value = [...allIds]
}

const clearSelection = () => {
    selectedUserIds.value = []
}

const removeFromSelection = (userId: number) => {
    const index = selectedUserIds.value.indexOf(userId)
    if (index > -1) {
        selectedUserIds.value.splice(index, 1)
    }
}

const getUsernameById = (userId: number) => {
    const user = usersData.value?.data.content.find((u: UserAssigned) => u.id === userId)
    return user?.username || 'Unknown'
}
const detachingRoleRow = ref<{
    isDetaching: boolean;
    index: number;
}>({
    isDetaching: false,
    index: -1
})
const handleDetachRoleFromAccount = useDebounceFn(async (accountId: number, index: number) => {
    detachingRoleRow.value = {
        isDetaching: true,
        index
    }
    try {
        const response = await detachRoleFromAccount({
            roleId: Number(route.params.id),
            accountId: accountId as number
        })
        if (response.status === 200) {
            toastErrorNotificationPopup('Role detached successfully', 'The role has been successfully detached from the account.');
        }
    } catch (err: any) {
        console.error(err);
        toastErrorNotificationPopup('Failed to detach role from account', err.response.data.detail || 'An error occurred while detaching the role from the account.');
    } finally {
        detachingRoleRow.value = {
            isDetaching: false,
            index: -1
        }
    }
}, 100)

const isAssigningUsers = ref(false)
const queryClient = useQueryClient()
const handleAssignUsers = useDebounceFn(async () => {
    isAssigningUsers.value = true
    try {
        const promises = selectedUserIds.value.map(async (userId: number) => {
            setTimeout(async () => await assignCustomRoleToAccount({
                roleId: Number(route.params.id),
                accountId: userId
            }), 500)
        }
        )

        await Promise.all(promises)
        selectedUserIds.value = []
        isOpenAssignUsersDialog.value = false
        toastSuccessNotificationPopup('Users assigned successfully', 'The selected users have been successfully assigned to the role.');
        setTimeout(async () => await queryClient.invalidateQueries({
            queryKey: PUBLISHER_CUSTOM_ROLES_LIST_KEYS.ROLE(route.params.id as string)
        }), 600)
    } catch (err: any) {
        console.error(err);
        toastErrorNotificationPopup('Failed to assign users', err.response?.data?.detail || 'An error occurred while assigning users to the role.');
    } finally {
        isAssigningUsers.value = false
        selectedUserIds.value = []
    }
}, 100)
</script>