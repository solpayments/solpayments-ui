<script lang="ts">
  import { onMount } from 'svelte';
  import { Connection } from '@solana/web3.js';
  import { PROGRAM_ID, RPC_API_URL } from '../../helpers/config';
  import { PROCESSED } from '../../helpers/constants';
  import { abbreviateAddress, onInterval, sleep } from '../../helpers/utils';
  import { adapter, connected } from '../../stores/index';
  import { getMerchantAccounts } from '../../solpayments/merchants';
  import { merchantAccounts } from '../../solpayments/stores';

  let merchantsPromise: Promise<any> | null = null;
  export let merchantsTimeout = 1000 * 30;

  const loadMerchants = () => {
    if ($adapter && $adapter.publicKey) {
      merchantsPromise = getMerchantAccounts({
        connection: new Connection(RPC_API_URL, PROCESSED),
        ownerKey: $adapter.publicKey,
        programId: PROGRAM_ID,
      }).then((result) => {
        sleep(1000).then(() => {
          merchantsPromise = null;
        });
        if (result.error) {
          throw result.error;
        } else {
          merchantAccounts.update(() => result.value || []);
        }
      });
    }
  };

  onInterval(() => loadMerchants(), merchantsTimeout);

  onMount(async () => {
    loadMerchants();
  });
</script>

<div class="row">
  <div class="col-xl-6">
    <div class="card card-height-100">
      <div class="card-body">
        {#if $connected}
          {#if merchantsPromise}
            {#await merchantsPromise}
              <p>loading merchants</p>
            {:catch _error}
              <p style="color: red">{_error}</p>
            {/await}
          {:else}
            <p>not loading merchants</p>
          {/if}

          <!-- {#if $merchantAccounts} -->
          <div class="float-end">
            <div class="dropdown">
              <a
                class="dropdown-toggle text-reset"
                href="#"
                id="dropdownMenuButton3"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="fw-semibold">Sort By:</span>
                <span class="text-muted">Recent<i class="mdi mdi-chevron-down ms-1" /></span>
              </a>

              <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton3">
                <a class="dropdown-item" href="#">Maximum</a>
                <a class="dropdown-item" href="#">Recent</a>
                <a class="dropdown-item" href="#">Minimum</a>
              </div>
            </div>
          </div>

          <h4 class="card-title mb-4">Accounts</h4>

          <div class="table-responsive">
            <table class="table align-middle table-striped table-nowrap mb-0">
              <tbody>
                {#each $merchantAccounts as merchantAccount}
                  <tr>
                    <td> {abbreviateAddress(merchantAccount.address.toBase58())} </td>
                    <td><i class="mdi mdi-checkbox-blank-circle text-success" /> Confirm </td>
                    <td> $14,584 </td>
                    <td> 5/12/2016 </td>
                    <td>
                      <a href="merchants.html" class="btn btn-light btn-sm waves-effect">
                        <i class="mdi mdi-square-edit-outline me-1" /> View</a
                      >
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <!-- {/if} -->
        {/if}
      </div>
    </div>
  </div>

  <div class="col-xl-6">
    <div class="card card-height-100">
      <div class="card-body">
        <h4 class="card-title mb-4">Create Account</h4>

        <div class="row">
          <div class="col-lg-12">
            <div class="mb-3">
              <label for="example-text-input" class="form-label">Text</label>
              <input
                class="form-control"
                type="text"
                value="Artisanal kale"
                id="example-text-input"
              />
            </div>
          </div>
        </div>
        <!-- end row -->
        <div class="row">
          <div class="col-lg-12">
            <div class="mb-3">
              <label for="example-email-input" class="form-label">Email</label>
              <input
                class="form-control"
                type="email"
                value="bootstrap@example.com"
                placeholder="Enter Email"
                id="example-email-input"
              />
            </div>
          </div>
        </div>
        <!-- end row -->
        <div class="row">
          <div class="col-lg-12">
            <div class="mb-3">
              <label for="example-email-input" class="form-label">Something else</label>
              <input
                class="form-control"
                type="email"
                value="bootstrap@example.com"
                placeholder="Enter Email"
                id="example-email-input2"
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
              <button class="btn btn-success w-lg" type="submit">Submit</button>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
    </div>
  </div>
</div>
<!-- end row -->
