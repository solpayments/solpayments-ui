<script lang="ts">
  import SolletConnector from '../Wallet/Wallet.svelte';
  import SolpaymentsToast from '../Toast.svelte';
  import { ToastContainer } from 'svelte-toasts';
</script>

<footer class="footer">
  <div class="container-fluid">
    <div class="row fs-5">
      <div class="col-sm-6">
        {new Date().getFullYear()} © SolPayments
      </div>
      <div class="col-sm-6">
        <div class="text-sm-end d-none d-sm-block pe-4">
          <a href="https://twitter.com/SolPayments" title="Twitter"><i class="fab fa-twitter" /></a>
          <a href="tg://join?invite=8gaaqfacV00xODE0" title="Telegram"
            ><i class="fab fa-telegram-plane" /></a
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div>
        <!-- Connect Modal -->
        <div
          class="modal fade"
          id="connectModal"
          tabindex="-1"
          aria-labelledby="connectModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="connectModalLabel">Connect Your Wallet</h5>
                <button
                  type="button"
                  id="connectModalButton"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div class="modal-body">
                <div class="d-grid gap-2">
                  <SolletConnector />
                  <button class="btn btn-outline-secondary disabled" type="button"
                    >Phantom (coming soon)</button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- toasts container -->
        <ToastContainer let:data>
          <SolpaymentsToast {data} />
        </ToastContainer>
      </div>
    </div>
  </div>
</footer>
