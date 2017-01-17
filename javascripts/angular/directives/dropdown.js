'use strict';

var base = angular.module('base-dropdown', []);

base.directive('dropdown', function dropdownDirective($document) {

	return {
		link: function postLink(scope, iElement) {
			var button = iElement.find('button'),
				content = angular.element(iElement[0].querySelectorAll('.dropdown-content'));

            button.on('click', function (event) {
                content.addClass('is-active');
                event.stopPropagation();
			});

            $document.on('click', function () {
                content.removeClass('is-active');
			});
		}
	};
});
