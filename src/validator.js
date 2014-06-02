/**
 *	@name
 *	@author Eduardo Ottaviani
 */
(function (root, factory) {

	if(typeof exports === 'object' && exports) {
		// CommonJS
		module.exports = factory( require('rules'), require('messages'), require('plugins') );
	}else{

		if(typeof define === 'function' && define.amd) {
			define('validator', ['rules', 'messages', 'plugins'], factory); // AMD
		}else{

			root.Validator = factory(root.Rules, root.Messages, root.Plugins); // <script>

			delete root.Rules;
			delete root.Messages;
			delete root.Plugins;
		}
	}

}(this, function( Rules, Messages, Plugins ){

	var V = {

		_class :function(o){

			var
				holder = o.holder,
				hash = {}, _self = this;

			o.holder.bind('get-validator', get);

			this.add = function( query, rules ){

				hash[ query ] = rules;
				Plugins.initialize( holder, rules, query );

				holder.trigger('validation.add', holder, rules, query);
				return this;
			};

			this.rules = function(rules){

				hash = rules;
				Plugins.initialize( holder, rules );

				holder.trigger('validation.add', holder, rules);
				return this;
			};

			this.remove = function( name ){
				delete hash[ name ];
				holder.trigger('validation.remove', name);
			};

			this.bind = function(name, method){
				holder.bind('validation.'+name, bind( method ));
			};

			this.validate = function(){

				var errors = check( hash, holder );

				if( errors.list.length ){
					holder.trigger('validation.error', errors);	
				}else{
					holder.trigger('validation.success');
				}

				return !(!!errors.list.length);
			};

			function get(e, callback){
				callback? callback( _self ) :null;
			}
		},

		internal :function(o){
			return({ Rule :Rules, Message :Messages, Plugin :Plugins })[o];
		},

		create :function(o){ return new this._class(o); }
	};

	function create(el, options){
		return{
			element	:el,
			rules	:$.extend({}, options.rules),
			messages:$.extend({ map:{}, list :[] }, { map: options.messages }) 
		};
	}

	function validate( element, options, errors, scope ){

		var el = create( element, options );

		Rules.validate( el, options, add_error( errors ) );

		if( errors.list.length ){
			Messages.write_all( el, options );
		}

		Plugins.each_elements( el, options );
		scope.trigger('each.validation', el);
	}
	
	function check( hash, scope ){

		var errors = { list: [], map :{} };

		$.each( hash, each_hash(scope, errors) );
		return errors;
	}

	function bind(method){
		return function(e, error){
			method( error );
		};
	}

	function each_hash(scope, errors){
		return function(selector, options){
			$(selector, scope).each( each_elements(options, errors, scope) );	
		};
	}

	function each_elements(options, errors, scope){
		return function(i, element){
			validate( element, options, errors, scope );
		};
	}

	function add_error(errors){
		return function(el, name){
			errors.list.push(el);
			errors.map[name] = errors.map[name] || [];
			errors.map[name].push(el);
		};
	}

	return V;
}));