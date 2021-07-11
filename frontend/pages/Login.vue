<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-4 login-section-wrapper">
          <div class="brand-wrapper">
            CSD - VIRTUAL LIBRARY
          </div>
          <div class="login-wrapper my-auto">
            <h1 class="login-title">LOG IN</h1>
            <form action="#!">
              <div class="form-group">
                <label for="email">USERNAME</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="username"
                  @keyup.enter.prevent="logIn"
                />
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  @keyup.enter.prevent="logIn"
                />
              </div>
              <input
                name="login"
                id="login"
                class="btn btn-block login-btn"
                type="button"
                value="LOGIN"
                @enter.prevent="logIn"
                @click.prevent="logIn"
              />
            </form>
          </div>
        </div>
        <div class="col-sm-8 px-0 d-none d-sm-block">
          <img src="/img/dms-login.png" alt="login image" class="login-img" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    async logIn() {
      const { username, password } = this;

      const payload = {
        username,
        password,
      };

      const { status, message } = await this.$store.dispatch(
        "auth/logIn",
        payload
      );

      status != 200 &&
        this.$popover.show(
          {
            title: "Failed to log in",
            content: this.$serializer.formatMessages(message),
          },
          "warning"
        );
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Karla", sans-serif;
  background-color: #fff;
  min-height: 100vh;
}

.brand-wrapper {
  padding-top: 7px;
  padding-bottom: 8px;
  font-weight: bold;
  font-size: 30px;
  color: #000;
}

.brand-wrapper .logo {
  height: 25px;
}

.login-section-wrapper {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding: 68px 100px;
  background-color: #fff;
}

@media (max-width: 991px) {
  .login-section-wrapper {
    padding-left: 50px;
    padding-right: 50px;
  }
}

@media (max-width: 575px) {
  .login-section-wrapper {
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 100vh;
  }
}

.login-wrapper {
  width: 300px;
  max-width: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
}

@media (max-width: 575px) {
  .login-wrapper {
    width: 100%;
  }
}

.login-wrapper label {
  font-size: 14px;
  font-weight: bold;
  color: #b0adad;
}

.login-wrapper .form-control {
  border: none;
  border-bottom: 1px solid #e7e7e7;
  border-radius: 0;
  padding: 9px 5px;
  min-height: 40px;
  font-size: 18px;
  font-weight: normal;
}

.login-wrapper .form-control::-webkit-input-placeholder {
  color: #b0adad;
}

.login-wrapper .form-control::-moz-placeholder {
  color: #b0adad;
}

.login-wrapper .form-control:-ms-input-placeholder {
  color: #b0adad;
}

.login-wrapper .form-control::-ms-input-placeholder {
  color: #b0adad;
}

.login-wrapper .form-control::placeholder {
  color: #b0adad;
}

.login-wrapper .login-btn {
  padding: 13px 20px;
  background-color: rgb(220, 220, 220);
  border-radius: 0;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 14px;
}

.login-wrapper .login-btn:hover {
  border: 1px solid rgb(220, 220, 220);
  background-color: #fff;
  color: #000;
}

.login-wrapper a.forgot-password-link {
  color: #080808;
  font-size: 14px;
  text-decoration: underline;
  display: inline-block;
  margin-bottom: 54px;
}

@media (max-width: 575px) {
  .login-wrapper a.forgot-password-link {
    margin-bottom: 16px;
  }
}

.login-wrapper-footer-text {
  font-size: 16px;
  color: #000;
  margin-bottom: 0;
}

.login-title {
  font-size: 30px;
  color: #000;
  font-weight: bold;
  margin-bottom: 25px;
}

.login-img {
  width: 100%;
  height: 100vh;
  -o-object-fit: fill;
  object-fit: fill;
}

.form-control {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(220, 220, 220);
}
</style>
