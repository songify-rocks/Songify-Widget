<script lang="ts">
  import FontImport from "./lib/FontImport.svelte";
  import Main from "./lib/Main.svelte";
  const urlParams = new URLSearchParams(window.location.search);
  const isWidget = urlParams.has("widget");
</script>

<FontImport />
{#if isWidget}
  <p>Widget :)</p>
{:else}
  <Main />
{/if}
