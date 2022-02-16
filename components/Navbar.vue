<template>
  <nav v-if="$auth.$state.loggedIn" class="navbar">
    <ul>
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/shop">Shop</NuxtLink></li>
      <li><NuxtLink to="/compact">Composer</NuxtLink></li>
    </ul>
    <ul>
      <li><User /></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #0A1D26;
  margin-bottom: 1rem;
  border-bottom: 1px solid black;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
}
</style>