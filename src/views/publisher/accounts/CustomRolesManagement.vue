<template>
    <TableManageSkeleton v-if="isCustomRolesListFetching" />
    <Card v-else class="container min-w-full p-6 space-y-6 text-pretty bg-[#101014]/80 min-h-full">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold"> {{
                    $t('title.subPagesCompo.sidebar.publisher.accounts_management.custom_roles') }}</h1>
                <p class="text-muted-foreground">Manage system roles and permissions</p>
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
                                <Shield v-if="role.active" class="h-6 w-6 text-primary" />
                                <ShieldOff v-else class="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                                <CardTitle class="text-lg">{{ role.name }}</CardTitle>
                                <Badge :variant="role.active ? 'default' : 'destructive'" class="mt-1">
                                    {{ role.active ? 'Active' : 'Inactive' }}
                                </Badge>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" :disabled="isDuplicating"
                                    :class="{ 'cursor-pointer': !isDuplicating, 'cursor-not-allowed': isDuplicating }"
                                    size="sm">
                                    <MoreVertical class="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem class="cursor-pointer">
                                    <router-link :to="{ name: 'PublisherCustomRolesDetails', params: { id: role.id } }"
                                        class="flex items-center gap-x-1">
                                        <Edit class="h-4 w-4 mr-2" />
                                        Edit
                                    </router-link>
                                </DropdownMenuItem>
                                <DropdownMenuItem @click="handleDuplicateRole(role)" class="cursor-pointer">
                                    <Copy class="h-4 w-4 mr-2" />
                                    Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem v-if="role.active" class="text-red-600" :disabled="isDeleting"
                                    @click="handleMutateRoleStatus(role.id, role.active)">
                                    <LoaderCircle v-if="isEditing" class="h-4 w-4 mr-2" />
                                    <Trash2 v-else class="h-4 w-4 mr-2" />
                                    Deactivate
                                </DropdownMenuItem>
                                <DropdownMenuItem v-else class="text-green-600" :disabled="isDeleting"
                                    @click="handleMutateRoleStatus(role.id, role.active)">
                                    <LoaderCircle v-if="isEditing" class="h-4 w-4 mr-2" />
                                    <ShieldPlus v-else class="h-4 w-4 mr-2" />
                                    Activate
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent class="text-pretty">
                    <span class="text-sm  text-muted-foreground mb-4">{{ role.description }}</span>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-muted-foreground">Role ID:</span>
                            <code class="bg-muted px-2 py-1 rounded text-xs">{{ role.id }}</code>
                        </div>
                    </div>
                </CardContent>
                <CardFooter class="pt-0">
                    <button v-if="isDuplicating || isSubmitting"
                        class="w-full flex cursor-pointer border-1 rounded-sm px-3 py-1 items-center justify-center hover:bg-white/20 transition-colors duration-300">
                        <Eye class="h-4 w-4 mr-2" />
                        View role details
                    </button>
                    <router-link v-else :to="{ name: 'PublisherCustomRolesDetails', params: { id: role.id } }"
                        class="w-full flex cursor-pointer border-1 rounded-sm px-3 py-1 items-center justify-center hover:bg-white/20 transition-colors duration-300">
                        <Eye class="h-4 w-4 mr-2" />
                        View role details
                    </router-link>
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
    Shield, Search, Plus, MoreVertical, Eye, Edit, Copy, Trash2,
    ChevronLeft, ChevronRight,
    LoaderCircle,
    Loader2,
    ShieldOff,
    ShieldPlus
} from 'lucide-vue-next'

import { useQueryCustomRolesList, useMutateCreateCustomRole, useQueryPublisherPermissionsList, useMutateChangeCustomRoleStatus } from "@/hooks/publisher/account/usePublisherAccountManage"
import { computed, ref } from 'vue'
import TableManageSkeleton from '@/components/publisher/TableManageSkeleton.vue';
import { CREATE_CUSTOM_ROLE_PAYLOAD } from '@/types/publisher/account/AccountManageType'
import { useDebounceFn } from '@vueuse/core'
import { useFilter } from 'reka-ui'
import Label from '@/components/ui/label/Label.vue'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import { toastErrorNotificationPopup, toastSuccessNotificationPopup } from '@/composables/toast/toastNotificationPopup'
const { data: customRolesList, isFetching: isCustomRolesListFetching } = useQueryCustomRolesList();
const { data: permissionsList, isFetching: isCustomRolesFetching } = useQueryPublisherPermissionsList();
const { mutateAsync: createCustomRole } = useMutateCreateCustomRole();
const { mutateAsync: changeCustomRoleStatus } = useMutateChangeCustomRoleStatus();

const isCreateRoleDialogOpen = ref(false);
const setDialogOpen = (open: boolean) => {
    isCreateRoleDialogOpen.value = open
}
const openComboboxPicker = ref(false);

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

const isDuplicating = ref(false);
const handleDuplicateRole = useDebounceFn(async (role: any) => {
    isDuplicating.value = true
    try {
        delete role.id
        const duplicateRole = {
            ...role,
            name: `${role.name} (Copy)`,
        }
        const response = await createCustomRole(duplicateRole);
        if (response.status === 200) {
            toastSuccessNotificationPopup('Role duplicated successfully', 'The role has been duplicated successfully.');
        }
    } catch (err: any) {
        toastErrorNotificationPopup('Failed to duplicate role', err.response.data.detail);
    } finally {
        isDuplicating.value = false;
    }

}, 100)

const isDeleting = ref(false);
const handleMutateRoleStatus = useDebounceFn(async (roleId: string, isActive: boolean) => {
    isDeleting.value = true;
    try {
        const response = await changeCustomRoleStatus({
            roleId: roleId,
            isActive: !isActive
        });
        if (response.status === 200) {
            toastSuccessNotificationPopup('Role status updated successfully', 'The role status has been updated successfully.');
        }
    } catch (error: any) {
        console.error("Error updating role status:", error);
        toastErrorNotificationPopup('Failed to update role status. Please try again later.', error.response.data.detail);
    } finally {
        isDeleting.value = false;
    }
}, 100);
</script>