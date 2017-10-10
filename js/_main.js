console.info('TwitterHelper running...')

let _obsPage,
    _obsStream

$(document).ready(() => {
    thTweetInit()
    observePage()
})

// Check when page/url change
function observePage() {
    let target = $('#page-container').get(0)

    _obsPage = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            thTweetInit()
            _obsStream.disconnect()
            observeStream()
        })
    })

    _obsPage.observe(target, { attributes: true })

    observeStream()
}

// Check when load more tweets
function observeStream() {
    let target = $('#stream-items-id').get(0)

    _obsStream = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                thTweetCustom(node)
            })
        })
    })

    _obsStream.observe(target, { childList: true })
}

// Run after page change
function thTweetInit() {
    let tweets = $('#stream-items-id > li')
    tweets.each(function(index, tweet) {
        thTweetCustom(tweet)
    })
}

// Add customize for every tweet
function thTweetCustom(node) {
    let media = $('.AdaptiveMediaOuterContainer', node)
    if (media.length == 0) return
    $('.ProfileTweet-actionList.js-actions', node)
        .append(thStreamItemFooterAction())
}

// <div class="stream-item-footer">
function thStreamItemFooterAction() {
    return $('<div/>')
        .addClass('ProfileTweet-action ProfileTweet-action--thdownload')
        .append(
            $('<button/>')
            .addClass('ProfileTweet-actionButton js-actionButton')
            .prop('type', 'button')
            .append(
                $('<div/>')
                .addClass('IconContainer js-tooltip')
                .attr('data-original-title', 'Download media')
                .append(
                    $('<span/>')
                    .addClass('Icon Icon--medium Icon--download')
                )
            )
        )
}