<template>
    <div :class="gridClass">
        <div class="item">
            <a :class="`favorite ${product.is_favourite ? 'active' : ''}`" @click="toggleFavourite(product)">
                <svg xmlns="http://www.w3.org/2000/svg" width="25.228" height="24.491"
                    viewBox="0 0 25.228 24.491">
                    <g id="favorite" transform="translate(-0.768 -0.663)">
                        <path id="Path_599" data-name="Path 599"
                            d="M8.392,2.271A6.133,6.133,0,0,0,2.268,8.395c0,8.483,8.9,13.836,11.114,15.051C15.587,22.23,24.5,16.878,24.5,8.395A6.119,6.119,0,0,0,14.162,3.954l-.78.744-.78-.744a6.106,6.106,0,0,0-4.21-1.683Z"
                            transform="translate(0 -0.005)" fill="transparent" stroke="#c3b5b5"
                            stroke-width="3" />
                    </g>
                </svg>
            </a>
            <div v-if="product.discount" class="discount">{{product.discount}}% {{$t('front.off')}}</div>
            <div class="img"><img :src="product.primary_attachment.file" :alt="product.name"></div>
            <div class="content">
                <h4 class="title">
                    <nuxt-link :to="{ name: 'products.single', params: { id: product.id } }">
                      {{ product.name }}
                    </nuxt-link>
                </h4>
                <small>
                  {{ product.description }}
                </small>
                <div class="price">
                    <span>{{ product.price_after_discount }}</span>
                    <span>{{$t('front.riyal')}}</span>
                </div>
                <div class="bottom-price">
                    <div v-if="product.discount" class="old-price">
                        <span>{{ product.price_after_tax }}</span>
                        <span>{{$t('front.riyal')}}</span>
                    </div>
                    <div class="left">
                        <span>{{ product.quantity}} {{$t('front.left_qty')}}</span>
                    </div>
                </div>
                <!-- <button type="button" class="btn">

                    <span>أضف للسلة</span>
                </button> -->
            </div>
        </div>
    </div>
</template>

<script src="./product-block.js" ></script>
