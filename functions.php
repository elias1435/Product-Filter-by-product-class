<?php
add_shortcode('ajax_product_filter', function () {
    $terms = get_terms([
        'taxonomy'   => 'product_cat',
        'hide_empty' => true,
        'pad_counts' => true
    ]);

    ob_start();
    echo '<form id="product-category-filter">';
	echo '<input type="radio" id="filter-all" name="product_cat" class="category-radio" value="all" checked>';
    echo '<label for="filter-all">הכל</label>';

	foreach ($terms as $term) {
		$term_id = esc_attr($term->term_id);
		$term_name = esc_html($term->name);
		$id = 'filter-' . $term_id;

		echo '<input type="radio" id="' . $id . '" name="product_cat" class="category-radio" value="product_cat-' . $term_id . '">';
		echo '<label for="' . $id . '">' . $term_name . '</label>';
	}

	echo '</form>';
    return ob_get_clean();
});


add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script(
        'product-filter',
        get_stylesheet_directory_uri() . '/js/product-filter.js',
        ['jquery'],
        time(),
        true
    );
});
