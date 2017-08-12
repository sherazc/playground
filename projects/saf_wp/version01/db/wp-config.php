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
define('DB_NAME', 'saf_v01db');

/** MySQL database username */
define('DB_USER', 'dbuser');

/** MySQL database password */
define('DB_PASSWORD', 'password123');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '[HR5|`66zE)ZP&K$,{0]`^S&GwdRzYJ<CoX+9QZdu0,wE:q*MCd& X`PJ`E#=+>-');
define('SECURE_AUTH_KEY',  'F`hy-:;b y$&|IO)nv^H=/(a_7AT|t38;adw#=mhB^rACU|Y W6/)|rD:_]t&7v7');
define('LOGGED_IN_KEY',    'bY,_otaC8Drv+nf#/:&O?LT9[&WD~NjON9?b7q|yfwAn:2/{Jh<Ird|Wh3RJKKB1');
define('NONCE_KEY',        'gU=hX&X,j)t{D%w|W1LEIjoG0`o8>w!TQPb4S%V&!~kN(RO.7i6lKcd_Y<PQ5m?`');
define('AUTH_SALT',        '6l1vn3>c]OR]F]!rL]rU`T9bW`B&?1|uj4pZlW6(D{)Hw=ptWsUW9po2VZ {FNV3');
define('SECURE_AUTH_SALT', '63~SxbfKq4;p@AA.F4.Iqt?HEA4eh8G.memZdKfbNJ+zV{(mML}6(mf9LikvZN.f');
define('LOGGED_IN_SALT',   'z)x.r2[8E- ^.3+nxGJ7DR__t*+7i.|q[?O=Y=!kmZ9qtlHw?Qjv%&Iq+2)ym*o ');
define('NONCE_SALT',       'ST&mZ5Ln@whSa{[/?d8C(,=~*/V5`Vli-|9AZ%<d$gt.p9{rQ*Ym|+4Y|/{&])W-');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

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
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
