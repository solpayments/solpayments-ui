<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Connection } from '@solana/web3.js';
  import { adapter, connected } from '../../../stores';
  import { PROGRAM_ID, RPC_API_URL } from '../../../helpers/config';
  import { CONFIRMED } from '../../../helpers/constants';
  import { registerMerchant } from '../../../solpayments/transactions';
  import { transactionsMap, TxStatus } from '../../../stores/transaction';
  import InstructionResult from '../../InstructionResult.svelte';
  import PackagesForm from './packages.svelte';

  export let sideEffect: Promise<void> | null = null;
  let seed: string;
  let data: undefined = undefined;
  let registrationProcessing = false;
  let hasError = false;
  let registrationResultTxId: string | undefined = undefined;
  let registrationPromise: Promise<void | string> | null = null;

  const unsubscribe = transactionsMap.subscribe((value) => {
    if (
      value &&
      registrationResultTxId &&
      value.get(registrationResultTxId)?.status != TxStatus.Unknown
    ) {
      registrationPromise = null;
    }
  });

  const handleRegistrationPromise = () => {
    hasError = false;
    registrationProcessing = true;
    registrationResultTxId = undefined;
    registrationPromise = $adapter
      ? registerMerchant({
          connection: new Connection(RPC_API_URL, CONFIRMED),
          data: data ? JSON.stringify(data) : undefined,
          seed,
          thisProgramId: PROGRAM_ID,
          wallet: $adapter,
        })
          .then((result) => {
            if (result.error) {
              throw result.error;
            }
            registrationResultTxId = result.value;
            return result.value;
          })
          .finally(() => {
            registrationProcessing = false;
            seed = '';
          })
      : null;
  };

  $: processing = (registrationPromise != null || registrationProcessing) && !hasError;

  /** ensure you can retry after an error */
  const setError = () => {
    hasError = true;
    return null;
  };

  onDestroy(unsubscribe);
</script>

{#if $connected}
  <div class="row">
    <div class="col-lg-12">
      {#if registrationPromise}
        {#await registrationPromise}
          <p>registering merchant</p>
        {:then txId}
          <InstructionResult {txId} {sideEffect} />
        {:catch error}
          <!-- TODO: find better way to call this func, as this way is frowned upon in svelte-world-->
          {setError() || ''}
          <p style="color: red">{error}</p>
        {/await}
      {/if}
    </div>
  </div>

  <div class="register-merchant-account">
    <div class="row">
      <div class="col-lg-12">
        <div class="mb-3">
          <label for="merchant-seed" class="form-label">Seed</label>
          <input
            class="form-control"
            type="text"
            bind:value={seed}
            name="seed"
            id="merchant-seed"
            disabled={processing}
          />
        </div>
      </div>
    </div>
    <!-- end row -->
    <PackagesForm /><!-- end row -->
    <div class="row">
      <div class="col-lg-6">
        <div class="mb-3">
          <button class="btn btn-light w-lg" type="submit">Cancel</button>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="mb-3">
          <button
            on:click={() => handleRegistrationPromise()}
            disabled={processing}
            class="btn btn-success w-lg"
            type="button"
            >{#if processing}Creating Account{:else}Create Account{/if}</button
          >
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
{/if}
