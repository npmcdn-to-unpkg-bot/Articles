<?php
/*
Plugin Name: Sjef-recipe-posttype
Plugin URI: https://www.github.com/timvanscherpenzeel/sjef
Description: Adds the custom recipe posttype
Version: 0.1
Author: Tim van Scherpenzeel
Author URI: https://www.github.com/timvanscherpenzeel
*/

// Creates the custom posttype
function sjef_custom_posttype() {
// Set UI labels for Custom Post Type
	$labels = array(
		'name'                => _x( 'Recipes', 'Post Type General Name', 'sjef' ),
		'singular_name'       => _x( 'Recipe', 'Post Type Singular Name', 'sjef' ),
		'menu_name'           => __( 'Recipes', 'sjef' ),
		'parent_item_colon'   => __( 'Parent Recipe', 'sjef' ),
		'all_items'           => __( 'All Recipe', 'sjef' ),
		'view_item'           => __( 'View Recipe', 'sjef' ),
		'add_new_item'        => __( 'Add New Recipe', 'sjef' ),
		'add_new'             => __( 'Add New', 'sjef' ),
		'edit_item'           => __( 'Edit Recipe', 'sjef' ),
		'update_item'         => __( 'Update Recipe', 'sjef' ),
		'search_items'        => __( 'Search Recipes', 'sjef' ),
		'not_found'           => __( 'Not Found', 'sjef' ),
		'not_found_in_trash'  => __( 'Not found in Trash', 'sjef' ),
	);
	
// Set other options for Custom Post Type
	$args = array(
		'label'               => __( 'recipes', 'sjef' ),
		'description'         => __( 'Recipes for on the food blog', 'sjef' ),
		'labels'              => $labels,
		// Features this CPT supports in Post Editor
		'supports'            => array( 'title', 
										'editor',
										'author', 
										'thumbnail', 
										'custom-fields', 
								 ),
		// You can associate this CPT with a taxonomy or custom taxonomy. 
		'taxonomies'          => array( 'recipes' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
		'menu_icon'   => 'dashicons-carrot',
	);
	
	// Registering your Custom Post Type
	register_post_type( 'recipes', $args );
}
add_action( 'init', 'sjef_custom_posttype', 0 );
?>