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
                <Button variant="destructive" @click="() => isOpenCreateRoleTable = false" v-if="isOpenCreateRoleTable">
                    <Plus class="h-4 w-4 mr-2 rotate-45" />
                    Close Table
                </Button>
                <Button @click="openCreateTable" v-else>
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

        <!-- CREATE TABLE -->
        <div v-if="isCustomRolesFetching"></div>
        <div v-show="isOpenCreateRoleTable" class="space-y-6 p-6">
            <div class="space-y-2">
                <h1 id="permissionTableTitle" class="text-3xl font-bold tracking-tight">Role & Permission Management
                </h1>
                <p class="text-muted-foreground">
                    Select one permission per role. Click submit to see selected permission IDs.
                </p>
            </div>
            <Card>
                <card-content class="flex flex-col gap-y-2 flex-wrap">
                    <div class="flex flex-col gap-y-2 gap-x-2 flex-wrap">
                        <div class="flex flex-col gap-2 flex-wrap">
                            <span>Role Name</span>
                            <Input v-model="newRole.name" placeholder="Enter role name" />
                        </div>
                        <div class="flex flex-col gap-2 flex-wrap">
                            <span>Role Description</span>
                            <Input v-model="newRole.description" placeholder="Enter role description" />
                        </div>
                    </div>

                </card-content>
            </Card>
            <Card v-if="selectedPermissions.length > 0" class="border-green-200 bg-green-50 dark:bg-green-950">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <CheckCircle class="h-5 w-5" />
                        Selected Permissions Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <div v-for="selection in selectedPermissions" :key="selection.roleId"
                            class="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border">
                            <div class="space-y-1">
                                <p class="font-medium text-sm">{{ getRoleName(selection.roleId) }}</p>
                                <p class="text-xs text-muted-foreground">{{ getPermissionName(selection.permissionId) }}
                                </p>
                            </div>
                            <Badge variant="secondary">ID: {{ selection.permissionId }}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card v-for="role in rolesData" :key="role.id" class="transition-all duration-200 hover:shadow-lg"
                    :class="getSelectedPermission(role.id) ? 'border-primary bg-primary/5' : ''">
                    <CardHeader>
                        <CardTitle class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <Shield class="h-5 w-5 text-primary" />
                                <span class="text-lg">{{ role.name }}</span>
                            </div>
                            <Badge v-if="getSelectedPermission(role.id)" variant="default">
                                Selected
                            </Badge>
                        </CardTitle>
                        <CardDescription>{{ role.description }}</CardDescription>
                    </CardHeader>

                    <CardContent class="space-y-4">
                        <div class="space-y-2">
                            <h4 class="text-sm font-medium flex items-center gap-2">
                                <Key class="h-4 w-4" />
                                Permissions ({{ role.permissions.length }})
                            </h4>

                            <RadioGroup :model-value="getSelectedPermission(role.id)?.toString() || ''"
                                @update:model-value="(value) => handlePermissionSelect(role.id, parseInt(value))"
                                class="space-y-3">
                                <div v-for="permission in role.permissions" :key="permission.id"
                                    class="flex items-start space-x-3 p-3 rounded-lg border transition-colors hover:bg-muted/50">
                                    <RadioGroupItem :value="permission.id.toString()"
                                        :id="`role-${role.id}-permission-${permission.id}`" />
                                    <div class="grid gap-1.5 leading-none flex-1">
                                        <Label :for="`role-${role.id}-permission-${permission.id}`"
                                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                            {{ permission.name }}
                                        </Label>
                                        <p class="text-xs text-muted-foreground">
                                            {{ permission.description }}
                                        </p>
                                        <Badge variant="outline" class="w-fit text-xs">
                                            ID: {{ permission.id }}
                                        </Badge>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button v-if="getSelectedPermission(role.id)" variant="outline" size="sm"
                            @click="clearRoleSelection(role.id)" class="w-full">
                            <X class="h-4 w-4 mr-2" />
                            Clear Selection
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <!-- <Button @click="handleSubmit" class="flex-1 sm:flex-none" :disabled="selectedPermissions.length === 0">
                    <Send class="h-4 w-4 mr-2" />
                    Submit Selection ({{ selectedPermissions.length }})
                </Button> -->
                <div class="flex justify-end items-center">
                    <Button v-if="isSubmitting" :disabled="isSubmitting" :class="{
                        'cursor-not-allowed opacity-50': isSubmitting,
                        'cursor-pointer': !isSubmitting
                    }">
                        <LoaderCircle />
                    </Button>
                    <Button v-else :class="{ 'cursor-not-allowed': isSubmitting, 'cursor-pointer': !isSubmitting }"
                        @click="onSubmitCreateRole" :disabled="isSubmitting">
                        <Send class="h-4 w-4 mr-2" />
                        Submit Selection ({{ selectedPermissions.length }})
                    </Button>
                </div>
                <Button variant="outline" @click="clearAllSelections" :disabled="selectedPermissions.length === 0"
                    class="flex-1 sm:flex-none">
                    <RotateCcw class="h-4 w-4 mr-2" />
                    Clear All
                </Button>

                <Button variant="secondary" @click="selectRandomPermissions" class="flex-1 sm:flex-none">
                    <Shuffle class="h-4 w-4 mr-2" />
                    Random Select
                </Button>
            </div>

            <!-- Results Modal/Alert -->
            <AlertDialog v-model:open="showResults">
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle class="flex items-center gap-2">
                            <CheckCircle class="h-5 w-5 text-green-500" />
                            Selected Permission IDs
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Here are the permission IDs you have selected:
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div class="space-y-4">
                        <div class="p-4 bg-muted rounded-lg">
                            <code class="text-sm">{{ JSON.stringify(previewSubmittedPermissionIds, null, 2) }}</code>
                        </div>

                        <div class="space-y-2">
                            <h4 class="font-medium">Details:</h4>
                            <div class="space-y-2">
                                <div v-for="id in previewSubmittedPermissionIds" :key="id"
                                    class="flex items-center justify-between p-2 bg-background rounded border">
                                    <span class="font-medium">{{ getPermissionNameById(id) }}</span>
                                    <Badge>{{ id }}</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction @click="copyToClipboard">
                            <Copy class="h-4 w-4 mr-2" />
                            Copy IDs
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        <!-- END CREATE TABLE -->
    </Card>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { CardFooter } from '@/components/ui/card'
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

import { useQueryCustomRolesList, useQueryRoleInformationsById, useMutateCreateCustomRole, useQueryPublisherPermissionsList, useMutateChangeCustomRoleStatus } from "@/hooks/publisher/account/usePublisherAccountManage"
import TableManageSkeleton from '@/components/publisher/TableManageSkeleton.vue';
import { CREATE_CUSTOM_ROLE_PAYLOAD } from '@/types/publisher/account/AccountManageType'
import { useDebounceFn } from '@vueuse/core'
import { useFilter } from 'reka-ui'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import { toastErrorNotificationPopup, toastNotificationPopup, toastSuccessNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { ref, computed, watch } from 'vue'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
    Key,
    CheckCircle,
    X,
    Send,
    RotateCcw,
    Shuffle,
} from 'lucide-vue-next'

const { data: customRolesList, isFetching: isCustomRolesListFetching } = useQueryCustomRolesList();
const { data: permissionsList, isFetching: isCustomRolesFetching } = useQueryPublisherPermissionsList();
const { mutateAsync: createCustomRole } = useMutateCreateCustomRole();
const { mutateAsync: changeCustomRoleStatus } = useMutateChangeCustomRoleStatus();

const roleId = ref<any>();
const { data: roleDetailsData, refetch: refetchRoleDetailsData } = useQueryRoleInformationsById(roleId);

const rolesData = computed(() => permissionsList.value?.data)
interface Permission {
    id: number
    name: string
    description: string
}

interface Role {
    id: number
    name: string
    description: string
    permissions: Permission[]
}

interface SelectedPermission {
    roleId: number
    permissionId: number
}


const previewSubmittedPermissionIds = ref<number[]>([])
const selectedPermissions = ref<SelectedPermission[]>([])
const showResults = ref(false)
const submittedPermissionIds = ref<number[]>([])

const allPermissions = computed(() => {
    return rolesData.value.flatMap((role: Role) => role.permissions)
})

const handlePermissionSelect = (roleId: number, permissionId: number): void => {
    selectedPermissions.value = selectedPermissions.value.filter(
        selection => selection.roleId !== roleId
    )

    selectedPermissions.value.push({ roleId, permissionId })

    toastNotificationPopup('Permission Selected', `Selected ${getPermissionName(permissionId)} for ${getRoleName(roleId)}`)
}

const getSelectedPermission = (roleId: number): number | null => {
    const selection = selectedPermissions.value.find(s => s.roleId === roleId)
    return selection ? selection.permissionId : null
}

const clearRoleSelection = (roleId: number): void => {
    selectedPermissions.value = selectedPermissions.value.filter(
        selection => selection.roleId !== roleId
    )

    toastNotificationPopup('Selection Cleared', `Cleared selection for ${getRoleName(roleId)}`)
}

const clearAllSelections = (): void => {
    selectedPermissions.value = []

    toastNotificationPopup('All Selections Cleared', 'Cleared all role selections')
}

const selectRandomPermissions = (): void => {
    clearAllSelections()

    rolesData.value.forEach((role: Role) => {
        const randomPermission = role.permissions[
            Math.floor(Math.random() * role.permissions.length)
        ]
        selectedPermissions.value.push({
            roleId: role.id,
            permissionId: randomPermission.id
        })
    })

    toastNotificationPopup('Random Selection Complete', `Randomly selected ${selectedPermissions.value.length} permissions`)
}

const copyToClipboard = async (): Promise<void> => {
    try {
        await navigator.clipboard.writeText(JSON.stringify(previewSubmittedPermissionIds.value))
        toastNotificationPopup('Copied to Clipboard', 'Permission IDs copied to clipboard')
    } catch (error) {
        toastNotificationPopup('Copy Failed', 'Failed to copy to clipboard')
    }
}

const getRoleName = (roleId: number): string => {
    const role = rolesData.value.find((r: Role) => r.id === roleId)
    return role ? role.name : `Role ${roleId}`
}

const getPermissionName = (permissionId: number): string => {
    const permission = allPermissions.value.find((p: Permission) => p.id === permissionId)
    return permission ? permission.name : `Permission ${permissionId}`
}

const getPermissionNameById = (permissionId: number): string => {
    return getPermissionName(permissionId)
}


const isOpenCreateRoleTable = ref(false);
const permissionsAssigned = ref<string[]>([]);
const isEditing = ref(false);
const newRole = ref<CREATE_CUSTOM_ROLE_PAYLOAD>({
    name: '',
    description: '',
    permissionIds: []
})
const openCreateTable = () => {
    isEditing.value = false
    isOpenCreateRoleTable.value = true;
    permissionsAssigned.value = []
    newRole.value = {
        name: '',
        description: '',
        permissionIds: []
    }
    setTimeout(() =>
        window.scrollBy({
            top: document.getElementById('permissionTableTitle')!.getBoundingClientRect().top,
            left: 0,
            behavior: 'smooth'
        }), 100)
}


const isSubmitting = ref(false);
const onSubmitCreateRole = useDebounceFn(async () => {
    isSubmitting.value = true;
    try {

        submittedPermissionIds.value = selectedPermissions.value.map(s => s.permissionId)
        newRole.value = {
            ...newRole.value,
            permissionIds: submittedPermissionIds.value
        }
        if (newRole.value.name.trim() === '' || newRole.value.description.trim() === '' || submittedPermissionIds.value.length === 0) {
            console.log('name: ', newRole.value.name, "description: ", newRole.value.description, "permissions: ", submittedPermissionIds.value);
            toastErrorNotificationPopup('Please fill in all fields before submitting.', '');
            return;
        }
        const response = await createCustomRole(newRole.value);
        if (response.status === 200) {
            isOpenCreateRoleTable.value = false;
            previewSubmittedPermissionIds.value = submittedPermissionIds.value
            showResults.value = true
            toastNotificationPopup('Submission Successful', `Submitted ${submittedPermissionIds.value.length} permission IDs`)
            newRole.value = {
                name: '',
                description: '',
                permissionIds: []
            }
            permissionsAssigned.value = [];
            submittedPermissionIds.value = [];
        }
    } catch (error: any) {
        isOpenCreateRoleTable.value = false;
        console.error("Error creating custom role:", error);
        toastErrorNotificationPopup('Failed to create custom role. Please try again later.', error.response.data.errors.name);
    } finally {
        isSubmitting.value = false;
    }
}, 100)

const isDuplicating = ref(false);
const handleDuplicateRole = useDebounceFn(async (role: any) => {
    isDuplicating.value = true
    try {
        roleId.value = role.id;
        delete role.id

        const refetchResponse = await refetchRoleDetailsData();
        const listPermissionsIds = refetchResponse.data?.data.permissions.map((permission: any) => permission.id) || [];
        const duplicateRole = {
            ...role,
            name: `${role.name} (Copy)`,
            permissionIds: listPermissionsIds
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