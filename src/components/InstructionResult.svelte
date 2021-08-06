<script lang="ts">
  /**
   * This is an update of https://github.com/solpayments/solpayments-ui-demo/blob/master/src/components/TrasactionResult.svelte
   */

  import { onDestroy } from 'svelte';
  import { toasts } from 'svelte-toasts';
  import { RPC_API_URL, EXPLORER_URL } from '../helpers/config';
  import { transactionsMap, TxStatus } from '../stores/transaction';
  import { sleep } from '../helpers/utils';

  export let txTimeout = 1000 * 30;
  export let txCloseTimeout = 1000 * 10;
  export let txId: string | void;
  export let sideEffect: Promise<void> | null = null;
  export let baseMsg = txId
    ? `<br/><a class="toast-link" href="${EXPLORER_URL}/tx/${txId}?cluster=custom&customUrl=${RPC_API_URL}" target="_blank">View on Solana Explorer</a>`
    : '';

  const toast = toasts.add({
    description: `Loading, please wait...${baseMsg}`,
    duration: txTimeout,
    showProgress: true,
    theme: 'dark',
    type: 'info',
  });

  const removeToast = () => {
    if (toast.remove) {
      toast.remove();
    }
  };

  let txName = '';

  const unsubscribe = transactionsMap.subscribe((value) => {
    if (value && txId && value.get(txId)) {
      txName = value.get(txId)?.name || '';
      if (toast.update) {
        toast.update({
          description: baseMsg,
          title: `Processing ${txName}`,
        });
      }
    }
    if (value && txId && value.get(txId)?.status == TxStatus.Success) {
      if (toast.update) {
        toast.update({
          description: baseMsg,
          duration: txCloseTimeout,
          title: `${txName}`,
          type: 'success',
        });
        sleep(txCloseTimeout).then(() => removeToast());
      }
    } else if (value && txId && value.get(txId)?.status == TxStatus.Fail) {
      if (toast.update) {
        toast.update({
          description: baseMsg,
          title: `${txName}`,
          duration: txCloseTimeout,
          type: 'error',
        });
        sleep(txCloseTimeout).then(() => removeToast());
      }
    }
  });

  onDestroy(unsubscribe);
</script>

<main>
  {#if txId}
    {#if $transactionsMap.get(txId)?.status === TxStatus.Success}
      <!-- <p style="color: green">Success!</p> -->
      {#if sideEffect}
        {#await sideEffect}
          <p><!-- side effect loading --></p>
        {:then}
          <p><!-- side effect loaded --></p>
        {:catch}
          <p><!-- side effect load error --></p>
        {/await}
      {/if}
    {/if}
  {/if}
</main>
