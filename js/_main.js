console.info('TwitterHelper running...')

let _obsPage, _obsStream

$(document).ready(() => {
    observePage()
})

// Check when page/url change
function observePage() {
    let target = $('#page-container').get(0)

    _obsPage = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation)

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
            console.log(mutation)
        })
    })

    _obsStream.observe(target, { childList: true })
}

// Add customize for every tweet
function thTweetCustom() {

}

// <div class="stream-item-footer">
function thStreamItemFooterAction() {
    // return $('<div/>')
    //     .addClass('')
}