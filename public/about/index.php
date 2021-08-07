<?php
/* ページ毎の設定 */
$PAGE = [
  'slug'        => 'about',
  'title'       => 'About',
  'description' => '',
  'path'        => '../',
  'url'         => 'about/' // ドメイン後に続く正規URL（ex. 'about/'）
];
include( $PAGE['path'] . '_inc/functions.php' );
include( $PAGE['path'] . '_inc/meta.php' );
include( $PAGE['path'] . '_inc/components/organisms/header.php' );
?>
アバウトページ
<?php include( $PAGE['path'] . '_inc/components/organisms/footer.php' ); ?>
