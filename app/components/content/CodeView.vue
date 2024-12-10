<template>
  <div class="max-h-96 y-custom-code overflow-auto text-sm">
    <slot />
  </div>
</template>

<style>
.y-custom-code {
  pre {
    border: none!important;
    border-radius: 0!important;
    margin: 0!important;
  }
}
</style>
