'use strict';

var base = angular.module('base-dropdown', []);

base.directive('dropdownToggle', function dropdownToggleDirective($document) {

    var DROPDOWN_CLASS = 'dropdown',
        DROPDOWN_ACTIVE_CLASS = 'is-active';

    function open(container) {
        container.addClass(DROPDOWN_ACTIVE_CLASS);
        $document.on('click', close.bind(null, container));
    }

    function close(container) {
        container.removeClass(DROPDOWN_ACTIVE_CLASS);
        $document.off('click', close.bind(null, container));
    }

    function closeOthers() {
        var dropdowns = $document[0].querySelectorAll('.' + DROPDOWN_CLASS + '.' + DROPDOWN_ACTIVE_CLASS);

        Array.prototype.slice.call(dropdowns).forEach(function closeAll(dropdownContainer) {
            close(angular.element(dropdownContainer));
        });
    }

    return {
        link: function postLink(scope, iElement) {
            var container = iElement.parent(),
                unbindDestroyListener;

            iElement.on('click', function toggleDropdown(event) {
                event.stopPropagation();
                if (container.hasClass(DROPDOWN_ACTIVE_CLASS)) {
                    close(container);
                } else {
                    closeOthers();
                    open(container);
                }
            });

            unbindDestroyListener = scope.$on('$destroy', function $destroyListener() {
                iElement.off('click');
                $document.off('click', close.bind(null, container));
                unbindDestroyListener();
            });
        }
    };
});
