<?php
/* ページ毎の設定 */
$PAGE = [
    'slug'        => 'top',
    'title'       => 'TopPage',
    'description' => '',
    'path'        => './',
    'url'         => '/' // ドメイン後に続く正規URL（ex. 'about/'）
];
include($PAGE['path'] . '_inc/functions.php');
include($PAGE['path'] . '_inc/meta.php');
include($PAGE['path'] . '_inc/components/organisms/header.php');
// 以下、Atomic Designにする上でinclude不要であれば消しちゃってもOK！
include_files($PAGE['path'] . '_inc/components/atoms/*.php');
?>

<main>
    <?php include($PAGE['path'] . '_inc/components/organisms/information.php'); ?>
    <?php include($PAGE['path'] . '_inc/components/organisms/top__road.php'); ?>
    <?php include($PAGE['path'] . '_inc/components/organisms/chart.php'); ?>
    <?php include($PAGE['path'] . '_inc/components/organisms/top__stage.php'); ?>
</main>
<?php include($PAGE['path'] . '_inc/components/molecules/stage__modal.php'); ?>
<?php include($PAGE['path'] . '_inc/components/organisms/footer.php'); ?>
</body>