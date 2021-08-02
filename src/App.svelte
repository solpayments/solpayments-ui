<script lang="ts">
  import { onMount } from 'svelte';
  import { RPC_API_URL } from './helpers/config';
  import { solanaNetwork } from './stores';
  import { getTokenRegistry } from './stores/tokenRegistry';
  import Topbar from './components/partials/Topbar.svelte';
  import Horizontal from './components/partials/Horizontal.svelte';
  import PageTitle from './components/partials/PageTitle.svelte';
  import Footer from './components/partials/Footer.svelte';
  import MerchantList from './components/Merchants/index.svelte';

  solanaNetwork.update(() => RPC_API_URL);
  onMount(async () => getTokenRegistry());
</script>

<!-- Begin page -->
<div id="layout-wrapper">
  <Topbar />
  <Horizontal />
  <!-- ============================================================== -->
  <!-- Start right Content here -->
  <!-- ============================================================== -->
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <PageTitle />
        <MerchantList />
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->
    <Footer />
  </div>
  <!-- end main content-->
</div>
<!-- END layout-wrapper -->
