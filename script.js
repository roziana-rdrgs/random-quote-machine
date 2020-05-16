$(document).ready(function() {

    displayQuoteFromArray();

    $("#new-quote").click(function() {
        $('#quote-box').fadeOut();
        getRandomQuote();
    });

    function getRandomQuote() {
        $.ajax({
            type: "POST",
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
            dataType: "json",
            success: displayAPIQuote,

            //@todo create a function that will display quotes from an array is AJAX fails
            error: displayQuoteFromArray,
            beforeSend: setHeader,

        });

        function setHeader(xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "XEmG41b3OumshAGz4MeTGVfhZNmdp1Cty6ajsnAKusfLZ0iZKC");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Accept", "application/json");
        }
    }

    function displayAPIQuote(response) {
        console.log(response[0].quote);
        $("#text").text(response[0].quote);
        $('#author').text(response[0].author);

        tweetQuote();
        $('#quote-box').fadeIn(1200);
    }

    function displayQuote(response) {
        console.log(response.quote);
        $("#text").text(response.quote);
        $('#author').text(response.author);

        tweetQuote();
        $('#quote-box').fadeIn(1200);
    }

    function displayQuoteFromArray() {
        var myQuotes = [{
                author: "Salvador Dali",
                quote: "The only difference between me and a madman is that I'm not mad."
            },
            {
                author: "Soren Aabye Kierkegaard",
                quote: "People demand freedom of speech to make up for the freedom of thought which they avoid"
            },
            {
                author: "Oscar Wilde",
                quote: "The only way to get rid of a temptation is to yield to it."
            },
            {
                author: "Aldous Huxley",
                quote: "Maybe this world is another planet's Hell."
            },
            {
                author: "Thomas Alba Edison",
                quote: "I have not failed. I've just found 10,000 ways that won't work."
            }
        ];
        var random = Math.floor(Math.random() * 5);
        displayQuote(myQuotes[random]);

    }

    function tweetQuote() {
        var twitterURL = 'https://twitter.com/intent/tweet?hashtags=quotes,freeCodeCamp&related=freecodecamp&text="';
        var quote = $("#text").text();
        var author = $('#author').text();
        twitterURL += quote + '" - ' + author;


        $('#tweet-quote').attr('href', twitterURL);
    }
});