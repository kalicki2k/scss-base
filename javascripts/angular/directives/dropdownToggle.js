'use strict';

var base = angular.module('base-dropdown', []);

base.directive('dropdownToggle', function dropdownToggleDirective($document) {

	var DROPDOWN_CLASS = 'dropdown',
		DROPDOWN_ACTIVE_CLASS = 'is-active';

	function open(container) {
		container.addClass(DROPDOWN_ACTIVE_CLASS);
		$document.off('click').one('click', close.bind(null, container));
	}

	function close(container) {
		container.removeClass(DROPDOWN_ACTIVE_CLASS);
		$document.off('click');
	}

	function closeOther(container) {
		$document[0].querySelectorAll('.' + DROPDOWN_CLASS + '.' + DROPDOWN_ACTIVE_CLASS + ':not(.menu)')
			.forEach(function each(dropdownContainer) {
				if (dropdownContainer !== container[0]) {
					close(angular.element(dropdownContainer));
				}
			});
	}

	return {
		link: function postLink(scope, iElement) {
			var container = iElement.parent('.' + DROPDOWN_CLASS),
				unbindDestroyListener;

			iElement.on('click', function toggleDropdown(event) {
				event.stopPropagation();
				if (container.hasClass(DROPDOWN_ACTIVE_CLASS)) {
					close(container);
				} else {
					closeOther(container);
					open(container);
				}
			});

			unbindDestroyListener = scope.$on('$destroy', function $destroyListener() {
				iElement.off('click');
				$document.off('click');
				unbindDestroyListener();
			});
		}
	};
});
