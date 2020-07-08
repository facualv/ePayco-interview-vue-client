<template>
  <div class="container">
    <form @submit.prevent="login">
      <legend>Ingrese a su cuenta</legend>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          v-model="loginCredentials.email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
        <small id="emailHelp" class="form-text text-muted"
          >Nunca compartiremos tu email con nadie</small
        >
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="exampleInputPassword1">Password</label>
          <input
            v-model="loginCredentials.password"
            type="password"
            class="form-control"
            id="pasword"
            placeholder="Password"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Aceptar</button>
    </form>
    <br />
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
  import Joi from 'joi';
  import { loginValidationSchema } from '../helpers/validation.helper';

  export default {
    data: () => ({
      errorMessage: '',
      loginCredentials: {
        email: '',
        password: ''
      }
    }),
    methods: {
      login() {
        this.errorMessage = '';
        if (this.validLogin()) {
          const body = {
            email: this.loginCredentials.email,
            password: this.loginCredentials.password
          };
          fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'content-type': 'application/json'
            }
          }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          });
        }
      },
      validLogin() {
        const result = Joi.validate(this.loginCredentials, loginValidationSchema());

        if (result.error === null) {
          return true;
        }
        if (result.error.message.includes('name')) {
          this.errorMessage = 'Name is invalid 😭';
        } else {
          this.errorMessage = 'Password is invalid 🙈';
        }
        return false;
      }
    }
  };
</script>
