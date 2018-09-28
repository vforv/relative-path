const proxyquire = require( 'proxyquire' );
const path       = require( 'path' );

describe( 'The ./lib/expandNamespaces function', ()=>{

  it( 'should keep paths without namespaces unchanged', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub()
    } );

    const expected = './somePath';
    const actual   = expandNamespaces( expected );

    expect( actual ).to.equal( expected );

  } );

  it( 'Should return relative path', ()=>{

    const stub = sinon.stub( require( '../lib/loadNamespaces' ), 'default' ).callsFake( ()=>{

      const namespaces = {
        test: '/test/path/here'
      };

      return { namespaces };

    } );

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': stub
    } );

    const namespacePath = './<test>';
    const actual        = expandNamespaces( namespacePath, path.join( __dirname, '/test/path/here' ) );

    expect( actual ).to.have.string( actual );

  } );

} );
