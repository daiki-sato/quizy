<?php
/**
 * サイト情報（デフォルト）
 */
define('SITE_TITLE',        'サイトタイトル');
define('SITE_DESCRIPTION',  'サイト説明文');
define('SITE_URL',          'サイトURL（https://example.com/）');

// サイト毎の情報
$site_title = $PAGE['title'] ? $PAGE['title'] . ' | ' . SITE_TITLE : SITE_TITLE;
$site_description = $PAGE['description'] ? $PAGE['description'] : SITE_DESCRIPTION;
$site_canonical = $PAGE['url'] ? $site_url . $PAGE['url'] : SITE_URL;
