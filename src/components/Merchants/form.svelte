<script lang="ts">
  import { Connection } from '@solana/web3.js';
  import { adapter, connected } from '../../stores';
  import { PROGRAM_ID, RPC_API_URL } from '../../helpers/config';
  import { CONFIRMED } from '../../helpers/constants';
  import { registerMerchant } from '../../solpayments/transactions';

  let seed: string;
  let data: undefined = undefined;
  let registrationProcessing = false;
  let hasError = false;
  let _registrationResultTxId: string | undefined = undefined;
  let registrationPromise: Promise<void | string> | null = null;

  const handleRegistrationPromise = () => {
    hasError = false;
    registrationProcessing = true;
    _registrationResultTxId = undefined;
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
            _registrationResultTxId = result.value;
            return result.value;
          })
          .finally(() => {
            registrationProcessing = false;
            // registrationPromise is supposed to be unset after checking the txid for success
            // we are doing it here for tests
            registrationPromise = null;
          })
      : null;
  };

  $: processing = (registrationPromise != null || registrationProcessing) && !hasError;

  /** ensure you can retry after an error */
  const setError = () => {
    hasError = true;
    return null;
  };
</script>

{#if $connected}
  <div class="row">
    <div class="col-lg-12">
      {#if registrationPromise}
        {#await registrationPromise}
          <p>registering merchant</p>
        {:then _txId}
          <p>dooooooooooooone</p>
          <!-- <TrasactionResult {txId} sideEffect={getMerchantOrBust($adapter)} /> -->
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
          />
        </div>
      </div>
    </div>
    <!-- end row -->
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
