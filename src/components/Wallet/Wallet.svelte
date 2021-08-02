<script lang="ts">
  import { adapter, connected } from '../../stores';
  import { connectToWallet } from '../../helpers/wallet';

  const afterAction = () => {
    const modalButton = document.getElementById('connectModalButton');
    if (modalButton) {
      modalButton.click();
    }
  };

  let promise: Promise<void> | null;
  const handleConnect = () => {
    promise = connectToWallet().then(() => {
      promise = null;
      afterAction();
    });
  };
  const handleDisconnect = () => {
    promise = null;
    adapter.update(() => undefined);
    afterAction();
  };
</script>

{#if !$connected}
  <button class="btn btn-outline-primary" type="button" on:click={() => handleConnect()}>
    Connect
  </button>
{/if}

{#if !$connected && promise != null}
  {#await promise}
    <!-- connecting -->
  {:then _pubkey}
    <!-- Connected to {$adapter && $adapter.publicKey} -->
  {:catch error}
    <!-- {error} -->
  {/await}
{/if}

{#if $connected}
  <button class="btn btn-outline-primary" type="button" on:click={() => handleDisconnect()}>
    Disconnect
  </button>
{/if}
