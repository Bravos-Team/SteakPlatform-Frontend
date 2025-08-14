<template>
    <div class="p-4 bg-gray-800 text-white rounded-lg">
        <h2 class="text-xl font-bold mb-4">WebCodecs API Video Compressor</h2>

        <div class="mb-4">
            <label for="video-input" class="block mb-2">Chọn file video:</label>
            <input type="file" id="video-input" @change="handleFileSelect" accept="video/*" class="file-input"
                :disabled="isProcessing" />
        </div>

        <div v-if="isProcessing" class="mt-4 flex flex-col gap-y-2">
            <div class="flex items-center gap-x-2">
                <LoaderCircle class="animate-spin size-6" />
                <span>{{ statusMessage }}</span>
            </div>
            <!-- Progress bar sẽ hiển thị phần trăm từ 0 đến 100 -->
            <Progress :max="100" v-model="progress" class="w-full" />
        </div>


        <div v-if="compressedVideoUrl" class="mt-4">
            <h3 class="font-bold">Video đã nén:</h3>
            <p class="text-sm text-gray-400">
                Kích thước gốc: {{ (originalSize / 1024 / 1024).toFixed(2) }} MB <br />
                Kích thước mới: {{ (compressedSize / 1024 / 1024).toFixed(2) }} MB
            </p>
            <video :src="compressedVideoUrl" controls class="w-full max-w-md mt-2 rounded"></video>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Muxer, ArrayBufferTarget } from 'mp4-muxer';
import { LoaderCircle } from 'lucide-vue-next';
import Progress from '@/components/ui/progress/Progress.vue';

// --- State ---
const isProcessing = ref(false);
const statusMessage = ref('');
const compressedVideoUrl = ref<string | null>(null);
const originalSize = ref(0);
const compressedSize = ref(0);
// `progress` sẽ lưu giá trị phần trăm (0-100)
const progress = ref(0);

// --- Hàm xử lý chính ---
const handleFileSelect = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const file = target.files[0];
    originalSize.value = file.size;

    // Reset trạng thái cho lần xử lý mới
    compressedVideoUrl.value = null;
    progress.value = 0;

    if (!('VideoEncoder' in window)) {
        alert('Trình duyệt của bạn không hỗ trợ WebCodecs API. Hãy thử trên Chrome hoặc Edge mới nhất.');
        return;
    }

    isProcessing.value = true;
    statusMessage.value = 'Bắt đầu...';

    try {
        const compressedBlob = await compressVideo(file);
        compressedSize.value = compressedBlob.size;
        compressedVideoUrl.value = URL.createObjectURL(compressedBlob);
        statusMessage.value = 'Hoàn thành!';
        progress.value = 100; // Đảm bảo thanh tiến trình đầy khi xong
    } catch (error) {
        console.error('Lỗi khi nén video:', error);
        statusMessage.value = `Lỗi: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
        isProcessing.value = false;
    }
};

const compressVideo = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const videoElement = document.createElement('video');
        const videoUrl = URL.createObjectURL(file);
        videoElement.src = videoUrl;

        let muxer: Muxer<ArrayBufferTarget> | null = null;
        let encoder: VideoEncoder | null = null;
        let firstFrameTimestamp: number | null = null;

        const processFrame = (now: DOMHighResTimeStamp, metadata: VideoFrameCallbackMetadata) => {
            if (firstFrameTimestamp === null) {
                firstFrameTimestamp = metadata.mediaTime;
            }
            const relativeTimestamp = metadata.mediaTime - firstFrameTimestamp;
            const frame = new VideoFrame(videoElement, { timestamp: relativeTimestamp * 1_000_000 });

            // Cập nhật tiến trình dựa trên thời gian
            const videoDuration = videoElement.duration;
            if (videoDuration > 0) {
                progress.value = Math.round((metadata.mediaTime / videoDuration) * 100);
            }
            statusMessage.value = `Đang xử lý... ${progress.value}%`;

            if (encoder?.state === 'configured') {
                encoder.encode(frame);
            }
            frame.close();

            if (!videoElement.ended) {
                videoElement.requestVideoFrameCallback(processFrame);
            }
        };

        videoElement.onloadedmetadata = async () => {
            const { videoWidth, videoHeight, duration } = videoElement;
            statusMessage.value = 'Đã tải metadata, bắt đầu khởi tạo encoder...';

            muxer = new Muxer({
                target: new ArrayBufferTarget(),
                video: {
                    codec: 'avc',
                    width: videoWidth,
                    height: videoHeight,
                },
                fastStart: 'in-memory',
            });

            encoder = new VideoEncoder({
                output: (chunk, meta) => {
                    muxer?.addVideoChunk(chunk, meta);
                },
                error: (e) => {
                    console.error('Lỗi encoder:', e);
                    reject(e);
                },
            });

            const codec = 'avc1.64002A';
            const support = await VideoEncoder.isConfigSupported({ codec, width: videoWidth, height: videoHeight });
            if (!support.supported) {
                return reject(new Error('Trình duyệt không hỗ trợ cấu hình nén cho độ phân giải này.'));
            }

            await encoder.configure({
                codec: codec,
                width: videoWidth,
                height: videoHeight,
                bitrate: 8_000_000, // Tăng bitrate cho chất lượng 1080p tốt hơn
                framerate: 10,
                latencyMode: 'quality',
                hardwareAcceleration: 'prefer-hardware' as const,
            });

            videoElement.requestVideoFrameCallback(processFrame);
            videoElement.play();
        };

        videoElement.onended = async () => {
            statusMessage.value = 'Đã xử lý tất cả các frame, đang hoàn tất file...';
            await encoder?.flush();
            const buffer = muxer?.finalize();

            if (buffer) {
                resolve(new Blob([buffer], { type: 'video/mp4' }));
            } else {
                reject(new Error('Không thể tạo file MP4.'));
            }

            URL.revokeObjectURL(videoUrl);
        };

        videoElement.onerror = (e) => {
            reject(new Error('Không thể tải video.'));
        };
    });
};

</script>

<style scoped>
.file-input {
    display: block;
    width: 100%;
    padding: 8px;
    border: 1px solid #4a5568;
    border-radius: 4px;
    background-color: #2d3748;
}

.file-input:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>