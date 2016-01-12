;(function(ng) {
  "use strict";

  ng.module('alt.rota-reload', ['ngRoute'])
    .directive('altRotaReload', ['$route', '$timeout', function($route, $timeout) {
        var _template = '<div class="alt-opcoes-usuario-container dropdown pull-right">\
                            <a class="alt-opcoes-usuario-cabecalho alt-hand alt-display-block text-muted" href>\
                              <span class="fa fa-fw fa-refresh alt-icone-opcoes-usuario-cabecalho"></span>\
                            </a>\
                         </div>';

        var _replace = true;
        var _scope = {};
        var _restrict = 'E';

        function _link(scope, element, attrs) {
          var TEMPO_ANIMACAO = 2000;
          var CLASSE_SPIN = 'fa-spin';
          var _icone = element.find('.fa-refresh').eq(0);

          element.on('click', function() {
              _icone.addClass(CLASSE_SPIN);

              $route.reload();

              $timeout(function() {
                _icone.removeClass(CLASSE_SPIN);
              }, TEMPO_ANIMACAO);
          });
        }

        return {
          template: _template,
          replace: _replace,
          link: _link,
          scope: _scope,
          restrict: _restrict
        }
    }]);
}(angular));
