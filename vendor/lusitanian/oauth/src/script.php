<?php
/**
 * Example of retrieving an authentication token of the Etsy service
 *
 * PHP version 5.4
 *
 * @author     Iñaki Abete <inakiabt+github@gmail.com>
 * @copyright  Copyright (c) 2013 The authors
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 */
use OAuth\OAuth1\Service\Etsy;
use OAuth\Common\Storage\Session;
use OAuth\Common\Consumer\Credentials;

use OAuth\ServiceFactory;

// Session storage
$storage = new Session();
// Setup the credentials for the requests
$credentials = new Credentials(
    'izmdi7w8c85uqg1d0ack37im',
    'o3s3d0oyn8',
    'http://inventory.shoprachaels.com'
);
// Instantiate the Etsy service using the credentials, http client and storage mechanism for the token
/** @var $etsyService Etsy */
$serviceFactory = new ServiceFactory();
$etsyService = $serviceFactory->createService('Etsy', $credentials, $storage);
if (!empty($_GET['oauth_token'])) {
    $token = $storage->retrieveAccessToken('Etsy');
    // This was a callback request from Etsy, get the token
    $etsyService->requestAccessToken(
        $_GET['oauth_token'],
        $_GET['oauth_verifier'],
        $token->getRequestTokenSecret()
    );
    // Send a request now that we have access token
    $result = json_decode($etsyService->request('/private/users/__SELF__'));
    echo 'result: <pre>' . print_r($result, true) . '</pre>';
} elseif (!empty($_GET['go']) && $_GET['go'] === 'go') {
    $response = $etsyService->requestRequestToken();
    $extra = $response->getExtraParams();
    $url = $extra['login_url'];
    header('Location: ' . $url);
} else {
    $url = $currentUri->getRelativeUri() . '?go=go';
    echo "<a href='$url'>Login with Etsy!</a>";
}