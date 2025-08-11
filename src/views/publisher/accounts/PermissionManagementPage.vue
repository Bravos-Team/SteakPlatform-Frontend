<template>
    <div class="min-h-screen bg-gradient-to-br from-black/40 rounded-sm to-slate-500/30">
        <div class="px-1 tablet:px-4 py-8 flex flex-col gap-y-3">
            <!-- Header Section -->
            <div
                class="relative overflow-hidden rounded-3xl  bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div class="relative tablet:p-8 p-2">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div class="flex items-center gap-3 flex-col tablet:flex-row">
                            <div class="p-3 rounded-2xl bg-gradient-to-br from-blue-400/40 to-red-200/40 shadow-lg">
                                <Shield class="size-5 tablet:size-12 text-white" />
                            </div>
                            <div>
                                <span
                                    class="text-lg text-pretty w tablet:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                    {{
                                        $t('title.subPagesCompo.sidebar.publisher.accounts_management.permission') }}
                                </span>
                                <p class="text-slate-600 dark:text-slate-400 font-medium text-pretty">
                                    Manage roles and permissions for your organization
                                </p>
                            </div>
                        </div>

                        <!-- Stats Cards -->
                        <div class="flex flex-wrap gap-4 w-full justify-end">
                            <Card
                                class="bg-gradient-to-br w-full tablet:w-fit from-emerald-500/30 px-4 to-teal-600/40 border-0 text-white shadow-xl">
                                <CardContent class="flex items-center p-4">
                                    <div class="flex items-center gap-2 ">
                                        <Users class="size-8" />
                                        <div>
                                            <p class="text-md font-medium opacity-90">Total Roles</p>
                                            <p class="text-2xl font-bold">{{ permissionsData?.data?.length || 0 }}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card
                                class="bg-gradient-to-br w-full tablet:w-fit from-blue-500/30 to-indigo-600/30 border-0 text-white shadow-xl">
                                <CardContent class="flex items-center p-4">
                                    <div class="flex items-center gap-2">
                                        <Key class="size-8" />
                                        <div>
                                            <p class="text-md font-medium opacity-90">Total Permissions</p>
                                            <p class="text-2xl font-bold">{{ totalPermissions }}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Controls Section -->
            <div class="flex flex-col sm:flex-row gap-4">
                <Card class="flex-1 bg-black/60 backdrop-blur-xl border-white/20">
                    <CardContent class="p-6">
                        <div class="flex flex-col sm:flex-row gap-4">
                            <div class="flex-1 relative">
                                <Search
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input v-model="searchQuery" placeholder="Search roles and permissions..."
                                    class="pl-10 bg-white/80 dark:bg-slate-700/80 border-slate-200 dark:border-slate-600" />
                            </div>

                            <div class="flex gap-2">
                                <Select v-model="filterType">
                                    <SelectTrigger class="w-48 bg-white/80 cursor-pointer dark:bg-slate-700/80">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Roles</SelectItem>
                                        <SelectItem value="management">Management</SelectItem>
                                        <SelectItem value="read">Read Only</SelectItem>
                                        <SelectItem value="write">Write Access</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" @click="resetFilters"
                                    class="bg-white/80 cursor-pointer dark:bg-slate-700/80">
                                    <RotateCcw class="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Loading State -->
            <div v-if="isFetchingPermissions" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card v-for="i in 6" :key="i" class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20">
                    <CardContent class="p-6">
                        <div class="animate-pulse space-y-4">
                            <div class="flex items-center gap-3">
                                <Skeleton class="h-12 w-12 rounded-xl" />
                                <div class="space-y-2 flex-1">
                                    <Skeleton class="h-4 w-3/4" />
                                    <Skeleton class="h-3 w-1/2" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <Skeleton class="h-3 w-full" />
                                <Skeleton class="h-3 w-2/3" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center ">
                <Card v-if="permissionsData?.data.length <= 0"
                    class="max-w-md mx-auto bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20">
                    <CardContent class="p-8 flex flex-col">
                        <div
                            class="p-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 w-fit mx-auto mb-4">
                            <Shield class="h-12 w-12 text-slate-400" />
                        </div>
                        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Roles Found</h3>
                        <span class="text-slate-600 dark:text-slate-400 mb-6">
                            {{ searchQuery ? 'No roles match your search criteria.'
                                : 'Get started by creating your first role.' }}
                        </span>
                        <Button @click="setCreateNewRoleOpen" class="bg-gradient-to-r from-blue-600 to-purple-600">
                            <Plus class="h-4 w-4 mr-2" />
                            Create First Role
                        </Button>
                    </CardContent>
                </Card>
                <div v-else class="space-y-4">
                    <!-- Header -->
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-bold">Roles Management</h2>
                            <p class="text-muted-foreground">Manage roles and permissions</p>
                        </div>
                    </div>

                    <!-- Table -->
                    <Card>
                        <CardContent class="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Role Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Permissions Count</TableHead>
                                        <TableHead class="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow v-for="role in permissionsData?.data" :key="role.id"
                                        class="cursor-pointer hover:bg-muted/50" @click="viewRoleDetails(role)">
                                        <TableCell class="font-medium">{{ role.id }}</TableCell>
                                        <TableCell>
                                            <div class="flex items-center gap-2">
                                                <Badge variant="outline">{{ role.name }}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell class="max-w-xs truncate">{{ role.description }}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{{ role.permissions.length }} permissions</Badge>
                                        </TableCell>
                                        <TableCell class="text-right">
                                            <Button variant="ghost" size="sm" @click.stop="viewRoleDetails(role)">
                                                <Eye class="h-4 w-4 mr-2" />
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <!-- Role Details Dialog -->
                <Dialog :open="isDialogOpen" @update:open="setDialogOpen">
                    <DialogContent class="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{{ selectedRole?.name }}</DialogTitle>
                            <DialogDescription>
                                {{ selectedRole?.description }}
                            </DialogDescription>
                        </DialogHeader>

                        <div class="space-y-4">
                            <div>
                                <h4 class="text-sm font-medium mb-3">Permissions ({{ selectedRole?.permissions.length
                                    }})</h4>
                                <div class="space-y-2">
                                    <div v-for="permission in selectedRole?.permissions" :key="permission.id"
                                        class="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <div class="font-medium">{{ permission.name }}</div>
                                            <div class="text-sm text-muted-foreground">{{ permission.description }}
                                            </div>
                                        </div>
                                        <Badge variant="outline">ID: {{ permission.id }}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" @click="setDialogOpen(false)">Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

        </div>

        <Dialog :open="isCreateNewRoleOpenModal" @update:open="setDialogOpen">
            <DialogContent class="sm:max-w-[600px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle class="text-2xl font-bold">{{ isEditing ? 'Edit Role' : 'Create New Role' }}
                    </DialogTitle>
                    <DialogDescription>
                        {{ isEditing ? 'Update the role information and permissions.'
                            : 'Create a new role with specific permissions.' }}
                    </DialogDescription>
                </DialogHeader>

                <form @submit.prevent="submitRole" class="space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="roleName">Role Name</Label>
                            <Input id="roleName" v-model="roleForm.name" placeholder="Enter role name" required
                                class="bg-white/80 dark:bg-slate-700/80" />
                        </div>
                        <div class="space-y-2">
                            <Label for="roleId">Role ID</Label>
                            <Input id="roleId" v-model="roleForm.id" type="number" placeholder="Auto-generated"
                                :disabled="isEditing" class="bg-white/80 dark:bg-slate-700/80" />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <Label for="description">Description</Label>
                        <Textarea id="description" v-model="roleForm.description"
                            placeholder="Describe what this role can do..." rows="3"
                            class="bg-white/80 dark:bg-slate-700/80" />
                    </div>

                    <div class="space-y-3">
                        <Label>Permissions</Label>
                        <div class="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
                            <div v-for="permission in availablePermissions" :key="permission.id"
                                class="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors">
                                <Checkbox :id="`permission-${permission.id}`"
                                    :checked="roleForm.permissions.includes(permission.id)"
                                    @update:checked="togglePermission(permission.id)" />
                                <Label :for="`permission-${permission.id}`" class="flex-1 cursor-pointer">
                                    <div class="font-medium">{{ formatPermissionName(permission.name) }}</div>
                                    <div class="text-sm text-slate-500 dark:text-slate-400">{{ permission.description }}
                                    </div>
                                </Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter class="gap-2">
                        <Button type="button" variant="outline" @click="setDialogOpen(false)">
                            Cancel
                        </Button>
                        <Button type="submit" :disabled="isSubmitting"
                            class="bg-gradient-to-r from-blue-600 to-purple-600">
                            <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                            {{ isEditing ? 'Update Role' : 'Create Role' }}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useQueryPublisherPermissionsList } from '@/hooks/publisher/account/usePublisherAccountManage'

// Shadcn imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import {
    Shield, Users, Key, Clock, Search, Plus, RotateCcw, Eye, Edit, Settings,
    MoreVertical, Copy, Trash2, Loader2, GamepadIcon, BarChart3,
    Database, FileText, Server, Activity
} from 'lucide-vue-next'
import { PERMISSION_DATA_TYPE } from '@/types/publisher/account/PermissionMangeType'

const { data: permissionsData, isFetching: isFetchingPermissions } = useQueryPublisherPermissionsList()

const searchQuery = ref('')
const filterType = ref('all')
const currentUser = 'dcphong'
const currentDateTime = ref('')
const selectedRole = ref<PERMISSION_DATA_TYPE | null>(null)

const isDialogOpen = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const roleForm = ref({
    id: null as number | null,
    name: '',
    description: '',
    permissions: [] as number[]
})

const totalPermissions = computed(() => {
    return permissionsData.value?.data.reduce((total: number, role: PERMISSION_DATA_TYPE) => total + role.permissions.length, 0) || 0
})

const availablePermissions = computed(() => {
    if (!permissionsData.value) return []
    return permissionsData.value.data.flatMap((role: PERMISSION_DATA_TYPE) => role.permissions)
})


const formatRoleName = (name: string) => {
    return name.replace(/_/g, ' ').toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const formatPermissionName = (name: string) => {
    return name.replace(/_/g, ' ').toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const getRoleIcon = (name: string) => {
    if (name.includes('MEMBER')) return Users
    if (name.includes('GAME')) return GamepadIcon
    if (name.includes('STATISTICS')) return BarChart3
    if (name.includes('HUB')) return Database
    if (name.includes('PUBLISHER')) return FileText
    if (name.includes('LOG')) return Activity
    return Shield
}

const getPermissionIcon = (name: string) => {
    if (name.includes('READ')) return Eye
    if (name.includes('WRITE')) return Edit
    if (name.includes('MANAGE')) return Settings
    return Key
}

const getPermissionLevel = (count: number) => {
    if (count <= 2) return 'Basic'
    if (count <= 4) return 'Advanced'
    return 'Full Access'
}

const getPermissionBadgeVariant = (count: number) => {
    if (count <= 2) return 'secondary'
    if (count <= 4) return 'default'
    return 'destructive'
}

const resetFilters = () => {
    searchQuery.value = ''
    filterType.value = 'all'
}

const openCreateRoleDialog = () => {
    isEditing.value = false
    roleForm.value = {
        id: null,
        name: '',
        description: '',
        permissions: []
    }
    setDialogOpen(true)
}

const togglePermission = (permissionId: number) => {
    const index = roleForm.value.permissions.indexOf(permissionId)
    if (index > -1) {
        roleForm.value.permissions.splice(index, 1)
    } else {
        roleForm.value.permissions.push(permissionId)
    }
}

const submitRole = async () => {
    isSubmitting.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setDialogOpen(false)
    } finally {
        isSubmitting.value = false
    }
}

const viewRoleDetails = (role: PERMISSION_DATA_TYPE) => {
    selectedRole.value = role
    setDialogOpen(true)
}

const isCreateNewRoleOpenModal = ref(false)
const setCreateNewRoleOpen = (open: boolean) => {
    isCreateNewRoleOpenModal.value = open
    if (!open) {
        roleForm.value = {
            id: null,
            name: '',
            description: '',
            permissions: []
        }
    }
}
const setDialogOpen = (open: boolean) => {
    isDialogOpen.value = open
    if (!open) {
        selectedRole.value = null
    }
}

</script>

<style scoped>
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #94a3b8;
}

@keyframes gradient {

    0%,
    100% {
        background-size: 200% 200%;
        background-position: left center;
    }

    50% {
        background-size: 200% 200%;
        background-position: right center;
    }
}

.group:hover .animate-gradient {
    animation: gradient 3s ease infinite;
}
</style>