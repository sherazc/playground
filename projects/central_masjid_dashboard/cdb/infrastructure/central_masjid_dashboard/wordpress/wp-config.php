<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'cdb' );

/** MySQL database username */
define( 'DB_USER', 'cdbuser' );

/** MySQL database password */
define( 'DB_PASSWORD', 'passwordcdb' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '$tS9Z2AvL)jwV/.>A9hG*DqY;T$)4n+(tJR(M50D:pEh.rWp?5&v=Q2nOk8D59CD' );
define( 'SECURE_AUTH_KEY',  'XEom0`k99?o?7p5@J(619qzY$bwPi^vzm).-)_6Y[bui0$$!#hRS36O2{6h^1%K]' );
define( 'LOGGED_IN_KEY',    '>@[6@D*@HvHQHG#,zp47KqR#]_)gPL?juW| Qufd>s]E@|T)H5eq]++fB<P1a02v' );
define( 'NONCE_KEY',        'p.etF+%k-pwvO^|cJVKmgz:`3mOHeupJd[[-_?pEqbmiY|gl gK`3lBdb1nrDQB!' );
define( 'AUTH_SALT',        '`}q;uC}GwNe9@j<QNn l lD!&YUMmbP%5I|=]s!w9On:=D<!$2], Lv@) [)dkd(' );
define( 'SECURE_AUTH_SALT', '=oNt*DrieR9pj]`|X ;U#eM4hoe?hIlK})XIQ6f9FrO]Af+Jr&bA)m d-jrXWk<(' );
define( 'LOGGED_IN_SALT',   'jgsy:K,Fxl|JI{GC`!8csW-<)hD>}}BhZ|1FkP];3H#Q{#d6z~DI8eFX#2F2)k;A' );
define( 'NONCE_SALT',       'gX{GN#!ww4,R>/7D96NTo!9^NF$By` Tf+[+DQ<(AY/3KG3*:.5kmc7VS.;E78 8' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );

