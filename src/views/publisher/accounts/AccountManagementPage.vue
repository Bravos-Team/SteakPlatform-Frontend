<template>
    <div v-if="isAccountsFetching"></div>
    <div v-else class="gap-y-2 flex flex-col mx-auto py-6 w-full min-h-full ">
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">{{
                    $t('title.subPagesCompo.sidebar.publisher.accounts_management.member') }}</h1>
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

        <!-- Stats Cards -->
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
                <div class="flex justify-end gap-x-5">
                    <Input v-model:modelValue.lazy="filters.keyword" class="tablet:w-[20rem] w-full"
                        placeholder="Key word..." />
                    <Select v-model:modelValue="filters.status">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem :value="status.value" v-for="(status, index) in statusOptions" :key="index">
                                    {{ status.label }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
                        <TableBody class="">
                            <TableRow v-for="user in accountsData?.data.content" :key="user.id" class="cursor-pointer"
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

        <!-- Pagination -->
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
    </div>

    <!-- Create/Edit User Dialog -->
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
                    <Input id="username" v-model="userForm.username" placeholder="Enter username" required />
                </div>

                <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input id="email" v-model="userForm.email" type="email" placeholder="Enter email address"
                        required />
                </div>

                <div v-if="!isEditing" class="space-y-2">
                    <Label for="password">Password</Label>
                    <Input id="password" v-model="userForm.password" type="password" placeholder="Enter password"
                        required />
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" @click="setDialogOpen(false)">
                        Cancel
                    </Button>
                    <Button type="submit" :disabled="isSubmitting">
                        <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                        {{ isEditing ? 'Update User' : 'Create User' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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
import { useQueryPublisherAccountsList } from '@/hooks/publisher/account/usePublisherAccountManage'
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
    MoreHorizontal, Mail, Loader2
} from 'lucide-vue-next'
import { ACCOUNT_LIST_FILTERS } from '@/types/publisher/account/AccountManageType'
import PaginationContent from '@/components/ui/pagination/PaginationContent.vue'
import PaginationPrevious from '@/components/ui/pagination/PaginationPrevious.vue'
import PaginationItem from '@/components/ui/pagination/PaginationItem.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'

const filters = ref<ACCOUNT_LIST_FILTERS>({
    page: 1,
    size: 10
})

const statusOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'SUSPENDED', label: 'Suspended' },
    { value: 'BANNED', label: 'Banned' },
    { value: 'DELETED', label: 'Deleted' },
]
const { data: accountsData, isFetching: isAccountsFetching } = useQueryPublisherAccountsList(filters)
const selectedUsers = ref<number[]>([])
const currentTime = ref('')
const currentUser = 'dcphong'

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
const totalPages = computed(() => accountsData.value!.data.page.totalPages)
const currentPage = computed(() => accountsData.value!.data.page.number)
const pageSize = computed(() => accountsData.value!.data.page.size)



const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase()
}

const openCreateDialog = () => {
    isEditing.value = false
    userForm.value = {
        id: null,
        username: '',
        email: '',
        password: ''
    }
    setDialogOpen(true)
}

const setDialogOpen = (open: boolean) => {
    isDialogOpen.value = open
}

const submitUser = async () => {
    isSubmitting.value = true
    try {
        console.log('Submitting user:', userForm.value)
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        setDialogOpen(false)
    } finally {
        isSubmitting.value = false
    }
}

</script>