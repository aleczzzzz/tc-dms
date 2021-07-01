<template>
  <nav
    class="navbar navbar-top navbar-expand navbar-light bg-secondary border-bottom"
  >
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Navbar links -->
        <ul class="navbar-nav align-items-center  ml-md-auto ">
          <li class="nav-item d-xl-none">
            <!-- Sidenav toggler -->
            <div
              class="pr-3 sidenav-toggler sidenav-toggler-light"
              data-action="sidenav-pin"
              data-target="#sidenav-main"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav align-items-center  ml-auto ml-md-0 ">
          <li class="nav-item dropdown user-area-dropdown">
            <a
              class="nav-link pr-0"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="media align-items-center">
                <div class="media-body ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm font-weight-bold user-area">
                    [{{ getRole }}] {{ getFullName }}
                  </span>
                </div>
                <div class="media-body ml-2 d-xs-block d-lg-none">
                  <span class="user-area">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
            </a>
            <div class="dropdown-menu  dropdown-menu-right ">
              <a class="dropdown-item" @click.prevent="goToProfile">
                <i class="fas fa-user"></i>
                <span>Profile</span>
              </a>
              <a class="dropdown-item" @click.prevent="logOut">
                <i class="fas fa-power-off"></i>
                <span>Logout</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      session: "auth/getSession",
    }),

    getRole() {
      return this.session.role.role;
    },

    getFullName() {
      return this.session.user.fullName;
    },
  },

  methods: {
    async logOut() {
      await this.$store.dispatch("auth/logOut");
    },

    goToProfile() {
      this.$router.push("/Profile");
    },
  },
};
</script>

<style scoped>
.user-area-dropdown .user-area:after {
  font-family: "Font Awesome 5 Free";
  font-weight: 700;
  font-style: normal;
  font-variant: normal;
  display: inline-block;
  margin-left: auto;
  content: "\f105";
  transition: all 0.15s ease;
  color: rgba(0, 0, 0, 0.6);
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  transform: rotate(90deg);
  margin-left: 5px;
}

.user-area-dropdown.show .user-area:after {
  transform: rotate(0);
}

a {
  cursor: pointer;
}
</style>
