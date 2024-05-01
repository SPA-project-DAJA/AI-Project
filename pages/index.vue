<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Wyszukaj..."
      @keydown.enter="searchData"
    />
    <button @click="searchData" :disabled="loader">Wyszukaj</button>
    <div v-if="loader" class="loader">Ładowanie danych...</div>

    <div class="result" v-else>
      <div v-for="(photo, index) in photos" :key="index" class="result-item">
        <img
          id="thumbnail"
          :src="photo.src.medium"
          :alt="photo.photographer"
          @click="showFullImage(photo.src.original)"
        />
        <div class="modal" v-if="selectedImage === photo.src.original">
          <span @click="selectedImage = ''" class="close">✕</span>
          <img id="big" :src="selectedImage" :alt="photo.photographer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const photos = ref([]);
const loader = ref(false);
const selectedImage = ref("");

const API_KEY = "s4lVXRGh8RuRzi7fWhTYeNQHyZfuqSIV2LpZNlEkecIBVFcMXbW03gKE";
const BASE_URL = "https://api.pexels.com/v1";

const searchData = async () => {
  if (!searchQuery.value) return;
  loader.value = true;

  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${searchQuery.value}&per_page=15`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    const data = await response.json();
    if (data.photos) {
      photos.value = data.photos;
      loader.value = false;
      console.log(data); // Wyświetla dane w konsoli
    } else {
      console.error("Nie znaleziono zdjęć");
    }
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    loader.value = false;
  }
};

const showFullImage = (imageUrl) => {
  selectedImage.value = imageUrl;
};
</script>

<style scoped>
.loader {
  margin-top: 20px;
}

.result {
  display: flex;
  flex-wrap: wrap;
}

.result-item {
  margin-right: 10px;
  margin-bottom: 10px;
}

.thumbnail img {
  width: 200px;
  height: auto;
  cursor: pointer;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal img {
  margin: auto;
  display: block;
  max-width: 90%;
  max-height: 90%;
}

.close {
  color: white;
  position: absolute;
  top: 15px;
  right: 35px;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>
