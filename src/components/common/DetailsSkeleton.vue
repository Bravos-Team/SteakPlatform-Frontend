<template>
    <div class="min-h-screen bg-black/30 rounded-md p-6">
        <div class="container mx-auto space-y-6">
            <!-- Header Section Skeleton -->
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class="p-3 bg-gray-800 rounded-xl animate-pulse">
                        <div class="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div>
                        <div class="h-9 w-48 bg-gray-800 rounded animate-pulse mb-2"></div>
                        <div class="h-5 w-40 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                </div>

                <!-- Current User & Time Skeleton -->
                <div class="flex items-center gap-4">
                    <div class="text-right">
                        <div class="h-4 w-32 bg-gray-800 rounded animate-pulse mb-1"></div>
                        <div class="h-3 w-8 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
                        <div class="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            <!-- Role Information Card Skeleton -->
            <div class="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <!-- Info Item 1 -->
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-800 rounded-lg animate-pulse">
                            <div class="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div class="h-3 w-12 bg-gray-800 rounded animate-pulse mb-1"></div>
                            <div class="h-4 w-32 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Info Item 2 -->
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-800 rounded-lg animate-pulse">
                            <div class="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div class="h-3 w-20 bg-gray-800 rounded animate-pulse mb-1"></div>
                            <div class="h-4 w-20 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Info Item 3 -->
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-gray-800 rounded-lg animate-pulse">
                            <div class="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div class="h-3 w-10 bg-gray-800 rounded animate-pulse mb-1"></div>
                            <div class="h-4 w-12 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>

                <!-- Description Skeleton -->
                <div class="flex items-start gap-3">
                    <div class="p-2 bg-gray-800 rounded-lg animate-pulse">
                        <div class="h-5 w-5 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div class="flex-1">
                        <div class="h-6 w-24 bg-gray-800 rounded animate-pulse mb-2"></div>
                        <div class="h-4 w-full bg-gray-800 rounded animate-pulse mb-1"></div>
                        <div class="h-4 w-3/4 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            <!-- Assigned Accounts Table Skeleton -->
            <div class="bg-gray-900/50 border border-gray-800 rounded-lg">
                <!-- Header -->
                <div class="p-6 border-b border-gray-800">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="h-5 w-5 bg-gray-800 rounded animate-pulse"></div>
                            <div class="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
                            <div class="h-6 w-4 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                        <div class="h-9 w-24 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                </div>

                <!-- Table -->
                <div class="p-6">
                    <div class="rounded-md border border-gray-800">
                        <!-- Table Header -->
                        <div class="border-b border-gray-800 p-4">
                            <div class="grid grid-cols-5 gap-4">
                                <div class="h-4 w-8 bg-gray-800 rounded animate-pulse"></div>
                                <div class="h-4 w-10 bg-gray-800 rounded animate-pulse"></div>
                                <div class="h-4 w-12 bg-gray-800 rounded animate-pulse"></div>
                                <div class="h-4 w-10 bg-gray-800 rounded animate-pulse"></div>
                                <div class="h-4 w-12 bg-gray-800 rounded animate-pulse ml-auto"></div>
                            </div>
                        </div>

                        <!-- Table Body -->
                        <div class="p-4">
                            <div class="grid grid-cols-5 gap-4 items-center">
                                <!-- User Column -->
                                <div class="flex items-center gap-3">
                                    <div class="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
                                    <div>
                                        <div class="h-4 w-24 bg-gray-800 rounded animate-pulse mb-1"></div>
                                        <div class="h-3 w-16 bg-gray-800 rounded animate-pulse"></div>
                                    </div>
                                </div>

                                <!-- Email Column -->
                                <div class="flex items-center gap-2">
                                    <div class="h-4 w-4 bg-gray-800 rounded animate-pulse"></div>
                                    <div class="h-4 w-40 bg-gray-800 rounded animate-pulse"></div>
                                </div>

                                <!-- User ID Column -->
                                <div class="h-6 w-28 bg-gray-800 rounded animate-pulse"></div>

                                <!-- Status Column -->
                                <div class="h-6 w-16 bg-gray-800 rounded-full animate-pulse"></div>

                                <!-- Actions Column -->
                                <div class="h-8 w-8 bg-gray-800 rounded animate-pulse ml-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Activity Log Skeleton -->
            <div class="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div class="flex items-center gap-2 mb-4">
                    <div class="h-5 w-5 bg-gray-800 rounded animate-pulse"></div>
                    <div class="h-6 w-28 bg-gray-800 rounded animate-pulse"></div>
                </div>

                <div class="space-y-3">
                    <!-- Activity Item 1 -->
                    <div class="flex items-start gap-3 p-3 border-l-2 border-gray-800 bg-gray-800/20 rounded-r-lg">
                        <div class="p-1.5 bg-gray-800 rounded-full animate-pulse">
                            <div class="h-3 w-3 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div class="h-4 w-20 bg-gray-800 rounded animate-pulse mb-1"></div>
                            <div class="h-3 w-32 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                    </div>

                    <!-- Activity Item 2 -->
                    <div class="flex items-start gap-3 p-3 border-l-2 border-gray-800 bg-gray-800/20 rounded-r-lg">
                        <div class="p-1.5 bg-gray-800 rounded-full animate-pulse">
                            <div class="h-3 w-3 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div class="h-4 w-24 bg-gray-800 rounded animate-pulse mb-1"></div>
                            <div class="h-3 w-20 bg-gray-800 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons Skeleton -->
            <div class="flex flex-wrap gap-3 justify-end">
                <div class="h-10 w-28 bg-gray-800 rounded animate-pulse"></div>
                <div class="h-10 w-20 bg-gray-800 rounded animate-pulse"></div>
                <div class="h-10 w-32 bg-gray-800 rounded animate-pulse"></div>
                <div class="h-10 w-24 bg-gray-800 rounded animate-pulse"></div>
            </div>
        </div>
    </div>
</template>