## Implementing Isotope in Wordpress

In this article I'll show you how I've implement the JavaScript library [Isotope](http://isotope.metafizzy.co/#getting-started) in a simple Wordpress theme I have developed. I use the library to filter recipes based on categories like breakfast, lunch and dinner. I use a custom post type and featured images to create a filterable image gallery. I construct a dynamic filter menu based on what categories exist. Granted, it is not the most beautiful code ever written but it works. You can download the entire theme including the code I'll discuss below [here](https://www.github.com/timvanscherpenzeel/sjef).

## Importing Isoptope

First of all we should import jQuery and the [Isotope library](https://npmcdn.com/isotope-layout@3.0.0/dist/isotope.pkgd.min.js). Add the following lines to `functions.php` and move the `isotope.pkgd.min.js` in your JavaScript folder.

	//Jquery import
	if (!is_admin()) add_action("wp_enqueue_scripts", "my_jquery_enqueue", 11);
	function my_jquery_enqueue() {
	   wp_deregister_script('jquery');
	   wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", false, null);
	   wp_enqueue_script('jquery');
	}

	//Isotope import
	function your_theme_scripts() {
		wp_enqueue_script( 'isotope', get_template_directory_uri() . '/js/isotope.pkgd.min.js', array ( 'jquery' ), true);
	}
	add_action( 'wp_enqueue_scripts', 'your_theme_scripts' );


## Custom posttype

Next up we will go ahead and register a custom posttype. I created a plugin called 'sjef-recipe-posttype.php' Once you have added the function to your `functions.php` or copied the whole thing into your plugin folder you will see a carrot symbol with the name 'Recipes' next to it pop up in the admin menu. You can now register new custom posts. We do this because then we can filter out any blog posts that do not have a custom identifier.

```php
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
```

Now that we have registered a custom post type we should start using it! Go try it out. I registered all my recipe posts with the keyword 'Type'. You can add give a post multiple tags by seperating the identifiers with a comma. Make sure you also set a featured image with every post otherwise it won't show up. 

You should also add imagesupport to `functions.php` through following snippet `add_image_size('small-thumbnail', 400);`.


## Filter menu

In `index.php` can copy the following code to create the filter menu. When you click on a category all other posts will hide.

```php
<div class="recipeFilter">
	//Isotope data filter, the menu will append to this list
    <a href="#" data-filter="*" class="current">All Categories</a>

    <?php

    //Array necessary to check for duplicate data-filter menu items 
    $recipeDatafilterArray = array();
    
    //Array necessary to store the uppercase version of the menu items and compare those
    $recipeMenuArray = array();
    
    //Change $key to the 'Name' value in the 'Custom Fields' box, make sure the name is the same for all posts you want to filter
    $key = "Type";

    if (have_posts()) :
    	while (have_posts()) : the_post();

		//filter out any posts that do not have a thumbnail
    	if (has_post_thumbnail()) {
    		//Check if the menu filter name already exists, if not, create it
    		if (!in_array(trim(get_post_meta($post->ID, $key, true)), $recipeMenuArray)) {
    		?>

		    	<a 	href="#"
		    		data-filter="<?php
		    						//Datafilter requires lowercase characters
									$dataItem = trim(strtolower(get_post_meta($post->ID, $key, true)));
									$dataItem = (strstr($dataItem, ', ') ? substr($dataItem, 0, strpos($dataItem, ',')) : $dataItem);

									//Check if the data filter already exists, if not, create it
									if (!in_array($dataItem, $recipeDatafilterArray)) {
										$recipeDatafilterArray[] = $dataItem;
										//Adds a dot in front of the string
										echo substr_replace($dataItem, ".", 0, 0);
									}
								?>"
					>
					<?php
						//Trim every item off after the first comma (so we don't have categories like 'Lunch Breakfast')
						$menuItem = trim(get_post_meta($post->ID, $key, true));
						$menuItem = (strstr($menuItem, ', ') ? substr($menuItem, 0, strpos($menuItem, ',')) : $menuItem);

						//Necessary to get rid of the duplicate menu items
						if (!in_array($menuItem, $recipeMenuArray)) {
							$recipeMenuArray[] = $menuItem;
							echo $menuItem;
						}
					?>
				</a>

			<?php

			}
		}

		endwhile;

		else : 
			echo '<p>No content found</p>';
		endif;

	?>
</div>
```


## Filterable imagegrid

Next we will construct the filterable imagegrid. The images have a specific size to work nicely with css.

```php
<div class="recipeContainer">

	<?php

	if (have_posts()) :
		while (have_posts()) : the_post();
		?>

			<div class= "<?php if (has_post_thumbnail() ) {
							$recipeItem = trim(strtolower(get_post_meta($post->ID, $key, true)));
							//Removes the comma's from the string to turn them into the correct format for classes
							$recipeItem = str_replace(',', '', $recipeItem);
							echo $recipeItem;
						} ?>" 
				>
			    <a href="<?php the_permalink(); ?>">
			    <?php the_post_thumbnail('small-thumbnail'); ?>
			    <span class="caption"><?php echo get_the_title($post->ID); ?></span>    
			    </a>
			</div>

		<?php

		endwhile;

		else :
			echo '<p>No content found</p>';
		endif;

	?>

</div>
```

You should add the following code to your main JavaScript file for it all to work.

```js
$(window).load(function(){
    var $container = $('.recipeContainer');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 350,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.recipeFilter a').click(function(){
        $('.recipeFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 350,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 
});
```