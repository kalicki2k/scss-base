'use strict';

var base = angular.module('base-button-group', []);

base.directive('buttonGroupToggle', function dropdownToggleDirective() {

    return {
        link: function postLink(scope, iElement) {
            var $buttons = angular.element(iElement[0].querySelectorAll('.button, button'));

            Array.prototype.slice.call($buttons).forEach(function (button) {
                var $button = angular.element(button);
                $button.on('click', function (){
                    $buttons.removeClass('active');
                    $button.addClass('active');
                });
            });
        }
    };
});
