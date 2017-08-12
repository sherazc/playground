<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "site-content" div and all content after.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?>

	</div><!-- .site-content -->

	<footer id="colophon" class="site-footer" role="contentinfo">


		<div class="site-info">

			<div class="clearfix">
				<?php
					if (is_active_sidebar("footer_widget_1")) {
						?>
						<div class="footer-widget-area">
							<?php dynamic_sidebar("footer_widget_1")?>
						</div>
						<?php
					}
				?>
				<?php
				if (is_active_sidebar("footer_widget_2")) {
					?>
					<div class="footer-widget-area">
						<?php dynamic_sidebar("footer_widget_2")?>
					</div>
					<?php
				}
				?>
				<?php
				if (is_active_sidebar("footer_widget_3")) {
					?>
					<div class="footer-widget-area">
						<?php dynamic_sidebar("footer_widget_3")?>
					</div>
					<?php
				}
				?>
				<?php
				if (is_active_sidebar("footer_widget_4")) {
					?>
					<div class="footer-widget-area">
						<?php dynamic_sidebar("footer_widget_4")?>
					</div>
					<?php
				}
				?>
			</div>


			<?php
				/**
				 * Fires before the Twenty Fifteen footer text for footer customization.
				 *
				 * @since Twenty Fifteen 1.0
				 */
				do_action( 'twentyfifteen_credits' );
			?>
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'twentyfifteen' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'twentyfifteen' ), 'WordPress' ); ?></a>
		</div><!-- .site-info -->

	</footer><!-- .site-footer -->

</div><!-- .site -->

<?php wp_footer(); ?>

</body>
</html>
