<?php
/*
 * Template Name: Special Layout
 *
 */

get_header();
if (have_posts()) {
    while (have_posts()) {
        the_post();
        ?>

        <article class="post">
            <h2>
                <?php the_title(); ?>
            </h2>

            <div class="info-box">
                <h4>Disclaimer Title</h4>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque magna quis quam
                    aliquam, a elementum diam pellentesque. Quisque vitae scelerisque tortor, ac vehicula libero.
                </p>
            </div>
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
