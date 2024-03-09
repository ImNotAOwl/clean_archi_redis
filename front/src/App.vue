<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Authors</RouterLink>
          <RouterLink to="/posts">Posts</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
