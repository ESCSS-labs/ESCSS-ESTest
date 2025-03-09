import { defineNuxtModule, addImports, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "nuxt-escss-estest",
    configKey: "nuxt-escss-estest",
  },

  setup() {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addImports({
      name: "ESTest", // name of the composable to be used
      from: resolver.resolve("./runtime/composable"), // path of composable
    });
  },
});
