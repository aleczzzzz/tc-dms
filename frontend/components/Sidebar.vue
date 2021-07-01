<template>
  <nav
    class="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="scrollbar-inner">
      <div class="sidenav-header  d-flex  align-items-center">
        <a class="navbar-brand w-100 text-center">
          <b class="f25">{{ name }}</b>
        </a>
        <div class=" ml-auto ">
          <div
            class="sidenav-toggler d-none d-xl-block"
            :class="isPinned ? 'active' : ''"
            :data-action="isPinned ? 'sidenav-unpin' : 'sidenav-pin'"
            data-target="#sidenav-main"
          >
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-inner">
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
          <ul class="navbar-nav">
            <li
              class="nav-item"
              v-for="({ path, label, icon }, idx) of links"
              :key="idx"
            >
              <nuxt-link :to="path" custom v-slot="{ href, navigate }">
                <a
                  class="nav-link"
                  :class="{ active: isLinkActive(href) }"
                  @click="navigate"
                >
                  <i class="text-danger" :class="icon"></i>
                  <span class="hide-menu ml-2">{{ label }} </span>
                </a>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import links from "~/repository/links";

export default {
  data() {
    return {
      name: this.$config.name,
      isPinned: false,
      links: links,
    };
  },

  methods: {
    isLinkActive(path) {
      const routeName = this.$route.fullPath;

      let isActive;

      isActive = this.sanitize(routeName) == this.sanitize(path);

      return isActive;
    },

    sanitize(route) {
      return route
        .split("/")
        .filter((r) => r.trim())[0]
        .toLowerCase();
    },
  },

  mounted() {
    let navState = Cookies.get("sidenav-state");

    if (navState == undefined) {
      Cookies.set("sidenav-state", "pinned");
      navState = "pinned";
    }

    if ($(window).width() > 1200) {
      this.isPinned = navState == "pinned" ? true : false;
      $("body")
        .removeClass()
        .addClass(
          navState == "pinned"
            ? "g-sidenav-pinned g-sidenav-show"
            : "g-sidenav-hidden"
        );
    } else {
      $("body")
        .removeClass()
        .addClass("g-sidenav-hidden");
    }

    $(".scrollbar-inner")
      .scrollbar()
      .scrollLock();
  },
};
</script>

<style scoped>
.navbar-vertical .navbar-nav .nav-link {
  cursor: pointer;
}

.f25 {
  font-size: 35px;
}

.nav-link span {
  font-weight: 600;
}

.nav-link span {
  display: none !important;
}

.g-sidenav-show .nav-link span {
  white-space: initial;
  display: block !important;
}

.navbar-brand {
  display: none !important;
}

.g-sidenav-show .navbar-brand {
  display: block !important;
}

.nav-link {
  padding-right: 5px;
}
</style>
