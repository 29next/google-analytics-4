if (app.settings.google_analytics_enabled) {
    (function () {
        
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

        analytics.subscribe('product_viewed', (event) => {
            window.top.gtag('event', 'view_item', {
                currency: event.data?.purchase_info?.price?.currency,
                value: event.data?.purchase_info?.price?.price,
                items: [
                    {
                        item_id: event.data?.id,
                        item_name: event.data?.title,
                        sku: event.data?.sku,
                        item_category: event.data?.categories?.length ? event.data.categories[0].name : "",
                        price: event.data?.purchase_info?.price?.price,
                        quantity: 1,
                        page_path: window.top.location.pathname,
                        page_title: window.top.document.title,
                        page_location:  window.top.document.location.href,
                        page_referrer: window.top.document.referrer
                    }
                ]
            });

        });

        analytics.subscribe('product_added_to_cart', (event) => {
            // console.log(event.data);
            // console.log((event.data?.price_incl_tax / event.data?.quantity).toFixed(2));
            window.top.gtag('event', 'add_to_cart', {
                currency: event.data?.currency,
                value: event.data?.price_incl_tax,
                items: [
                    {
                        item_id: event.data?.id,
                        item_name: event.data?.title,
                        sku: event.data?.sku,
                        item_category: event.data?.categories?.length ? event.data.categories[0].name : "",
                        price: (event.data?.price_incl_tax / event.data?.quantity).toFixed(2),
                        quantity: event.data?.quantity,
                        page_path: window.top.location.pathname,
                        page_title: window.top.document.title,
                        page_location:  window.top.document.location.href,
                        page_referrer: window.top.document.referrer
                    }
                ]
            });
        });

        analytics.subscribe('checkout_started', (event) => {
            window.top.gtag('event', 'begin_checkout', {
                currency: event.data?.currency,
                value: event.data?.total_incl_tax,
                coupon: event.data?.voucher_discounts?.length ? event.data?.voucher_discounts[0].name : "",
                items: prepareLineItems(event),
                page_path: window.top.location.pathname,
                page_title: window.top.document.title,
                page_location:  window.top.document.location.href,
                page_referrer: window.top.document.referrer
            });
        });

        analytics.subscribe('checkout_completed', (event) => {
            window.top.gtag('event', 'purchase', {
                currency: event.data?.currency,
                value: event.data?.total_incl_tax,
                transaction_id: event.data?.number,
                coupon: event.data?.voucher_discounts?.length ? event.data?.voucher_discounts[0].name : "",
                shipping: event.data?.shipping_incl_tax,
                tax: event.data?.total_tax,
                items: prepareLineItems(event),
                page_path: window.top.location.pathname,
                page_title: window.top.document.title,
                page_location:  window.top.document.location.href,
                page_referrer: window.top.document.referrer
            });
        });

        if (app.settings.google_adwords_conversion_enabled) {

            analytics.subscribe('checkout_completed', (event) => {
                adwordsAccount = app.settings.google_adwords_conversion_id + "/" + app.settings.google_adwords_conversion_label;
                window.top.gtag('event', 'conversion', {
                    send_to: adwordsAccount,
                    transaction_id: event.data?.number,
                    value: event.data?.total_tax,
                    currency: event.data?.currency,
                    page_path: window.top.location.pathname,
                    page_title: window.top.document.title,
                    page_location:  window.top.document.location.href,
                    page_referrer: window.top.document.referrer
                });
            });
        }

    })();
}
