<?php
get_header();
if (have_posts()) {
    while (have_posts()) {
        the_post();
        ?>

        <?php

        $args = array(
            // this would return children of current page. But we don't want that because it will not print any list
            // on child page. So we have to comment it.
            //'child_of' => $post->ID,

            // This is our function wittent in functions.php
            'child_of' => getTopAncestorId(),
            // By default wp_list_pages() prints 'Pages' as list title. To remove it we give this:
            'title_li' => ''
        );

        // wp_list_pages(); prints out all pages in their hierarchy. To filter them we give arguments
        wp_list_pages($args);

        //var_dump(get_post_ancestors($post->ID))

        ?>


        <article class="post">
            <h2>
                <?php the_title(); ?>
            </h2>
            <?php the_content(); ?>
        </article>
        <?php
    }

} else {
    ?>
    <p>No content found</p>
    <?php
}

get_footer();
?>
