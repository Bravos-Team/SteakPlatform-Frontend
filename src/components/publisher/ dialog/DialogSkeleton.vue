<template>
    <DialogContent>
        <DialogHeader>
            <DialogTitle class="flex items-center gap-3">
                <!-- Avatar Skeleton -->
                <div class="h-12 w-12 bg-muted rounded-full animate-pulse"></div>
                <div>
                    <!-- Username Skeleton -->
                    <div class="h-7 w-32 bg-muted rounded animate-pulse mb-2"></div>
                    <!-- Subtitle Skeleton -->
                    <div class="h-4 w-24 bg-muted rounded animate-pulse"></div>
                </div>
            </DialogTitle>
        </DialogHeader>

        <div class="space-y-6">
            <!-- Status Section Skeleton -->
            <div class="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-muted rounded-full animate-pulse"></div>
                    <div class="h-4 w-12 bg-muted rounded animate-pulse"></div>
                </div>
                <div class="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
            </div>

            <!-- Info Cards Grid Skeleton -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Card 1 -->
                <Card>
                    <CardContent class="p-4">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-muted rounded-lg animate-pulse">
                                <div class="h-5 w-5 bg-muted-foreground/20 rounded animate-pulse"></div>
                            </div>
                            <div class="flex-1">
                                <div class="h-3 w-12 bg-muted rounded animate-pulse mb-2"></div>
                                <div class="h-4 w-24 bg-muted rounded animate-pulse"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 2 -->
                <Card>
                    <CardContent class="p-4">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-muted rounded-lg animate-pulse">
                                <div class="h-5 w-5 bg-muted-foreground/20 rounded animate-pulse"></div>
                            </div>
                            <div class="flex-1">
                                <div class="h-3 w-8 bg-muted rounded animate-pulse mb-2"></div>
                                <div class="h-4 w-32 bg-muted rounded animate-pulse"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 3 -->
                <Card>
                    <CardContent class="p-4">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-muted rounded-lg animate-pulse">
                                <div class="h-5 w-5 bg-muted-foreground/20 rounded animate-pulse"></div>
                            </div>
                            <div class="flex-1">
                                <div class="h-3 w-16 bg-muted rounded animate-pulse mb-2"></div>
                                <div class="h-4 w-28 bg-muted rounded animate-pulse"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Card 4 -->
                <Card>
                    <CardContent class="p-4">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-muted rounded-lg animate-pulse">
                                <div class="h-5 w-5 bg-muted-foreground/20 rounded animate-pulse"></div>
                            </div>
                            <div class="flex-1">
                                <div class="h-3 w-18 bg-muted rounded animate-pulse mb-2"></div>
                                <div class="h-4 w-16 bg-muted rounded animate-pulse"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Roles Section Skeleton -->
            <div class="space-y-3">
                <div class="flex items-center gap-2">
                    <div class="h-5 w-5 bg-muted rounded animate-pulse"></div>
                    <div class="h-6 w-28 bg-muted rounded animate-pulse"></div>
                </div>

                <div class="space-y-2">
                    <!-- Role Item Skeleton -->
                    <div class="flex items-center justify-between p-4 border rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-muted rounded-lg animate-pulse">
                                <div class="h-4 w-4 bg-muted-foreground/20 rounded animate-pulse"></div>
                            </div>
                            <div>
                                <div class="h-5 w-16 bg-muted rounded animate-pulse mb-2"></div>
                                <div class="h-3 w-20 bg-muted rounded animate-pulse"></div>
                            </div>
                        </div>
                        <div class="h-6 w-20 bg-muted rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            <!-- Activity Timeline Skeleton -->
            <div class="space-y-3">
                <div class="flex items-center gap-2">
                    <div class="h-5 w-5 bg-muted rounded animate-pulse"></div>
                    <div class="h-6 w-32 bg-muted rounded animate-pulse"></div>
                </div>

                <div class="space-y-3">
                    <!-- Activity Item 1 -->
                    <div class="flex items-start gap-3 p-3 border-l-2 border-muted bg-muted/20 rounded-r-lg">
                        <div class="p-1.5 bg-muted rounded-full animate-pulse">
                            <div class="h-3 w-3 bg-muted-foreground/20 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div class="h-4 w-28 bg-muted rounded animate-pulse mb-1"></div>
                            <div class="h-3 w-24 bg-muted rounded animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Activity Item 2 -->
                    <div class="flex items-start gap-3 p-3 border-l-2 border-muted bg-muted/20 rounded-r-lg">
                        <div class="p-1.5 bg-muted rounded-full animate-pulse">
                            <div class="h-3 w-3 bg-muted-foreground/20 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div class="h-4 w-20 bg-muted rounded animate-pulse mb-1"></div>
                            <div class="h-3 w-18 bg-muted rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Current Session Card Skeleton -->
            <Card class="bg-muted/30 border-muted">
                <CardContent class="p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-muted rounded-lg animate-pulse">
                                <div class="h-5 w-5 bg-muted-foreground/20 rounded animate-pulse"></div>
                            </div>
                            <div>
                                <div class="h-4 w-24 bg-muted rounded animate-pulse mb-1"></div>
                                <div class="h-3 w-20 bg-muted rounded animate-pulse"></div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="h-4 w-32 bg-muted rounded animate-pulse mb-1"></div>
                            <div class="h-3 w-8 bg-muted rounded animate-pulse"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <DialogFooter class="gap-2">
            <!-- Button Skeletons -->
            <div class="h-9 w-16 bg-muted rounded animate-pulse"></div>
            <div class="h-9 w-20 bg-muted rounded animate-pulse"></div>
            <div class="h-9 w-28 bg-muted rounded animate-pulse"></div>
        </DialogFooter>
    </DialogContent>
</template>

<script setup lang="ts">

import { Card, CardContent } from '@/components/ui/card';
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
</script>