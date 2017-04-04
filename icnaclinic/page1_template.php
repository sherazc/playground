<?php include './components/sub_page_begin.php';?>
<div id="container" class="hfeed">
<?php include './components/sub_page_header.php';?>
<div id="wrapper" class="clearfix">







	<div id="content" class="grid col-620">
		<div class="breadcrumb-list">
			<a href="http://localhost/wordpress_01">Home</a> <span class="chevron">›</span> <span class="breadcrumb-current">Sample Page</span>
		</div>
		<div id="post-2" class="post-2 page type-page status-publish hentry">
			<h1 class="post-title">Sample Page</h1>


			<div class="post-meta">
				<span class="meta-prep meta-prep-author posted">Posted on </span><a href="./page1.htm" title="3:20 am" rel="bookmark"><span class="timestamp">February 12, 2013</span> </a><span class="byline"> by
				</span><span class="author vcard"><a class="url fn n" href="http://localhost/wordpress_01/?author=1" title="View all posts by sheraz">sheraz</a> </span> <span class="comments-link"> <span
					class="mdash">—</span> <a href="http://localhost/wordpress_01/?page_id=2#respond" title="Comment on Sample Page">No Comments ↓</a>
				</span>

			</div>
			<!-- end of .post-meta -->


			<div class="post-entry">
				<p>This is an example page. It’s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page
					that introduces them to potential site visitors. It might say something like this:</p>
				<blockquote>
					<p>Hi there! I’m a bike messenger by day, aspiring actor by night, and this is my blog. I live in Los Angeles, have a great dog named Jack, and I like piña coladas. (And gettin’ caught in
						the rain.)</p>
				</blockquote>
				<p>…or something like this:</p>
				<blockquote>
					<p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of
						awesome things for the Gotham community.</p>
				</blockquote>
				<p>
					As a new WordPress user, you should go to <a href="http://localhost/wordpress_01/wp-admin/">your dashboard</a> to delete this page and create new pages for your content. Have fun!
				</p>
			</div>
			<!-- end of .post-entry -->

			<div class="post-data"></div>
			<!-- end of .post-data -->


			<div class="post-edit"></div>
		</div>
		<!-- end of #post-2 -->






		<div id="respond">
			<h3 id="reply-title">
				Leave a Reply <small><a rel="nofollow" id="cancel-comment-reply-link" href="http://localhost/wordpress_01/?page_id=2#respond" style="display: none;">Cancel reply</a> </small>
			</h3>
			<form action="http://localhost/wordpress_01/wp-comments-post.php" method="post" id="commentform">
				<p class="comment-notes">
					Your email address will not be published. Required fields are marked <span class="required">*</span>
				</p>
				<p class="comment-form-author">
					<label for="author">Name</label> <span class="required">*</span><input id="author" name="author" type="text" value="" size="30">
				</p>
				<p class="comment-form-email">
					<label for="email">E-mail</label> <span class="required">*</span><input id="email" name="email" type="text" value="" size="30">
				</p>
				<p class="comment-form-url">
					<label for="url">Website</label><input id="url" name="url" type="text" value="" size="30">
				</p>
				<p class="comment-form-comment">
					<label for="comment">Comment</label>
					<textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea>
				</p>
				<p class="form-allowed-tags">
					You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes:
					<code>&lt;a href="" title=""&gt; &lt;abbr title=""&gt; &lt;acronym title=""&gt; &lt;b&gt; &lt;blockquote cite=""&gt; &lt;cite&gt; &lt;code&gt; &lt;del datetime=""&gt; &lt;em&gt; &lt;i&gt; &lt;q
						cite=""&gt; &lt;strike&gt; &lt;strong&gt; </code>
				</p>
				<p class="form-submit">
					<input name="submit" type="submit" id="submit" value="Post Comment"> <input type="hidden" name="comment_post_ID" value="2" id="comment_post_ID"> <input type="hidden" name="comment_parent"
						id="comment_parent" value="0">
				</p>
			</form>
		</div>
		<!-- #respond -->








	</div>
	<!-- end of #content -->

	
	
	
	
	
	
	
	
	
	<div id="widgets" class="grid col-300 fit">

		<div id="archives-2" class="widget-wrapper widget_archive">
			<div class="widget-title">Archives</div>
			<ul>
				<li><a href="http://localhost/wordpress_01/?m=201302" title="February 2013">February 2013</a></li>
			</ul>
		</div>
		<div id="search-2" class="widget-wrapper widget_search">
			<div class="widget-title">Search me</div>
			<form method="get" id="searchform" action="http://localhost/wordpress_01/">
				<input type="text" class="field" name="s" id="s" placeholder="search here …"> <input type="submit" class="submit" name="submit" id="searchsubmit" value="Go">
			</form>
		</div>
		<div id="recent-posts-2" class="widget-wrapper widget_recent_entries">
			<div class="widget-title">Recent Post me</div>
			<ul>
				<li><a href="http://localhost/wordpress_01/?p=1" title="Hello world!">Hello world!</a>
				</li>
			</ul>
		</div>
		<div id="recent-comments-2" class="widget-wrapper widget_recent_comments">
			<div class="widget-title">Recent Comments</div>
			<ul id="recentcomments">
				<li class="recentcomments"><a href="http://wordpress.org/" rel="external nofollow" class="url">Mr WordPress</a> on <a href="http://localhost/wordpress_01/?p=1#comment-1">Hello world!</a></li>
			</ul>
		</div>
		<div id="categories-2" class="widget-wrapper widget_categories">
			<div class="widget-title">Categories</div>
			<ul>
				<li class="cat-item cat-item-1"><a href="http://localhost/wordpress_01/?cat=1" title="View all posts filed under Uncategorized">Uncategorized</a>
				</li>
			</ul>
		</div>
	</div>
	<!-- end of #widgets -->
	
	
	
	
	
	
	
	
	
</div>
<!-- end of #wrapper -->
</div>
<!-- end of #container -->
<?php include './components/main_footer.php';?>
<?php include './components/main_page_end.php';?>