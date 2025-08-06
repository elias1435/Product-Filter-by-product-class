(function ($) {
    let selectedClass = 'all';

    function filterProducts() {
        const $products = $('.e-loop-item');
        $products.removeClass('product-filter-hidden');

        // Map product_cat-15 (Uncategorized ID) to 'product_cat-uncategorized'
        let matchClass = selectedClass;
        if (selectedClass === 'product_cat-15') {
            matchClass = 'product_cat-uncategorized';
        }

        if (selectedClass === 'all') return;

        $products.each(function () {
            const $el = $(this);
            if (!$el.hasClass(matchClass)) {
                $el.addClass('product-filter-hidden');
            }
        });

        // Show/hide "No products" message
        const visibleCount = $('.e-loop-item:not(.product-filter-hidden)').length;
        $('#no-products-message').toggle(visibleCount === 0);
    }

    $(document).on('change', '.category-radio', function () {
        selectedClass = $(this).val();
        console.log("🔘 Filter changed:", selectedClass);
        filterProducts();
    });

    const observer = new MutationObserver(() => {
        console.log("🌀 DOM changed — applying filter again");
        filterProducts();
    });

    $(document).ready(function () {
        const loopContainer = document.querySelector('.elementor-loop-container') || document.querySelector('.elementor-posts-container') || document;
        if (loopContainer) {
            observer.observe(loopContainer, { childList: true, subtree: true });
            filterProducts(); // initial run
        }
    });
})(jQuery);
