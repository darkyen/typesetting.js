/*
 * @filename    typesetting.js
 * @author      Robert Lemon
 * @version     1.0
 * @modified    2012/03/05
 * @url         http://rlemon.github.com/typesetting.js/
 * @email       rob.lemon@gmail.com
 * 
 * */
var typesetting = (function() {

    function injector(t, splitter, klass, after) {
        var a = (t.innerText || t.textContent),
            inject = '';
        a = a.split(splitter);
        if (a.length) {
            a.forEach(function(item, i) {
                inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after;
            });
            t.innerHTML = inject; 
        }
    }

    function replaceNodeWith(element, search, replace) {
        var elements = element.childNodes;
        for (var i = 0, l = elements.length; i < l; i++) {
            if (elements[i].tagName === search) {
                element.replaceChild(document.createTextNode(replace), elements[i]);
            }
        }
    }

    var typesetting = {
        letters: function(queryString, context) {
            context = context || document;
            var elements = Sizzle(queryString, context);
            elements.forEach(function(item) {
                injector(item, '', 'char', '');
            });
            return elements;
        },
        lines: function(queryString, context) {
            context = context || document;
            var elements = Sizzle(queryString, context);
            elements.forEach(function(item) {
                var r = "eefec303079ad17405c889e092e105b0";
                replaceNodeWith(item, 'BR', r);
                injector(item, r, 'line', '');
            });
            return elements;
        },
        words: function(queryString, context) {
            context = context || document;
            var elements = Sizzle(queryString, context);
            elements.forEach(function(item) {
                injector(item, ' ', 'word', '');
            });
            return elements;
        }
    };
    
    return typesetting;
    
})();

typesetting.lines('.para', {
	baseClass: 'n-lines',
	runner: 2
});
typesetting.words('.n-lines2', { reset: 3 });
typesetting.letters('.word1, .word3', { after: ' ' });

