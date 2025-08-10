<template>
    <Card class="gap-y-2 flex flex-col mx-auto py-6 w-full min-h-full px-2 bg-black/70">
        <!-- Header Skeleton -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
                <div class="h-9 w-80 bg-muted rounded animate-pulse mb-2"></div>
                <div class="h-5 w-64 bg-muted rounded animate-pulse"></div>
            </div>
            <div class="flex items-center space-x-2">
                <div class="h-6 w-24 bg-muted rounded-full animate-pulse"></div>
                <div class="h-10 w-24 bg-muted rounded animate-pulse"></div>
            </div>
        </div>

        <!-- Stats Cards Skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-4 min-h-full">
            <Card>
                <CardContent class="p-6">
                    <div class="flex items-center mb-2">
                        <div class="h-4 w-4 bg-muted rounded animate-pulse"></div>
                        <div class="ml-2 h-4 w-20 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div class="h-8 w-16 bg-muted rounded animate-pulse"></div>
                </CardContent>
            </Card>
            <Card>
                <CardContent class="p-6">
                    <div class="flex items-center mb-2">
                        <div class="h-4 w-4 bg-muted rounded animate-pulse"></div>
                        <div class="ml-2 h-4 w-20 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div class="h-8 w-16 bg-muted rounded animate-pulse"></div>
                </CardContent>
            </Card>
        </div>

        <!-- Main Table Card Skeleton -->
        <Card class="h-full">
            <CardHeader>
                <div class="flex justify-end gap-x-5 flex-wrap gap-y-2">
                    <!-- Search Input 1 Skeleton -->
                    <div class="flex flex-col gap-y-1">
                        <div class="h-4 w-20 bg-muted rounded animate-pulse"></div>
                        <div class="h-10 tablet:w-[20rem] w-full bg-muted rounded animate-pulse"></div>
                    </div>
                    <!-- Search Input 2 Skeleton -->
                    <div class="flex flex-col gap-y-1">
                        <div class="h-4 w-24 bg-muted rounded animate-pulse"></div>
                        <div class="h-10 tablet:w-[20rem] w-full bg-muted rounded animate-pulse"></div>
                    </div>
                    <!-- Select Skeleton -->
                    <div class="flex flex-col justify-end gap-y-1">
                        <div class="h-4 w-12 bg-muted rounded animate-pulse"></div>
                        <div class="h-10 w-[180px] bg-muted rounded animate-pulse"></div>
                    </div>
                    <!-- Reset Button Skeleton -->
                    <div class="flex flex-col gap-y-1 justify-center group items-center">
                        <div class="size-7 bg-muted rounded animate-pulse"></div>
                    </div>
                </div>
            </CardHeader>
            <CardContent class="px-3 min-h-full">
                <div class="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <div class="h-4 w-12 bg-muted rounded animate-pulse"></div>
                                </TableHead>
                                <TableHead>
                                    <div class="h-4 w-12 bg-muted rounded animate-pulse"></div>
                                </TableHead>
                                <TableHead>
                                    <div class="h-4 w-8 bg-muted rounded animate-pulse"></div>
                                </TableHead>
                                <TableHead>
                                    <div class="h-4 w-12 bg-muted rounded animate-pulse"></div>
                                </TableHead>
                                <TableHead class="text-right">
                                    <div class="h-4 w-16 bg-muted rounded animate-pulse ml-auto"></div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <!-- Table Row Skeletons -->
                            <TableRow v-for="i in 5" :key="i">
                                <TableCell>
                                    <div class="flex items-center space-x-3">
                                        <div class="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
                                        <div>
                                            <div class="h-4 w-24 bg-muted rounded animate-pulse mb-1"></div>
                                            <div class="h-3 w-32 bg-muted rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center space-x-2">
                                        <div class="h-4 w-4 bg-muted rounded animate-pulse"></div>
                                        <div class="h-4 w-40 bg-muted rounded animate-pulse"></div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div class="h-6 w-20 bg-muted rounded animate-pulse"></div>
                                </TableCell>
                                <TableCell>
                                    <div class="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
                                </TableCell>
                                <TableCell class="text-right">
                                    <div class="h-8 w-8 bg-muted rounded animate-pulse ml-auto"></div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        <!-- Pagination Skeleton -->
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 text-sm text-muted-foreground">
                <div class="h-4 w-48 bg-muted rounded animate-pulse"></div>
            </div>
            <div class="flex items-center space-x-1">
                <div class="h-9 w-9 bg-muted rounded animate-pulse"></div>
                <div class="h-9 w-9 bg-muted rounded animate-pulse"></div>
                <div class="h-9 w-9 bg-muted rounded animate-pulse"></div>
                <div class="h-9 w-9 bg-muted rounded animate-pulse"></div>
                <div class="h-9 w-9 bg-muted rounded animate-pulse"></div>
                <div class="h-9 w-9 bg-muted rounded animate-pulse"></div>
                <div class="h-9 w-9 bg-muted rounded animate-pulse"></div>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
</script>