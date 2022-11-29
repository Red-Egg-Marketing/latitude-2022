<?php
	$id = get_the_id();
?>
<footer class="entry-footer">
	<div class="wrapper navy">
		<div class="extra-wrap">
			<div class="col-6">
				<?php latitude_posts_topics($id); ?>
			</div>
			<div class="col-6">
				<?php
					get_template_part('template-parts/social-share');
				?>
			</div>
		</div>
	</div>
	<?php latitude_posts_footer($id); ?>
</footer><!-- .entry-footer -->