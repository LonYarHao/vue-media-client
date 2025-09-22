<template>
  <div class="d-flex justify-content-center mt-3">
    <button
      class="btn bg-primary mx-2 text-white btn-sm"
      @click="home()"
      v-if="!tokenStatus"
    >
      Home
    </button>
    <button
      class="btn bg-dark mx-2 text-white btn-sm"
      @click="login()"
      v-if="!tokenStatus"
    >
      Login
    </button>
    <button class="btn bg-dark mx-2 text-white btn-sm" @click="logout()" v-else>
      Logout
    </button>
  </div>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="col-lg-5 col-md-6 col-sm-8 col-11">
      <div class="card shadow-lg p-5 rounded-4 mt-4 mb-4">
        <div class="alert alert-danger" role="alert" v-if="userStatus">
          This credential do not match !
        </div>
        <h2 class="text-center mb-4">Login</h2>

        <div class="mb-4">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control p-3"
            id="email"
            placeholder="Enter your email"
            required
            v-model="userData.email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control p-3"
            id="password"
            placeholder="Enter your password"
            required
            v-model="userData.password"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary text-white rounded shadow-sm p-3"
          @click="accountLogin()"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script src="../js/login.js"></script>
