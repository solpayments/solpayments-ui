<script lang="ts"></script>
<header id="page-topbar">
    <div class="navbar-header">
        <div class="d-flex">
            <!-- LOGO -->
            <div class="navbar-brand-box">
                <a href="index.html" class="logo logo-dark">
                    <span class="logo-sm">
                        <img src="/assets/images/logo-sm.png" alt="" height="22">
                    </span>
                    <span class="logo-lg">
                        <img src="/assets/images/logo-dark.png" alt="" height="23">
                    </span>
                </a>

                <a href="index.html" class="logo logo-light">
                    <span class="logo-sm">
                        <img src="/assets/images/logo-sm.png" alt="" height="22">
                    </span>
                    <span class="logo-lg">
                        <img src="/assets/images/logo-light.png" alt="" height="23">
                    </span>
                </a>
            </div>

            <button type="button" class="btn btn-sm px-3 font-size-16 vertinav-toggle header-item waves-effect"
                id="vertical-menu-btn">
                <i class="mdi mdi-view-headline"></i>
            </button>

            <button type="button"
                class="btn btn-sm px-3 font-size-16 horinav-toggle header-item waves-effect waves-light"
                data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <i class="mdi mdi-view-headline"></i>
            </button>
        </div>

        <div class="d-flex">
            <div class="dropdown d-none d-lg-inline-block ms-1">
                <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                    <i class="mdi mdi-fullscreen"></i>
                </button>
            </div>

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item noti-icon waves-effect"
                    id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i class="mdi mdi-bell"></i>
                    <span class="badge bg-danger rounded-pill">3</span>
                </button>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-notifications-dropdown">
                    <div class="p-3">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="m-0"> Notifications </h6>
                            </div>
                            <div class="col-auto">
                                <a href="#" class="small" key="t-view-all"> View All</a>
                            </div>
                        </div>
                    </div>
                    <div data-simplebar style="max-height: 230px;">
                        <a href="" class="text-reset notification-item d-block active">
                            <div class="d-flex">
                                <div class="avatar-xs me-3">
                                    <span class="avatar-title bg-primary rounded-circle font-size-16">
                                        <i class="bx bx-cart"></i>
                                    </span>
                                </div>
                                <div class="flex-1">
                                    <h6 class="mt-0 mb-1" key="t-your-order">Your order is placed</h6>
                                    <div class="font-size-13 text-muted">
                                        <p class="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                        <p class="mb-0 font-size-12"><i class="mdi mdi-clock-outline"></i> <span
                                                key="t-min-ago">3 min ago</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="" class="text-reset notification-item d-block ">
                            <div class="d-flex">
                                <div class="avatar-xs me-3">
                                    <span class="avatar-title bg-info rounded-circle font-size-16">
                                        <i class="bx bx-cart"></i>
                                    </span>
                                </div>
                                <div class="flex-1">
                                    <h6 class="mt-0 mb-1">James Lemire</h6>
                                    <div class="font-size-13 text-muted">
                                        <p class="mb-1" key="t-simplified">It will seem like simplified English.</p>
                                        <p class="mb-0 font-size-12"><i class="mdi mdi-clock-outline"></i> <span
                                                key="t-hours-ago">1 hours ago</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="" class="text-reset notification-item d-block ">
                            <div class="d-flex">
                                <div class="avatar-xs me-3">
                                    <span class="avatar-title bg-success rounded-circle font-size-16">
                                        <i class="bx bx-badge-check"></i>
                                    </span>
                                </div>
                                <div class="flex-1">
                                    <h6 class="mt-0 mb-1" key="t-shipped">Your item is shipped</h6>
                                    <div class="font-size-13 text-muted">
                                        <p class="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                        <p class="mb-0 font-size-12"><i class="mdi mdi-clock-outline"></i> <span
                                                key="t-min-ago">3 hours ago</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a href="" class="text-reset notification-item d-block ">
                            <div class="d-flex">
                                <div class="avatar-xs me-3">
                                    <span class="avatar-title bg-warning rounded-circle font-size-16">
                                        <i class="bx bx-cart"></i>
                                    </span>
                                </div>
                                <div class="flex-1">
                                    <h6 class="mt-0 mb-1">Salena Layfield</h6>
                                    <div class="font-size-13 text-muted">
                                        <p class="mb-1" key="t-occidental">As a skeptical Cambridge friend of mine
                                            occidental.</p>
                                        <p class="mb-0 font-size-12"><i class="mdi mdi-clock-outline"></i> <span
                                                key="t-hours-ago">10 hours ago</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="p-2 border-top d-grid">
                        <a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                            <i class="mdi mdi-arrow-right-circle me-1"></i> <span>View More..</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="mdi mdi-account-circle fs-2 align-middle me-1"></i>
                    <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                    <!-- item-->
                    <h6 class="dropdown-header">44fVncfVm5fB8VsRBwVZW75FdR1nSVUKcf9nUa4ky6qN</h6>
                    <a class="dropdown-item" href="#"><i
                            class="mdi mdi-wallet text-muted font-size-16 align-middle me-1"></i> <span
                            class="align-middle" key="t-balance">Balance : <b>$1901.67</b></span></a>

                    <div class="dropdown-divider"></div>

                    <div class="dropdown-item">
                        <div class="col-sm-6 mb-1">
                            <span class="me-2"><i class="mdi mdi-weather-sunny text-muted font-size-16 align-middle me-1"></i></span>
                            <!-- </div>
                        <div class="col-sm-6"> -->
                            <input class="form-check-input" type="radio" name="layout-mode" id="layout-mode-light"
                                value="light" onchange="document.body.setAttribute('data-layout-mode', 'light')">
                            <label class="form-check-label me-2" for="layout-mode-light">Light</label>
                            <input class="form-check-input" type="radio" name="layout-mode" id="layout-mode-dark"
                                value="dark" onchange="document.body.setAttribute('data-layout-mode', 'dark')">
                            <label class="form-check-label" for="layout-mode-dark">Dark</label>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#"><i
                            class="mdi mdi-logout text-muted font-size-16 align-middle me-1"></i> <span
                            class="align-middle" key="t-logout">Disconnect</span></a>
                </div>
            </div>

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item waves-effect" data-bs-toggle="modal" data-bs-target="#connectModal">
                    <i class="mdi mdi-wallet fs-2 align-middle"></i> Connect
                </button>
            </div>

        </div>
    </div>
</header>