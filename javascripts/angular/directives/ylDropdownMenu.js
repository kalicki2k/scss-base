'use strict';

var yl = angular.module('yl-dropdown-menu', []);

yl.directive('ylDropdownMenu', function ylDropdownMenuDirective($timeout) {

	function anchorAddClass() {
		angular.element(this).parent().addClass('is-active');
	}

	function anchorRemoveClass() {
		angular.element(this).parent().removeClass('is-active');
	}

	return {
		link: function postLink(scope, iElement) {
			var anchor, submenu, promise,
				dropdownMenus = iElement[0].querySelectorAll('.menu');

			angular.forEach(dropdownMenus, function (dropdownMenu) {
				anchor = angular.element(dropdownMenu).parent().find('a');
				submenu = angular.element(dropdownMenu);

				anchor.on('mouseenter', function () {
					anchorAddClass.apply(this);
				}).on('mouseleave', function () {
					promise = $timeout(anchorRemoveClass.bind(this), 500);
				});

				submenu.on('mouseenter', function () {
					$timeout.cancel(promise);
				}).on('mouseleave', function () {
					anchorRemoveClass.apply(this);
				});

			});
		}
	};
});

