<template>
    <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Images</label>
        <div
        class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
        >
        <input
            type="file"
            multiple
            accept="image/*"
            @change="handleImageUpload"
            class="hidden"
            ref="imageInput"
        />
        <button
            type="button"
            @click="$refs.imageInput.click()"
            class="cursor-pointer focus:outline-none"
        >
            <CloudArrowUpIcon class="size-10 mx-auto text-gray-400 mb-2" />
            <p class="text-sm text-gray-600">
            Click to upload images or drag and drop
            </p>
        </button>
        </div>

        <!-- Uploaded Images Preview -->
        <div
        v-if="uploadedImages.length > 0"
        class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
        >
        <div
            v-for="(image, index) in uploadedImages"
            :key="index"
            class="relative"
        >
            <img
            :src="image"
            :alt="`Upload ${index + 1}`"
            class="w-full h-24 object-cover rounded-lg"
            />
            <button
            @click="removeImage(index)"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
                <XMarkIcon class="size-5" />
            </button>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const uploadedImages = ref([]);

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files) {
    // In a real app, you'd upload to a server and get URLs back
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    uploadedImages.value.push(...newImages);
  }
};

const removeImage = (index) => {
  uploadedImages.value.splice(index, 1);
};
</script>
