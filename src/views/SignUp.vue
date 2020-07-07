<template>
  <div class="container">
    <form @submit.prevent="signup">
      <legend>Ingrese sus datos</legend>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          v-model="client.name"
          type="text"
          class="form-control"
          id="name"
          aria-describedby="nameHelp"
          placeholder="Enter name"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Telefono</label>
        <input
          v-model="client.phone"
          type="text"
          class="form-control"
          id="phone"
          aria-describedby="emailphone"
          placeholder="Enter phone"
          required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          v-model="client.email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
        <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu email con nadie</small>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="exampleInputPassword1">Password</label>
          <input
            v-model="client.password"
            type="password"
            class="form-control"
            id="pasword"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="exampleInputPassword1">Confirmar Password</label>
          <input
            v-model="client.confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword1"
            placeholder="Confirm Password"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Aceptar</button>
    </form>
    <br />
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
  </div>
</template>

<script>
import Joi from "joi";

const validationSchema = Joi.object().keys({
  name: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  phone: Joi.number().integer(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  }),
  password: Joi.string()
    .trim()
    .min(10)
    .required(),
  confirmPassword: Joi.string()
    .trim()
    .min(10)
    .required()
});

export default {
  data: () => ({
    errorMessage: "",
    client: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }),
  methods: {
    signup() {
      if (this.validUser()) {
        console.log(this.client);
      }
    },
    validUser() {
      if (this.client.password !== this.client.confirmPassword) {
        this.errorMessage = "Passwords must match. 🙈";
        return false;
      }

      const result = Joi.validate(this.client, validationSchema);

      if (result.error === null) {
        return true;
      }

      if (result.error.message.includes("name")) {
        this.errorMessage = "Name is invalid 😭";
      } else {
        this.errorMessage = "Password is invalid 🙈";
      }

      return false;
    }
  }
};
</script>
