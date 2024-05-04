<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img
          src="https://img.freepik.com/darmowe-wektory/ptak-kolorowe-logo-wektor-gradientu_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1713571200&semt=ais"
          alt="Logo"
        />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="#"
          ><router-link to="/">Home</router-link></a
        >
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  background-color: #4a4a4a;
}

.navbar-item {
  color: white;
}

.navbar-burger {
  color: white;
}

.navbar-burger span {
  background-color: white;
}
</style>
