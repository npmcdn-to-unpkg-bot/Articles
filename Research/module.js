( function( window, undefined ) {
  
  function MyModule() {
    
    // `this` refers to the instance of `MyModule` when created
    this.myMethod = function myMethod() {
      console.log( 'my method' );
    };
    
    // note that we still use a function declaration even when using a function expression.
    // for more information on why, check out: http://kangax.github.io/nfe/
    this.myOtherMethod = function myOtherMethod() {
      console.log( 'my other method' );
    };
    
  }
  
  // expose access to the constructor
  window.MyModule = MyModule;
  
} )( window );

// example usage
var myModule = new MyModule();
myModule.myMethod(); // alerts "my method"
myModule.myOtherMethod(); // alerts "my other method"