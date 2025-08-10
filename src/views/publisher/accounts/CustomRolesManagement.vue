<template>
    <TableManageSkeleton v-if="isCustomRolesListFetching" />
    <Card v-else class="container min-w-full p-6 space-y-6 text-pretty bg-[#101014]/80 min-h-full">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold"> {{
                    $t('title.subPagesCompo.sidebar.publisher.accounts_management.custom_roles') }}</h1>
                <p class="text-muted-foreground">Manage system roles and permissions</p>
            </div>
            <div class="text-sm text-muted-foreground">
                <p>2025-08-10 06:45:36 UTC</p>
                <p>dcphong</p>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div class="flex items-center gap-2">
                <Input placeholder="Search roles..." class="w-80" />
                <Button variant="outline">
                    <Search class="h-4 w-4" />
                </Button>
            </div>
            <div class="flex items-center gap-2 gap-x-4">
                <Select>
                    <SelectTrigger class="w-40">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                <Button @click="openCreateDialog">
                    <Plus class="h-4 w-4 mr-2" />
                    Add Role
                </Button>
            </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card v-for="role in customRolesList?.data" :key="role.id"
                class="hover:shadow-lg bg-[#101014]/60 transition-shadow">
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-primary/10 rounded-lg">
                                <Shield class="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle class="text-lg">{{ role.name }}</CardTitle>
                                <Badge :variant="role.active ? 'default' : 'secondary'" class="mt-1">
                                    {{ role.active ? 'Active' : 'Inactive' }}
                                </Badge>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" class="cursor-pointer" size="sm">
                                    <MoreVertical class="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Settings class="h-4 w-4 mr-2" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Edit class="h-4 w-4 mr-2" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Copy class="h-4 w-4 mr-2" />
                                    Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="text-red-600">
                                    <Trash2 class="h-4 w-4 mr-2" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                    <span class="text-sm  text-muted-foreground mb-4">{{ role.description }}</span>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-muted-foreground">Role ID:</span>
                            <code class="bg-muted px-2 py-1 rounded text-xs">{{ role.id }}</code>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-muted-foreground">Status:</span>
                            <div class="flex items-center gap-1">
                                <div :class="`w-2 h-2 rounded-full ${role.active ? 'bg-green-500' : 'bg-gray-400'}`">
                                </div>
                                <span>{{ role.active ? 'Active' : 'Inactive' }}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter class="pt-0">
                    <Button @click="viewRoleDetails(role.id)" class="w-full flex cursor-pointer" variant="outline">
                        <Eye class="h-4 w-4 mr-2" />
                        View role details
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between">
            <div class="text-sm text-muted-foreground">
                Showing 1 to 1 of 1 roles
            </div>
            <div class="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                    <ChevronLeft class="h-4 w-4" />
                    Previous
                </Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm" disabled>
                    <ChevronRight class="h-4 w-4" />
                    Next
                </Button>
            </div>
        </div>
    </Card>

    <Dialog :open="isOpenRoleDetailsDialog" @update:open="setIsOpenRoleDetailsDialog">
        <DialogSkeleton v-if="isCustomRoleByIdFetching" />
        <DialogScrollContent v-else class="tablet:min-w-[40rem] laptop:min-w-[50rem] w-full">
            <DialogHeader>
                <DialogTitle class="flex items-center gap-3 text-white">
                    <div class="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                        <Shield class="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold">{{ customRole?.data?.name }}</h2>
                        <p class="text-gray-400 font-normal">Role Management Details</p>
                    </div>
                </DialogTitle>
            </DialogHeader>

            <div class="flex flex-col gap-y-4">
                <!-- Role Information Grid -->
                <Card class="bg-gray-900/50 border-gray-800  w-full ">
                    <CardContent class="p-4 min-w-full flex flex-col gap-y-2">
                        <div class="flex justify-between  min-w-full gap-x-5 flex-wrap gap-y-3">
                            <div class="flex items-center gap-3 w-full">
                                <div class="p-2 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                                    <Hash class="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Role ID</p>
                                    <p class="font-mono text-sm font-medium text-white">{{ customRole?.data?.id }}</p>
                                </div>
                            </div>


                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-purple-600/20 border border-purple-600/30 rounded-lg">
                                    <Users class="h-5 w-5 text-purple-400" />
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Assigned Users</p>
                                    <p class="font-medium text-white">{{ customRole?.data?.assignedAccounts?.length || 0
                                    }}
                                        account(s)</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-green-600/20 border border-green-600/30 rounded-lg">
                                    <CheckCircle class="h-5 w-5 text-green-400" />
                                </div>
                                <div>
                                    <p class="text-sm text-gray-400">Status</p>
                                    <p class="font-medium text-white">{{ customRole?.data?.isActive ? 'Active' :
                                        'Inactive' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between w-full">

                            <div class="flex items-start gap-3">
                                <div class="p-2 bg-orange-600/20 border border-orange-600/30 rounded-lg">
                                    <FileText class="h-5 w-5 text-orange-400" />
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-lg font-semibold text-white mb-2">Description</h3>
                                    <p class="text-gray-300 leading-relaxed">{{ customRole?.data?.description }}</p>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <!-- Assigned Accounts Section -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <Users class="h-5 w-5 text-gray-400" />
                            <h3 class="text-lg font-semibold text-white">Assigned Accounts</h3>
                            <Badge variant="outline" class="bg-gray-800 text-gray-300 border-gray-700">
                                {{ customRole?.data?.assignedAccounts?.length || 0 }}
                            </Badge>
                        </div>
                        <Button variant="outline" size="sm"
                            class="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                            <UserPlus class="h-4 w-4 mr-2" />
                            Assign User
                        </Button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Card v-for="account in customRole?.data?.assignedAccounts" :key="account.id"
                            class="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-colors">
                            <CardContent class="p-4">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <Avatar class="h-10 w-10 border-2 border-gray-700">
                                            <AvatarImage
                                                :src="`https://api.dicebear.com/7.x/initials/svg?seed=${account.username}&backgroundColor=1e293b`" />
                                            <AvatarFallback class="bg-gray-700 text-gray-300 font-semibold">
                                                {{ account.username?.substring(0, 2).toUpperCase() }}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 class="font-semibold text-white">{{ account.username }}</h4>
                                            <p class="text-sm text-gray-400">{{ account.email }}</p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm"
                                                class="text-gray-400 hover:text-white hover:bg-gray-800">
                                                <MoreVertical class="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent class="bg-[#101014] border-gray-800">
                                            <DropdownMenuItem class="text-gray-300 hover:bg-gray-800 hover:text-white">
                                                <Eye class="w-4 h-4 mr-2" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem class="text-gray-300 hover:bg-gray-800 hover:text-white">
                                                <Mail class="w-4 h-4 mr-2" />
                                                Send Message
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator class="bg-gray-800" />
                                            <DropdownMenuItem
                                                class="text-red-400 hover:bg-red-900/20 hover:text-red-300">
                                                <UserMinus class="w-4 h-4 mr-2" />
                                                Remove from Role
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div class="mt-3 pt-3 border-t border-gray-800">
                                    <div class="flex items-center justify-between text-xs">
                                        <span class="text-gray-500">User ID:</span>
                                        <code
                                            class="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">{{ account.id }}</code>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <!-- Activity Log -->
                <Card class="bg-gray-900/50 border-gray-800">
                    <CardContent class="p-6">
                        <div class="flex items-center gap-2 mb-4">
                            <Clock class="h-5 w-5 text-gray-400" />
                            <h3 class="text-lg font-semibold text-white">Recent Activity</h3>
                        </div>

                        <div class="space-y-3">
                            <div
                                class="flex items-start gap-3 p-3 border-l-2 border-blue-500 bg-blue-950/20 rounded-r-lg">
                                <div class="p-1.5 bg-blue-500 rounded-full">
                                    <Plus class="h-3 w-3 text-white" />
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-white">Role Created</p>
                                    <p class="text-xs text-gray-400">2025-08-10 07:13:10 UTC</p>
                                </div>
                            </div>

                            <div
                                class="flex items-start gap-3 p-3 border-l-2 border-green-500 bg-green-950/20 rounded-r-lg">
                                <div class="p-1.5 bg-green-500 rounded-full">
                                    <CheckCircle class="h-3 w-3 text-white" />
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-white">Status: {{ customRole?.data?.isActive ?
                                        'ACTIVE' :
                                        'INACTIVE' }}</p>
                                    <p class="text-xs text-gray-400">Current status</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <DialogFooter class="gap-2">
                <Button variant="outline" @click="$emit('update:open', false)"
                    class="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                    Close
                </Button>
                <Button variant="outline" class="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Edit class="h-4 w-4 mr-2" />
                    Edit Role
                </Button>
                <Button variant="outline" class="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Settings class="h-4 w-4 mr-2" />
                    Manage Permissions
                </Button>
                <Button class="bg-red-600 hover:bg-red-700 text-white">
                    <Trash2 class="h-4 w-4 mr-2" />
                    Delete Role
                </Button>
            </DialogFooter>
        </DialogScrollContent>
    </Dialog>

    <Dialog :open="isCreateRoleDialogOpen" @update:open="setDialogOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ isEditing ? 'Edit User' : 'Create New User' }}</DialogTitle>
                <DialogDescription>
                    {{ isEditing ? 'Update user information below.' : 'Fill in the information to create a new user.' }}
                </DialogDescription>
            </DialogHeader>

            <form @submit.prevent="onSubmitCreateRole" class="space-y-4">
                <div class="space-y-2">
                    <Label for="username">Name</Label>
                    <Input id="username" autocomplete="username" v-model="newRole.name" placeholder="Enter name"
                        required />
                </div>

                <div class="space-y-2">
                    <Label for="description">Description</Label>
                    <Input id="description" v-model="newRole.description" type="text" placeholder="Enter description"
                        required />
                </div>
                <!-- COMBOBOX PICKER -->
                <Card v-if="isCustomRolesFetching" class="animate-pulse  flex items-center justify-center">
                    <LoaderCircle class="size-4 animate-spin" />
                </Card>
                <Combobox v-else v-model:model-value="permissionsAssigned" v-model:open="openComboboxPicker"
                    :ignore-filter="true">
                    <combobox-anchor as-child>
                        <label for="permissions">
                            <tags-input @click="openComboboxPicker = true" v-model="permissionsAssigned"
                                class="px-2 gap-2 w-full flex flex-col items-start bg-black/70 hover:bg-black/20 transition-colors duration-300 cursor-pointer">
                                <div class="flex gap-2 items-center flex-wrap">
                                    <tags-input-item v-for="role in permissionsAssigned" :key="role" :value="role">
                                        <tags-input-item-text />
                                        <tags-input-item-delete />
                                    </tags-input-item>
                                </div>

                                <combobox-input v-model="permissionSearch" as-child>
                                    <tags-input-input id="permissions"
                                        :placeholder="$t('title.pages.game_details.form.platforms.placeholder')"
                                        class="min-w-full p-0 border-none focus-visible:ring-0 h-auto"
                                        @keydown.enter.prevent />
                                </combobox-input>
                            </tags-input>
                        </label>

                        <combobox-list align="end" side="top" class="w-[--reka-popper-anchor-width]">
                            <combobox-empty />
                            <combobox-group>
                                <scroll-area :class="{
                                    'h-[20rem]': filteredPermissions.length > 6,
                                    'h-[10rem]': filteredPermissions.length <= 6,
                                }">
                                    <combobox-item v-for="(permission, index) in filteredPermissions" :key="index"
                                        :value="permission" @select.prevent="
                                            (event: any) => {
                                                if (typeof event.detail.value.name === 'string') {
                                                    permissionSearch = ''
                                                    newRole.permissionIds = [...(newRole.permissionIds || []), event.detail.value.id]
                                                    permissionsAssigned = [...(permissionsAssigned || []), event.detail.value.name]
                                                }

                                                if (filteredPermissions.length === 0) {
                                                    openComboboxPicker = false
                                                }
                                            }
                                        ">
                                        {{ permission.name }}
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
                        , 'cursor-pointer': !isSubmitting
                    }" type="submit" :disabled="isSubmitting">
                        <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                        {{ isEditing ? 'Update User' : 'Create User' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from "@/components/ui/tags-input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogScrollContent,
    DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox'
import {
    Hash, Users, CheckCircle, FileText, UserPlus,
    Mail, UserMinus, Clock,
    Shield, Search, Plus, MoreVertical, Eye, Edit, Copy, Trash2,
    Settings, ChevronLeft, ChevronRight,
    LoaderCircle,
    Loader2
} from 'lucide-vue-next'

import { useQueryCustomRolesList, useMutateCreateCustomRole, useQueryPublisherPermissionsList, useQueryRoleInformationsById } from "@/hooks/publisher/account/usePublisherAccountManage"
import { computed, onMounted, ref } from 'vue'
import DialogSkeleton from '@/components/publisher/ dialog/DialogSkeleton.vue'
import TableManageSkeleton from '@/components/publisher/TableManageSkeleton.vue';
import { CREATE_CUSTOM_ROLE_PAYLOAD } from '@/types/publisher/account/AccountManageType'
import { useDebounceFn } from '@vueuse/core'
import { useFilter } from 'reka-ui'
import Label from '@/components/ui/label/Label.vue'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
const { data: customRolesList, isFetching: isCustomRolesListFetching } = useQueryCustomRolesList();
const { data: permissionsList, isFetching: isCustomRolesFetching } = useQueryPublisherPermissionsList();
const { mutateAsync: createCustomRole } = useMutateCreateCustomRole();

const isCreateRoleDialogOpen = ref(false);
const setDialogOpen = (open: boolean) => {
    isCreateRoleDialogOpen.value = open
}
const openComboboxPicker = ref(false);
const isOpenRoleDetailsDialog = ref(false)
const customRoleId = ref<string>('');
const { data: customRole, isFetching: isCustomRoleByIdFetching, refetch: refetchCustomRoleById } = useQueryRoleInformationsById(customRoleId);

const setIsOpenRoleDetailsDialog = (value: boolean) => {
    isOpenRoleDetailsDialog.value = value;
};
const permissionSearch = ref('');
const permissionsAssigned = ref<string[]>([]);
const isEditing = ref(false);
const newRole = ref<CREATE_CUSTOM_ROLE_PAYLOAD>({
    name: '',
    description: '',
    permissionIds: []
})
const openCreateDialog = () => {
    isEditing.value = false
    permissionsAssigned.value = []
    newRole.value = {
        name: '',
        description: '',
        permissionIds: []
    }
    setDialogOpen(true)
}

const { contains } = useFilter({ sensitivity: 'base' })
const filteredPermissions = computed(() => {
    const options = permissionsList.value!.data?.filter((permission: any) => !permissionsAssigned.value.includes(permission.name))
    return permissionSearch.value ? options.filter((option: string) => contains(option, permissionSearch.value)) : options
})

const viewRoleDetails = async (roleId: number) => {
    customRoleId.value = roleId.toString();
    isOpenRoleDetailsDialog.value = true
    try {
        const response = await refetchCustomRoleById();
    } catch (err: any) {
        console.error("Error viewing role details:", err);
    }
};

const isSubmitting = ref(false);
const onSubmitCreateRole = useDebounceFn(async () => {
    isSubmitting.value = true;
    try {
        await createCustomRole(newRole.value);
        setDialogOpen(false);
    } catch (error: any) {
        console.error("Error creating custom role:", error);
        toastErrorNotificationPopup('Failed to create custom role. Please try again later.', error.response.data.detail);
    } finally {
        isSubmitting.value = false;
    }
}, 100)

</script>