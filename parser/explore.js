/* Jison generated parser */
var explore = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"num":6,"n":7,"+":8,"-":9,"(":10,")":11,"function":12,"*":13,"/":14,"^":15,"variable":16,"id":17,",":18,"NUMBER":19,"STRING":20,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"+",9:"-",10:"(",11:")",13:"*",14:"/",15:"^",18:",",19:"NUMBER",20:"STRING"},
productions_: [0,[3,2],[6,1],[6,2],[6,2],[6,3],[6,1],[4,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,2],[4,3],[4,1],[4,1],[12,4],[12,6],[7,1],[16,1],[17,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 3: this.$ = $$[$0]; 
break;
case 4: this.$ = -$$[$0]; 
break;
case 5: this.$ = $$[$0-1]; 
break;
case 8: this.$ = $$[$0-2] + $$[$0]; 
break;
case 9: this.$ = $$[$0-2] - $$[$0]; 
break;
case 10: this.$ = $$[$0-2] * $$[$0]; 
break;
case 11: this.$ = $$[$0-2] / $$[$0]; 
break;
case 12: this.$ = Math.pow($$[$0-2], $$[$0]); 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = -$$[$0]; 
break;
case 15: this.$ = $$[$0-1]; 
break;
case 18:
            switch ($$[$0-3]) {
                case 'cos':
                case 'sin':
                case 'tan':
                    this.$ = yy.apply($$[$0-1], function(a) { return Math[$$[$0-3]](a * Math.PI / 180); });
                    break;
                case 'acos':
                case 'asin':
                case 'atan':
                    this.$ = yy.apply($$[$0-1], function(a) { return Math[$$[$0-3]](a) / Math.PI * 180; });
                    break;
                case 'log':
                case 'exp':
                case 'sqrt':
                case 'abs':
                    this.$ = yy.apply($$[$0-1], function(a) { return Math[$$[$0-3]](a); });
                    break;
                case 'log10':
                    this.$ = yy.apply($$[$0-1], function(a) { return Math.log(a) * Math.LOG10E; });
                    break;
                case 'length':
                    this.$ = yy.apply($$[$0-1], function(a) { return a.length; });
                    break;
                case 'uniqueCharacters':
                    this.$ = yy.apply($$[$0-1], function(a) { return yy._(a.split('')).uniq().length; });
                    break;
                default:
                    throw new Error('function \'' + $$[$0-3] + '\' is not defined');
            }
        
break;
case 19:
            switch ($$[$0-5]) {
                case 'add':
                    this.$ = yy.apply($$[$0-3], function(a) {
                        return a + $$[$0-1];
                    });
                    break;
                case 'subtract':
                    this.$ = yy.apply($$[$0-3], function(a) { return a - $$[$0-1]; });
                    break;
                case 'atan2':
                    this.$ = Math.atan2($$[$0-3], $$[$0-1]) / Math.PI * 180;
                    break;
                case 'mod':
                    this.$ = $$[$0-3] % $$[$0-1];
                    break;
                default:
                    throw new Error('function \'' + $$[$0-5] + '\' is not defined');
            }
        
break;
case 20: this.$ = parseFloat(yytext, 10); 
break;
case 21: this.$ = yy.data[$$[$0]]; 
break;
case 22: this.$ = yytext; 
break;
}
},
table: [{3:1,4:2,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{1:[3]},{5:[1,12],8:[1,13],9:[1,14],13:[1,15],14:[1,16],15:[1,17]},{5:[2,7],8:[2,7],9:[2,7],11:[2,7],13:[2,7],14:[2,7],15:[2,7],18:[2,7]},{4:18,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{4:19,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{4:20,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{5:[2,16],8:[2,16],9:[2,16],11:[2,16],13:[2,16],14:[2,16],15:[2,16],18:[2,16]},{5:[2,17],8:[2,17],9:[2,17],11:[2,17],13:[2,17],14:[2,17],15:[2,17],18:[2,17]},{5:[2,20],8:[2,20],9:[2,20],11:[2,20],13:[2,20],14:[2,20],15:[2,20],18:[2,20]},{5:[2,21],8:[2,21],9:[2,21],10:[1,21],11:[2,21],13:[2,21],14:[2,21],15:[2,21],18:[2,21]},{5:[2,22],8:[2,22],9:[2,22],10:[2,22],11:[2,22],13:[2,22],14:[2,22],15:[2,22],18:[2,22]},{1:[2,1]},{4:22,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{4:23,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{4:24,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{4:25,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{4:26,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{5:[2,13],8:[2,13],9:[2,13],11:[2,13],13:[2,13],14:[2,13],15:[2,13],18:[2,13]},{5:[2,14],8:[2,14],9:[2,14],11:[2,14],13:[2,14],14:[2,14],15:[2,14],18:[2,14]},{8:[1,13],9:[1,14],11:[1,27],13:[1,15],14:[1,16],15:[1,17]},{4:28,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{5:[2,8],8:[2,8],9:[2,8],11:[2,8],13:[1,15],14:[1,16],15:[1,17],18:[2,8]},{5:[2,9],8:[2,9],9:[2,9],11:[2,9],13:[1,15],14:[1,16],15:[1,17],18:[2,9]},{5:[2,10],8:[2,10],9:[2,10],11:[2,10],13:[2,10],14:[2,10],15:[1,17],18:[2,10]},{5:[2,11],8:[2,11],9:[2,11],11:[2,11],13:[2,11],14:[2,11],15:[1,17],18:[2,11]},{5:[2,12],8:[2,12],9:[2,12],11:[2,12],13:[2,12],14:[2,12],15:[2,12],18:[2,12]},{5:[2,15],8:[2,15],9:[2,15],11:[2,15],13:[2,15],14:[2,15],15:[2,15],18:[2,15]},{8:[1,13],9:[1,14],11:[1,29],13:[1,15],14:[1,16],15:[1,17],18:[1,30]},{5:[2,18],8:[2,18],9:[2,18],11:[2,18],13:[2,18],14:[2,18],15:[2,18],18:[2,18]},{4:31,7:3,8:[1,4],9:[1,5],10:[1,6],12:8,16:7,17:10,19:[1,9],20:[1,11]},{8:[1,13],9:[1,14],11:[1,32],13:[1,15],14:[1,16],15:[1,17]},{5:[2,19],8:[2,19],9:[2,19],11:[2,19],13:[2,19],14:[2,19],15:[2,19],18:[2,19]}],
defaultActions: {12:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/\n.*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
            this.yytext += match[0];
            this.match += match[0];
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip */
break;
case 1:/* ignore comment */
break;
case 2:/* ignore comment */
break;
case 3:return 13;
break;
case 4:return 14;
break;
case 5:return 9;
break;
case 6:return 8;
break;
case 7:return 15;
break;
case 8:return 10;
break;
case 9:return 11;
break;
case 10:return '[';
break;
case 11:return ']';
break;
case 12:return 18;
break;
case 13:return 20;
break;
case 14:return 19;
break;
case 15:return 19;
break;
case 16:return 5;
break;
}
};
lexer.rules = [/^\s+/,/^\/\/.*/,/^\/\*[\w\W]*?\*\//,/^\*/,/^\//,/^-/,/^\+/,/^\^/,/^\(/,/^\)/,/^\[/,/^\]/,/^,/,/^[a-zA-Z_]+[a-zA-Z0-9_]*/,/^[0-9]+(\.[0-9]*)?/,/^\.[0-9]+/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = explore;
exports.parse = function () { return explore.parse.apply(explore, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}