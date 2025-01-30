if (app.settings.google_analytics_enabled) {
    (function () {
        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + app.settings.google_analytics_measurement_id;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        script.onload = function () {
            gtag('js', new Date());
            var config = {
                'debug_mode': app.settings.google_analytics_debug_mode,
                'send_page_view': false
            };
            gtag('config', app.settings.google_analytics_measurement_id, config);
        };

        let prepareLineItems = (event) => {
            let result = []
            event.data?.lines?.forEach((line, _) => {
                result.push({
                    item_id: line.product_id,
                    item_name: line.product_title,
                    item_variant: line.variant_title,
                    discount: line.total_discount,
                    price: line.price_incl_tax,
                    quantity: line.quantity
                })
            });
            return result;
        }

        analytics.subscribe('page_viewed', (event) => {
            gtag('event', 'page_view', {
                page_path: window.parent.location.pathname,
                page_title: window.parent.document.title
            });
        });

        analytics.subscribe('product_viewed', (event) => {
            gtag('event', 'view_item', {
                currency: event.data?.purchase_info?.price?.currency,
                value: event.data?.purchase_info?.price?.price,
                items: [
                    {
                        item_id: event.data?.id,
                        item_name: event.data?.title,
                        sku: event.data?.sku,
                        item_category: event.data?.categories?.length ? event.data.categories[0].name : "",
                        price: event.data?.purchase_info?.price?.price,
                        quantity: 1
                    }
                ]
            });

        });

        analytics.subscribe('product_added_to_cart', (event) => {
            gtag('event', 'add_to_cart', {
                currency: event.data?.purchase_info?.price?.currency,
                value: event.data?.purchase_info?.price?.price,
                items: [
                    {
                        item_id: event.data?.id,
                        item_name: event.data?.title,
                        sku: event.data?.sku,
                        item_category: event.data?.categories?.length ? event.data.categories[0].name : "",
                        price: event.data?.purchase_info?.price?.price,
                        quantity: event.data?.quantity
                    }
                ]
            });
        });

        analytics.subscribe('checkout_started', (event) => {
            gtag('event', 'begin_checkout', {
                currency: event.data?.currency,
                value: event.data?.total_incl_tax,
                coupon: event.data?.voucher_discounts?.length ? event.data?.voucher_discounts[0].name : "",
                items: prepareLineItems(event)
            });
        });

        analytics.subscribe('checkout_completed', (event) => {
            gtag('event', 'purchase', {
                currency: event.data?.currency,
                value: event.data?.total_incl_tax,
                transaction_id: event.data?.number,
                coupon: event.data?.voucher_discounts?.length ? event.data?.voucher_discounts[0].name : "",
                shipping: event.data?.shipping_incl_tax,
                tax: event.data?.total_tax,
                items: prepareLineItems(event)
            });
        });

        if (app.settings.google_adwords_conversion_enabled) {

            analytics.subscribe('checkout_completed', (event) => {
                adwordsAccount = app.settings.google_adwords_conversion_id + "/" + app.settings.google_adwords_conversion_label;
                gtag('event', 'conversion', {
                    send_to: adwordsAccount,
                    transaction_id: event.data?.number,
                    value: event.data?.total_tax,
                    currency: event.data?.currency,
                });
            });
        }

    })();
}
