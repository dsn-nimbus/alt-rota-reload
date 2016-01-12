"use strict";

describe('alt.rota-reload', function() {
  var _scope, _compile, _element, _timeoutMock, _route;
  var TEMPO_ANIMACAO = 2000;
  var _icone;

  beforeEach(module('alt.rota-reload', function($provide) {
    $provide.constant('$route', {
      reload: jasmine.createSpy()
    })
  }));

  beforeEach(inject(function($injector) {
    _scope = $injector.get('$rootScope').$new();
    _compile = $injector.get('$compile');
    _timeoutMock = $injector.get('$timeout');
    _route = $injector.get('$route');

    var _html = '<alt-rota-reload></alt-rota-reload>';

    _element = angular.element(_html);

    _compile(_element)(_scope);
    _scope.$digest();

    _icone = _element.find('.fa-refresh').eq(0);
  }));

  describe('criação', function() {
    it('deve ter o elemento criado corretamente', function() {
      expect(_element).toBeDefined();
    });
  });

  describe('click', function() {
    it('deve adicionar a classe quando ocorreu o click', function() {
      _element.click();

      expect(_icone.hasClass('fa-spin')).toBe(true);
      expect(_route.reload).toHaveBeenCalled();
    });

    it('deve adicionar a classe e não remover, já que o tempo ainda não passou', function() {
      _element.click();

      expect(_icone.hasClass('fa-spin')).toBe(true);

      _timeoutMock.flush(TEMPO_ANIMACAO - 1);

      expect(_icone.hasClass('fa-spin')).toBe(true);

      expect(_route.reload).toHaveBeenCalled();
    });

    it('deve adicionar a classe e remover, já que o tempo ainda passou', function() {
      _element.click();

      expect(_icone.hasClass('fa-spin')).toBe(true);

      _timeoutMock.flush(TEMPO_ANIMACAO + 1);

      expect(_icone.hasClass('fa-spin')).toBe(false);

      expect(_route.reload).toHaveBeenCalled();
    });
  });
});
