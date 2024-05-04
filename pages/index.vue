<template>
  <div class="home">
    <div class="content">
      <h1>Witaj na Stronie Głównej</h1>
      <p>
        Aplikacja służy do generowania zdjęć do bloga na podstawie wpisanego po
        angielsku artykułu
      </p>
      <img
        src="https://www.unite.ai/wp-content/uploads/2023/05/AI-Graphic-design-tools.png"
      />
      <router-link to="/search">
        <button class="btn">Przejdź do wyszukiwarki</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home {
  display: flex;
  align-items: center; /* wyśrodkowanie zawartości w pionie */
  justify-content: center; /* wyśrodkowanie zawartości w poziomie */
  min-height: 85vh; /* minimalna wysokość ekranu */
}

.content {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.btn {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #45a049;
}
</style>
