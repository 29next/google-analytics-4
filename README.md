# Google Analytics 4

Google Analytics 4 app for 29 Next that integrates Google Analytics 4 into any storefront theme. App also includes [Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag) event tracking using the `gtag()` events.

Also includes Google Adwords Conversion tracking integration with `gtag()` conversion events.

**Google Analytics 4**
* [Installs Google Tag Manager](https://support.google.com/analytics/answer/9304153) globally with a setting for your Measurement ID - see `snippets/global-header.html`


**Google Ecommerce Events**
* [Product Detail Impressions](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#view_item_details) - see `snippets/view-product.html`
* [Add to Cart](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#add_or_remove_an_item_from_a_shopping_cart) - see `snippets/add-to-cart.html`
* [Begin Checkout](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#initiate_the_checkout_process) - see `snippets/start-checkout.html`
* [Purchases](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag#make_a_purchase_or_issue_a_refund) - see `snippets/complete-checkout.html`


**Google Adwords Conversion Tracking**

* [Google Tag for Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/7548399?hl=en) - see `snippets/complete-checkout.html`
