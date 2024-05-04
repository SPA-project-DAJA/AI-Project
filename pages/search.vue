<template>
  <div class="container">
    <div class="field has-addons">
      <div class="control is-expanded" :class="{ 'is-expanded': isExpanded }">
        <input
          class="input"
          type="text"
          v-model="searchQuery"
          placeholder="Wyszukaj..."
          @keydown.enter="searchData"
          ref="searchInput"
        />
      </div>
      <div class="control">
        <button
          class="button is-primary"
          @click="searchData"
          :disabled="loader"
        >
          Wyszukaj
        </button>
      </div>
      <div class="control">
        <button
          class="button is-danger"
          @click="clearResults"
          :disabled="loader || photos.length === 0"
        >
          Wyczyść wyniki
        </button>
      </div>
    </div>
    <div v-if="loader" class="loader">Ładowanie danych...</div>

    <div class="columns is-multiline is-centered" v-else>
      <div class="column is-4" v-for="(photo, index) in photos" :key="index">
        <div class="image-container">
          <img
            :src="photo.src.medium"
            :alt="photo.photographer"
            class="responsive-image"
            @click="showFullImage(photo.src.original)"
          />
        </div>
      </div>
    </div>

    <div class="modal" v-if="selectedImage">
      <div class="modal-background" @click="closeFullImage"></div>
      <div class="modal-content" :class="{ 'is-open': selectedImage }">
        <button
          class="modal-close is-large"
          aria-label="close"
          @click="closeFullImage"
        ></button>
        <img :src="selectedImage" :alt="selectedImage" class="full-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const searchQuery = ref("");
const photos = ref([]);
const loader = ref(false);
const selectedImage = ref("");
const isExpanded = ref(false); // Dodaj zmienną isExpanded

const API_KEY = "s4lVXRGh8RuRzi7fWhTYeNQHyZfuqSIV2LpZNlEkecIBVFcMXbW03gKE";
const BASE_URL = "https://api.pexels.com/v1";

const searchData = async () => {
  if (!searchQuery.value) return;
  loader.value = true;

  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${searchQuery.value}&per_page=30`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    const data = await response.json();
    console.log(data); // Wyświetlanie danych w konsoli
    if (data.photos) {
      photos.value = data.photos;
      loader.value = false;
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

const closeFullImage = () => {
  selectedImage.value = "";
};

const clearResults = () => {
  photos.value = [];
};

// Obserwuj zmiany w polu wyszukiwania, aby zmienić szerokość
watch(searchQuery, () => {
  const input = document.getElementById("search-input");
  if (input) {
    isExpanded.value = input.scrollWidth > input.clientWidth;
  }
});
</script>

<style lang="scss" scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

.container {
  margin: 20px auto;
  max-width: 1200px;
  min-height: 85vh; /* minimalna wysokość ekranu */
}

/* Styl do powiększania wyszukiwarki */
.input {
  transition: width 0.3s ease; /* Dodaj płynną animację */
  width: 100%; /* Szerokość początkowa */
}

/* Dodaj klase is-expanded gdy pole wyszukiwania jest rozszerzone */
.is-expanded {
  width: calc(100% + 200px); /* Powiększ o dodatkową ilość pikseli */
}

.loader {
  margin-top: 20px;
}

.image-container {
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.responsive-image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.responsive-image:hover {
  transform: scale(1.1);
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal-content {
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
  max-width: 80vw;
  max-height: 80vh;
  overflow: auto;
  position: relative;
  transform: scale(0.8);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-content.is-open {
  transform: scale(1);
  opacity: 1;
}

.modal-close {
  background-color: transparent;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
  cursor: pointer;
}

.full-image {
  width: 100%;
  height: auto;
  max-height: 80vh;
  border-radius: 5px;
}
</style>
