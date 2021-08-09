<script lang="ts">
  import { WRAPPED_SOL_MINT } from '../../../helpers/solana';
  import { forHumans } from '../../../helpers/utils';

  const defaultMint = WRAPPED_SOL_MINT.toBase58();

  $: items = [
    { duration: 60 * 10, mint: defaultMint, name: 'daily', price: 0.1, trial: 0 },
    { duration: 60 * 60 * 24 * 30, mint: defaultMint, name: 'monthly', price: 0.2, trial: 0 },
    { duration: 60 * 60 * 24 * 365, mint: defaultMint, name: 'yearly', price: 2, trial: 0 },
  ];

  function add() {
    items = items.concat({
      duration: 60 * 10,
      mint: defaultMint,
      name: '',
      price: 100000000,
      trial: 0,
    });
  }

  function remove(index: number) {
    if (index > -1) {
      items.splice(index, 1);
    }
    // no idea why this line is necessary but without it items does not update
    items = items;
  }
</script>

<div class="row">
  <div class="col-lg-12">
    <h5>Subscription packages</h5>
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Trial Period (seconds)</th>
            <th>Duration (seconds)</th>
            <th>Price</th>
            <td />
          </tr>
        </thead>
        <tbody>
          {#each items as item, itemIndex}
            <tr>
              <td>
                <input
                  class="form-control"
                  name="name"
                  type="text"
                  bind:value={item.name}
                  required={true}
                />
                <p>&nbsp;</p>
              </td>
              <td>
                <input
                  class="form-control"
                  name="trial"
                  type="number"
                  min="0"
                  bind:value={item.trial}
                  required={true}
                />
                <p>{forHumans(item.trial)}&nbsp;</p>
              </td>
              <td>
                <input
                  class="form-control"
                  name="duration"
                  type="number"
                  min="0"
                  bind:value={item.duration}
                  required={true}
                />
                <p>{forHumans(item.duration)}&nbsp;</p>
              </td>
              <td>
                <div class="row">
                  <div class="col">
                    <input
                      class="form-control"
                      name="price"
                      type="number"
                      min="0"
                      bind:value={item.price}
                      required={true}
                    />
                  </div>
                  <div class="col">
                    <select class="form-control" name="mint" bind:value={item.mint} required={true}>
                      <!-- {#if $tokenMap}
                    {#each Array.from($tokenMap.values()) as token}
                      <option value={token.address}>{token.symbol}</option>
                    {/each}
                  {/if} -->
                    </select>
                  </div>
                </div>
                <p>&nbsp;</p></td
              >
              <td>
                <button class="btn" on:click={() => remove(itemIndex)}> remove </button>
                <p>&nbsp;</p>
              </td>
            </tr>
          {/each}
          <tr class="clearfix">
            <td colspan="3">
              <button class="btn" on:click={add}> Add Item </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
