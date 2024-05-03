<template>
  <div class="home">
    <h1>Witaj na Stronie Głównej</h1>
    <p>
      Aplikacja służy do generowania zdjęć do bloga na podstawie wpisanego po
      angielsku artykułu
    </p>
    <router-link to="/search">Przejdź do wyszukiwarki</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: auto;
  text-align: center;
}
</style>
