<template>
  <div>
     <!-- header -->
    <div id="header">
        <div class="container">
            <div class="row">
                <!-- logo -->
                <div class="col-6 col-lg-2">
                    <h1 id="logo">
                        <nuxt-link :to="{ name: 'home' }">
                            <img src="~/assets/front/images/logo.png" alt="نفائس الألماس">
                            <img class="logo-ms" src="~/assets/front/images/logo-ms.png" alt="نفائس الألماس">
                        </nuxt-link>
                    </h1>
                </div>
                <div class="col-6 col-lg-10">
                    <div class="row">
                        <!-- links -->
                        <div class="col-12" id="top">
                            <ul class="links">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="info-24px" width="19.683"
                                        height="19.683" viewBox="0 0 19.683 19.683">
                                        <path id="Path_3985" data-name="Path 3985" d="M0,0H19.683V19.683H0Z"
                                            fill="none" />
                                        <path id="Path_3986" data-name="Path 3986"
                                            d="M10.2,2a8.2,8.2,0,1,0,8.2,8.2A8.2,8.2,0,0,0,10.2,2Zm.82,12.3H9.381V9.381h1.64Zm0-6.561H9.381V6.1h1.64Z"
                                            transform="translate(-0.36 -0.36)" fill="#fcfcfc" />
                                    </svg>
                                    <a href="about.html">من نحن</a>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20.231" height="20.231"
                                        viewBox="0 0 20.231 20.231">
                                        <g id="phone_enabled-24px" transform="translate(0 2.766) rotate(-9)">
                                            <path id="Path_3987" data-name="Path 3987" d="M0,0H17.683V17.683H0Z"
                                                fill="none" />
                                            <path id="Path_3988" data-name="Path 3988"
                                                d="M13.595,8.739,11.974,7.119a.739.739,0,0,1-.184-.752,8.37,8.37,0,0,0,.42-2.63A.739.739,0,0,1,12.946,3h2.579a.739.739,0,0,1,.737.737A12.524,12.524,0,0,1,3.737,16.262.739.739,0,0,1,3,15.525V12.954a.739.739,0,0,1,.737-.737,8.4,8.4,0,0,0,2.63-.42.733.733,0,0,1,.752.177l1.621,1.621a11.161,11.161,0,0,0,4.855-4.855Z"
                                                transform="translate(-0.79 -0.79)" fill="#fcfcfc" />
                                        </g>
                                    </svg>
                                    <a href="contactus.html">إتصل بنا</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div id="bottom-top" class="col-12">
                            <!-- search -->
                            <div class="search">
                                <div class="search-ms-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
                                        <g id="icon_search" fill="none" stroke-miterlimit="10">
                                            <path
                                                d="M20.982,22.654l-6-6a9.3,9.3,0,1,1,1.672-1.672l6,6a1.182,1.182,0,0,1-1.672,1.672Z"
                                                stroke="none" />
                                            <path
                                                d="M 9.296999931335449 16.59399795532227 C 10.92874050140381 16.59399795532227 12.47124004364014 16.06777763366699 13.75774002075195 15.07222747802734 L 14.49879550933838 14.49876117706299 L 15.07221984863281 13.75774765014648 C 16.06777954101563 12.4712381362915 16.5939998626709 10.92873764038086 16.5939998626709 9.296998023986816 C 16.5939998626709 5.273417949676514 13.32058048248291 1.999997735023499 9.296999931335449 1.999997735023499 C 5.273420333862305 1.999997735023499 2.000000238418579 5.273417949676514 2.000000238418579 9.296998023986816 C 2.000000238418579 13.32057762145996 5.273420333862305 16.59399795532227 9.296999931335449 16.59399795532227 M 21.81780052185059 23.00017738342285 C 21.51517105102539 23.00017738342285 21.21255111694336 22.8847484588623 20.9817008972168 22.65389823913574 L 14.98173999786377 16.65393829345703 C 13.41005992889404 17.87017822265625 11.43805027008057 18.59399795532227 9.296999931335449 18.59399795532227 C 4.162500381469727 18.59399795532227 2.929687639152689e-07 14.43149757385254 2.929687639152689e-07 9.296998023986816 C 2.929687639152689e-07 4.162497520446777 4.162500381469727 -2.261962890770519e-06 9.296999931335449 -2.261962890770519e-06 C 14.43150043487549 -2.261962890770519e-06 18.5939998626709 4.162497520446777 18.5939998626709 9.296998023986816 C 18.5939998626709 11.43804740905762 17.87018013000488 13.41005802154541 16.65394020080566 14.9817476272583 L 22.65390014648438 20.98169708251953 C 23.1156005859375 21.44339752197266 23.1156005859375 22.19219779968262 22.65390014648438 22.65389823913574 C 22.42304992675781 22.8847484588623 22.12042999267578 23.00017738342285 21.81780052185059 23.00017738342285 Z"
                                                stroke="none" fill="#ededed" />
                                        </g>
                                    </svg>
                                </div>
                                <form @submit.prevent="handleSearch">
                                    <div class="form-group group-icon search">
                                        <input type="text" v-model="publicSearch" class="form-control" placeholder="ما الذى تبحث عنه؟">
                                        <div class="icon" @click="handleSearch">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18.65" height="20.244"
                                                viewBox="0 0 18.65 20.244">
                                                <g id="search_icon" data-name="search icon"
                                                    transform="translate(0.15 0.15)">
                                                    <path id="Path_1514" data-name="Path 1514"
                                                        d="M7.289,15.887C3.263,15.887,0,12.331,0,7.944S3.263,0,7.289,0s7.289,3.556,7.289,7.944-3.265,7.94-7.289,7.944Zm0-14.2A6.012,6.012,0,0,0,1.551,7.944,6.012,6.012,0,0,0,7.289,14.2a6.012,6.012,0,0,0,5.738-6.254A6.019,6.019,0,0,0,7.289,1.69Z"
                                                        transform="translate(0 0)" fill="#f4f4fa" stroke="#292929"
                                                        stroke-width="0.3" />
                                                    <path id="Path_1515" data-name="Path 1515"
                                                        d="M42.252,43.673a.741.741,0,0,1-.549-.247l-5.629-6.135a.9.9,0,0,1,0-1.2.732.732,0,0,1,1.1,0L42.8,42.23a.907.907,0,0,1,0,1.2A.741.741,0,0,1,42.252,43.673Z"
                                                        transform="translate(-24.729 -23.73)" fill="#f4f4fa"
                                                        stroke="#292929" stroke-width="0.3" />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- login & shopping cart -->
                            <div class="links">
                                <ul>
                                    <li v-if="!authUser">
                                        <nuxt-link :to="{ name: 'login' }" class="dropdown-toggle" id="navbarDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span>{{ $t('front.login_or_register') }}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25.528" height="28.519"
                                                viewBox="0 0 25.528 28.519">
                                                <g id="user" transform="translate(-24.165)">
                                                    <path id="Path_3742" data-name="Path 3742"
                                                        d="M118.2,0a7.4,7.4,0,1,0,7.4,7.4A7.424,7.424,0,0,0,118.2,0Z"
                                                        transform="translate(-81.265)" fill="#fafafa" />
                                                    <path id="Path_3743" data-name="Path 3743"
                                                        d="M49.638,253.228a6.9,6.9,0,0,0-.744-1.358,9.2,9.2,0,0,0-6.37-4.01,1.363,1.363,0,0,0-.938.226,7.893,7.893,0,0,1-9.312,0,1.213,1.213,0,0,0-.938-.226,9.137,9.137,0,0,0-6.37,4.01,7.959,7.959,0,0,0-.744,1.358.688.688,0,0,0,.032.614,12.9,12.9,0,0,0,.873,1.293,12.287,12.287,0,0,0,1.487,1.681,19.378,19.378,0,0,0,1.487,1.293,14.745,14.745,0,0,0,17.59,0,14.215,14.215,0,0,0,1.487-1.293,14.931,14.931,0,0,0,1.487-1.681,11.336,11.336,0,0,0,.873-1.293A.552.552,0,0,0,49.638,253.228Z"
                                                        transform="translate(0 -232.502)" fill="#fafafa" />
                                                </g>
                                            </svg>
                                        </nuxt-link>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <h5 class="title">{{ $t('front.nafaes_client') }}</h5>
                                            <nuxt-link class="btn simple" :to="{ name: 'login' }">
                                              {{ $t('front.login') }}
                                            </nuxt-link>
                                            <div class="dropdown-divider"></div>
                                            <span>{{ $t('front.not_have_account') }}</span>
                                            <nuxt-link class="dropdown-item active" :to="{ name: 'register' }">
                                              {{ $t('front.register') }}
                                            </nuxt-link>
                                        </div>
                                    </li>
                                    <li v-else class="profile-menu-dropdown">
                                        <a class="dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false" href="#">
                                            {{ $t('front.profile') }}
                                            </a>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <ul>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Icon_Edit-Profile"
                                                        width="40" height="40" viewBox="0 0 40 40">
                                                        <path id="Path_3751" data-name="Path 3751"
                                                            d="M4,0H36a4,4,0,0,1,4,4V36a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z"
                                                            fill="rgba(101,24,54,0.04)" />
                                                        <g id="Group_188" data-name="Group 188"
                                                            transform="translate(13 10.002)">
                                                            <g id="Group_186" data-name="Group 186"
                                                                transform="translate(0.046 -0.002)">
                                                                <path id="Path_11" data-name="Path 11"
                                                                    d="M14.147,2.856,10.8.244a1.117,1.117,0,0,0-1.592.2l-7.714,9.8a.906.906,0,0,0-.2.449L.148,15.549a1.064,1.064,0,0,0,.408,1.143,1.184,1.184,0,0,0,1.224.122L6.229,14.57a1.6,1.6,0,0,0,.408-.327l7.714-9.755A1.2,1.2,0,0,0,14.147,2.856Zm-8.979,10L2.6,14.162l.653-2.816L7.78,5.59,9.7,7.1Zm5.755-7.347L9,4,10.27,2.407l1.918,1.51Z"
                                                                    transform="translate(-0.112 0.002)" fill="#111" />
                                                            </g>
                                                            <g id="Group_187" data-name="Group 187"
                                                                transform="translate(0 17.957)">
                                                                <path id="Path_12" data-name="Path 12"
                                                                    d="M13.265,46.041H1.02A1.01,1.01,0,0,1,0,45.02H0A1.01,1.01,0,0,1,1.02,44H13.265a1.01,1.01,0,0,1,1.02,1.02h0A1.01,1.01,0,0,1,13.265,46.041Z"
                                                                    transform="translate(0 -44)" fill="#651836" />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                    <a href="profile.html">الملف الشخصى</a>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Icon_Location" width="40"
                                                        height="40" viewBox="0 0 40 40">
                                                        <rect id="BG" width="40" height="40" rx="5" fill="#f9f6f7" />
                                                        <g id="Group_185" data-name="Group 185"
                                                            transform="translate(13 10)">
                                                            <path id="Path_9" data-name="Path 9"
                                                                d="M10.259,13.972a.988.988,0,0,0,1.357-.4c1.277-2.475,2.355-5.03,2.355-6.587A6.986,6.986,0,0,0,0,6.986c0,2.994,4.351,9.98,6.267,12.575A1.058,1.058,0,0,0,7.146,20a1.174,1.174,0,0,0,.918-.479c.439-.6.958-1.437,1.557-2.435a1.032,1.032,0,0,0-.359-1.4h0a1.011,1.011,0,0,0-1.317.359c-.279.439-.519.878-.8,1.277C4.87,14.012,2,8.862,2,6.986a4.99,4.99,0,0,1,9.98,0c0,1.118-.918,3.353-2.116,5.669a.976.976,0,0,0,.4,1.317Z"
                                                                fill="#111" />
                                                            <path id="Path_10" data-name="Path 10"
                                                                d="M12.393,11a1.4,1.4,0,1,1-1.4,1.4,1.414,1.414,0,0,1,1.4-1.4m0-2a3.393,3.393,0,1,0,3.393,3.393A3.39,3.39,0,0,0,12.393,9Z"
                                                                transform="translate(-5.407 -5.407)" fill="#651836" />
                                                        </g>
                                                    </svg>
                                                    <a href="profile2.html">عنوان الشحن</a>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Icon_Wishlist" width="40"
                                                        height="40" viewBox="0 0 40 40">
                                                        <path id="Path_3752" data-name="Path 3752"
                                                            d="M4,0H36a4,4,0,0,1,4,4V36a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4V4A4,4,0,0,1,4,0Z"
                                                            fill="#f9f6f7" />
                                                        <g id="Group_189" data-name="Group 189"
                                                            transform="translate(10.103 11)">
                                                            <path id="Path_13" data-name="Path 13"
                                                                d="M18.334,1.617A5.531,5.531,0,0,0,14.372,0,5.6,5.6,0,0,0,10.41,1.617l-.526.526L9.4,1.617A5.531,5.531,0,0,0,5.437,0,5.6,5.6,0,0,0,1.475,1.617,5.712,5.712,0,0,0,1.6,9.622l.4.4,6.792,6.792a1.586,1.586,0,0,0,2.224,0l6.792-6.792.4-.4A5.75,5.75,0,0,0,18.334,1.617Zm-.4,4.2A3.687,3.687,0,0,1,16.8,8.207l-.445.445L9.884,15.121,3.416,8.652l-.445-.445A3.792,3.792,0,0,1,1.839,5.822,3.48,3.48,0,0,1,2.89,3.073,3.623,3.623,0,0,1,5.639,2.022,3.687,3.687,0,0,1,8.025,3.154l.445.445.768.768,1.051,1.051a1.058,1.058,0,1,0,1.5-1.5l-.4-.4.445-.445a3.685,3.685,0,0,1,2.547-1.051,3.453,3.453,0,0,1,2.507,1.051A3.48,3.48,0,0,1,17.93,5.822Z"
                                                                transform="translate(0)" fill="#111" />
                                                            <path id="Path_14" data-name="Path 14"
                                                                d="M13.573,18.288l-1.819-1.819a.977.977,0,0,1,0-1.415h0a.977.977,0,0,1,1.415,0l1.819,1.819a.977.977,0,0,1,0,1.415h0A.977.977,0,0,1,13.573,18.288Z"
                                                                transform="translate(-6.882 -8.787)" fill="#651836" />
                                                        </g>
                                                    </svg>
                                                    <a href="profile3.html">قائمة الرغبات</a>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Icon_Order" width="40"
                                                        height="40" viewBox="0 0 40 40">
                                                        <rect id="Rectangle_41" data-name="Rectangle 41" width="40"
                                                            height="40" rx="5" fill="#f9f6f7" />
                                                        <g id="Group_196" data-name="Group 196"
                                                            transform="translate(10 10)">
                                                            <g id="Group_195" data-name="Group 195"
                                                                transform="translate(0)">
                                                                <path id="Path_18" data-name="Path 18"
                                                                    d="M19.56,4.52,17.2,1.08A2.728,2.728,0,0,0,15.04,0H4.96A2.532,2.532,0,0,0,2.84,1.12L.48,4.56A2.313,2.313,0,0,0,0,6V17.44A2.578,2.578,0,0,0,2.56,20H17.4a2.552,2.552,0,0,0,2.56-2.56V6A2.437,2.437,0,0,0,19.56,4.52ZM15.04,2a.57.57,0,0,1,.48.24L17,4.4H11V2ZM4.48,2.24A.57.57,0,0,1,4.96,2H9V4.4H3ZM18,17.44a.547.547,0,0,1-.56.56H2.56A.547.547,0,0,1,2,17.44V6.92a.529.529,0,0,1,.52-.52H17.56a.529.529,0,0,1,.52.52V17.44Z"
                                                                    transform="translate(0 0)" fill="#111" />
                                                            </g>
                                                            <path id="Path_19" data-name="Path 19"
                                                                d="M22,23H16a.99.99,0,0,1-1-1h0a.99.99,0,0,1,1-1h6a.99.99,0,0,1,1,1h0A.99.99,0,0,1,22,23Z"
                                                                transform="translate(-9 -12.6)" fill="#651836" />
                                                        </g>
                                                    </svg>
                                                    <a href="profile4.html">الطلبيات</a>
                                                </li>
                                                <li>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Icon_Payment" width="40"
                                                        height="40" viewBox="0 0 40 40">
                                                        <rect id="Rectangle_41" data-name="Rectangle 41" width="40"
                                                            height="40" rx="5" fill="#f9f6f7" />
                                                        <g id="Group_197" data-name="Group 197"
                                                            transform="translate(10 11)">
                                                            <path id="Path_20" data-name="Path 20"
                                                                d="M17.48,4.04,16.2,1.64A3.258,3.258,0,0,0,13.36,0a2.983,2.983,0,0,0-1.52.4L5.2,4h-2A3.209,3.209,0,0,0,0,7.2v7.6A3.209,3.209,0,0,0,3.2,18H16.8A3.209,3.209,0,0,0,20,14.8V7.2A3.223,3.223,0,0,0,17.48,4.04ZM12.8,2.16A1,1,0,0,1,13.36,2a1.153,1.153,0,0,1,1.04.64L15.12,4H9.4ZM18,14.8A1.2,1.2,0,0,1,16.8,16H3.2A1.2,1.2,0,0,1,2,14.8V7.2A1.2,1.2,0,0,1,3.2,6H16.8A1.2,1.2,0,0,1,18,7.2Z"
                                                                fill="#111" />
                                                            <path id="Path_21" data-name="Path 21"
                                                                d="M21,22H11a.99.99,0,0,1-1-1h0a.99.99,0,0,1,1-1H21a.99.99,0,0,1,1,1h0A1.016,1.016,0,0,1,21,22Z"
                                                                transform="translate(-6 -12)" fill="#651836" />
                                                        </g>
                                                    </svg>
                                                    <a href="profile5.html">بطاقات الدفع</a>
                                                </li>
                                            </ul>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item logout" @click="logout">
                                              {{ $t('front.logout') }}
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <nuxt-link :to="{ name: 'carts' }">
                                            <span>{{$t('front.carts')}}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" id="local_grocery_store-24px"
                                                width="34.667" height="34.667" viewBox="0 0 34.667 34.667">
                                                <path id="Path_3746" data-name="Path 3746" d="M0,0H34.667V34.667H0Z"
                                                    fill="none" />
                                                <path id="Path_3747" data-name="Path 3747"
                                                    d="M9.667,25.111A2.889,2.889,0,1,0,12.556,28,2.885,2.885,0,0,0,9.667,25.111ZM1,2V4.889H3.889l5.2,10.963-1.95,3.539a2.793,2.793,0,0,0-.361,1.387,2.9,2.9,0,0,0,2.889,2.889H27V20.778H10.273a.358.358,0,0,1-.361-.361l.043-.173,1.3-2.354H22.017A2.875,2.875,0,0,0,24.544,16.4l5.171-9.374a1.411,1.411,0,0,0,.173-.693,1.449,1.449,0,0,0-1.444-1.444H7.081L5.723,2H1ZM24.111,25.111A2.889,2.889,0,1,0,27,28,2.885,2.885,0,0,0,24.111,25.111Z"
                                                    transform="translate(0.444 0.889)" fill="#fafafa" />
                                            </svg>
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <menu-header
      :categories="categories"
      :brands="brands"
      :offers="offers"
    />
  </div>
</template>

<script src="./main-header.js"></script>
