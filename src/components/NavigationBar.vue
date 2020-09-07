<template>
  <nav>
    <div class="nav__padding"></div>
    <div class="nav__group">
      <div class="nav__group__item">
        <router-link
          to="/"
          exact
          :class="{ 'router-link-active': $route.fullPath !== '/talk' }"
          >Article</router-link
        >
      </div>
      <div class="nav__group__item">
        <router-link to="/talk">Talk</router-link>
      </div>
    </div>
    <div class="nav__spacer"></div>
    <div class="nav__group">
      <div class="nav__group__item no-mobile">
        <router-link :to="$route.fullPath">Read</router-link>
      </div>
      <div class="nav__group__item">
        <a href="https://github.com/danfishgold/wikipedia-charts">Edit</a>
      </div>
      <div class="nav__group__item no-mobile">
        <a href="https://github.com/danfishgold/wikipedia-charts/commits/main"
          >View History</a
        >
      </div>
    </div>
    <div class="nav__padding"></div>
  </nav>
</template>
