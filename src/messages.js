/**
 *	@name
 *	@author Eduardo Ottaviani
 */
(function (root, factory) {

	if (typeof exports === 'object' && exports) {
		module.exports = factory(); // CommonJS
	}else{

		if (typeof define === "function" && define.amd) {
			define( ['messages'], factory() ); // AMD
		}else{
			root.Messages = factory(); // <script>
		}
	}

}(this, function(){

	var
		M, messages;
	
	messages = { default :'No message defined for: ' };

	M = {			
		
		add :function(name, message){
			messages[name] = message;	
		},

		add_all :function(o){
			messages = o;
		},

		write :function(name, el){
			
			if( !messages[name] ) return messages.default + name;
			return messages[name].call? messages[name].call(null, element) :messages[name];			
		},

		write_all :function(el, options){
			
			var _self = this;
			
			$.each( el.rules, function(name){
				
				var msg;

				if( options.messages && (msg = options.messages[name]) ){
					el.messages.map[name] = msg.call? msg.call(null, el) :msg;
				}else{
					el.messages.map[name] = _self.write( name, el );
				}
				
				el.messages.list.push( el.messages.map[name] );
			});
		}
	};
	
	function get( message ){
		return function(){ return message; };
	}

	return M;
}));
