<template>
    <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Images</label>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input type="file" multiple accept="image/*" @change="handleImageUpload" class="hidden"
            ref="imageInput" />
        <button type="button" @click="$refs.imageInput.click()" class="cursor-pointer focus:outline-none">
            <CloudArrowUpIcon class="size-10 mx-auto text-gray-400 mb-2" />
            <p class="text-sm text-gray-600">
            Click to upload images or drag and drop
            </p>
        </button>
        </div>

        <!-- Uploaded Image Preview -->
        <div v-if="uploadedImage" class="relative w-24 h-24 mt-4">
        <img :src="uploadedImage" alt="image" class="w-full h-full object-cover rounded-lg" />
        <button @click="removeImage()"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
            <XMarkIcon class="size-5" />
        </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const uploadedImage = ref(null);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadedImage.value = URL.createObjectURL(file);
  }
};

const removeImage = (index) => {
  uploadedImage.value = null;
};
</script>
