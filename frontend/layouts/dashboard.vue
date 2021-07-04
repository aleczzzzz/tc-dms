<template>
  <div v-if="session != null">
    <Sidebar />
    <div class="main-content" id="panel">
      <Topbar />
      <Header />
      <div class="container-fluid mt--6">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "dashboard-layout",

  data() {
    return {
      popoverInstance: null,
      intervalInstance: null,
      intervalCountdownInstance: null,
      remainingSecondsBeforePopUp: 300,
    };
  },

  watch: {
    getToken: {
      immediate: true,
      handler() {
        this.intervalInstance = setInterval(this.checkTokenExpiry, 1000);
      },
    },
  },

  computed: {
    ...mapGetters({
      session: "auth/getSession",
    }),

    getToken() {
      return this.session.tokenExpiresAt;
    },
  },

  methods: {
    getTimeRemaining() {
      const currentTime = moment();
      const expiryTime = moment(this.getToken, "X").local();
      const timeRemaining = expiryTime.diff(currentTime, "seconds");
      const timeRemainingReadable = `${~~(
        timeRemaining / 60
      )}:${`${timeRemaining % 60}`.padStart(2, "0")}`;

      return { timeRemaining, timeRemainingReadable };
    },

    popoverSessionContent(remainingTime) {
      return `Logging out in ${remainingTime}`;
    },

    getCountdown: function() {
      const { timeRemaining, timeRemainingReadable } = this.getTimeRemaining();
      let message;

      if (timeRemaining < 0) {
        this.$store.dispatch("auth/getSession");
        message = "Logging out...";
        this.removeCountdownInterval("intervalCountdownInstance");

        this.popoverInstance.$$reconnect.hide();
        this.popoverInstance.$$logout.hide();
      } else message = this.popoverSessionContent(timeRemainingReadable);

      this.popoverInstance.setContent(message);
    },

    removeCountdownInterval(itervalInstance) {
      clearInterval(this[itervalInstance]);
      this[itervalInstance] = null;
    },

    checkTokenExpiry: function() {
      const vm = this;
      const { timeRemaining, timeRemainingReadable } = vm.getTimeRemaining();

      if (
        timeRemaining <= vm.remainingSecondsBeforePopUp &&
        vm.popoverInstance == null
      )
        vm.popoverInstance = vm.$popover.show(
          {
            title: "SESSION IS ABOUT TO END",
            content: vm.popoverSessionContent(timeRemainingReadable),
            onOpenBefore() {
              vm.intervalCountdownInstance = setInterval(vm.getCountdown, 1000);
            },
            buttons: {
              reconnect: {
                text: "reconnect",
                btnClass: "btn-success",
                action() {
                  const jc = this;
                  vm.$store.dispatch("auth/reconnect").then(({ status }) => {
                    if (status == 200) {
                      vm.removeCountdownInterval("intervalInstance");
                      vm.removeCountdownInterval("intervalCountdownInstance");
                      vm.popoverInstance = null;
                      jc.close();
                    }
                  });
                },
              },
              logout: {
                text: "logout",
                btnClass: "btn-danger",
                action() {
                  vm.removeCountdownInterval("intervalCountdownInstance");
                  vm.$store.dispatch("auth/logOut");
                },
              },
            },
          },
          "warning"
        );
    },
  },

  destroyed() {
    this.removeCountdownInterval("intervalInstance");
  },
};
</script>

<style>
.form-control[readonly] {
  background-color: #fff;
}

.form-control {
  color: #000 !important;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #eee;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
}

::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}

.table-responsive table th {
  font-weight: bold;
  font-size: 13px;
}
</style>
