
module.exports = {
    
    create: function (context) {
        console.log("HERE");
        
        return {
            CallExpression: function (node) {
                
                if (node.callee.type == 'Identifier' && node.callee.name == 'require') {
                    if (node.arguments.length == 1) {
                        if (node.arguments[0].type == 'Literal' && (node.arguments[0].value[0] != '.' && node.arguments[0].value[0] != '/')) {
                            
                            return context.report({node, message: node.arguments[0].value})
                            
                        }
                    }
                }
            },
            ImportDeclaration: function (node) {
                if (node.source.type == 'Literal' && node.specifiers.length != 0) {

                    return context.report({node, message: node.source.value})
                    
                }
            }
        }
    }
}