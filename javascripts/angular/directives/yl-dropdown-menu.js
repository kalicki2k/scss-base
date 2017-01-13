'use strict';

function ylDropdownMenuDirective($timeout) {

	function anchorAddClass() {
		angular.element(this).parent().addClass('is-active');
	}

	function anchorRemoveClass() {
		angular.element(this).parent().removeClass('is-active');
	}

	return {
		restrict: 'A',
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
}

module.exports = {
	name: 'ylDropdownMenu',
	fn: ylDropdownMenuDirective
};
