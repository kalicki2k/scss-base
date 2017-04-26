'use strict';

var base = angular.module('base-dropdown-menu', []);

base.directive('dropdownMenu', function dropdownMenuDirective($window, $timeout) {

    function repositionDropdownMenu(menu) {
        var menuRect = menu.getBoundingClientRect(),
            menuLeft = menuRect.left + document.body.scrollLeft,
            menuTop = menuRect.top + document.body.scrollTop,
            menuHeight = menu.offsetHeight,
            menuWidth = menu.offsetWidth,
            windowHeight = $window.innerHeight,
            windowWidth = $window.innerWidth;

        var horizontalCheck = (menuLeft > 0 && menuLeft + menuWidth < windowWidth),
            verticalCheck = (menuTop > 0 && menuTop + menuHeight < windowHeight);

        if (!horizontalCheck) {
            angular.element(this).parent().toggleClass('js-reposition-right');
        }

        if (!verticalCheck) {
            angular.element(this).parent().toggleClass('js-reposition-up');
        }
    }

    function anchorAddClass() {
        angular.element(this).parent().addClass('is-active');
    }

    function anchorRemoveClass() {
        angular.element(this).parent().removeClass('is-active');
    }

    return {
        link: function postLink(scope, iElement) {
            var anchor, menu, promise,
                dropdownMenus = iElement[0].querySelectorAll('.menu');

            angular.forEach(dropdownMenus, function forEachDropdownMenu(dropdownMenu) {
                anchor = angular.element(dropdownMenu.parentElement.querySelector('a'));
                menu = angular.element(dropdownMenu);

                anchor.on('mouseenter', function anchorMouseEnter() {
                    anchorAddClass.apply(this);
                    repositionDropdownMenu.apply(this, [dropdownMenu]);
                }).on('mouseleave', function anchorMouseLeave() {
                    promise = $timeout(anchorRemoveClass.bind(this), 1);
                });

                menu.on('mouseenter', function menuMouseEnter() {
                    $timeout.cancel(promise);
                }).on('mouseleave', function menuMouseLeave() {
                    anchorRemoveClass.apply(this);
                });
            });


            /*
            unbindDestroyListener = scope.$on('$destroy', function $destroyListener() {
                angular.forEach(dropdownMenus, function forEachDropdownMenu(dropdownMenu) {
                    anchor = angular.element(dropdownMenu.parentElement.querySelector('a'));
                    menu = angular.element(dropdownMenu);

                    anchor.off('mouseenter', function anchorMouseEnter() {
                        anchorAddClass.apply(this);
                        repositionDropdownMenu.apply(this, [dropdownMenu]);
                    }).off('mouseleave', function anchorMouseLeave() {
                        promise = $timeout(anchorRemoveClass.bind(this), 1);
                    });

                    menu.off('mouseenter', function menuMouseEnter() {
                        $timeout.cancel(promise);
                    }).off('mouseleave', function menuMouseLeave() {
                        anchorRemoveClass.apply(this);
                    });
                });

                unbindDestroyListener();
            });
            */
        }
    }
});
