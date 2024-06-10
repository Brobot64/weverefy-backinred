import components from "./components";
import paths from './paths';

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Weverefy API Doc",
    description: "Weverefy API Documentation",
    contact: {
      email: "weverefyContact@gmail.com",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
    version: "1.0.0-oas3",
  },
  servers: [
    {
      url: "http://localhost:5001",
    },
    {
      url: "https://acceede-marketplace.onrender.com",
    },
  ],

  tags: [
    {
      name: "Docs",
      description: "Get the docs",
    },
    {
      name: "Learner's Authentication",
      description: "Learner's Authentication api endpoints",
    },
    {
      name: "Account",
      description: "Accounts creation, ",
    },
  ],
  paths: paths,
  components: components,
};

export default swaggerDoc;
