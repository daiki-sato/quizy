<?php
/**
 * ディレクトリ直下のファイルを全てinclude
 */
function include_files( $pattern )
{
  foreach ( glob( $pattern ) as $filename )
  {
    include $filename;
  }
}
