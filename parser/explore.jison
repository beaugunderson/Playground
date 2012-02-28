%lex

%%

\s+                        /* skip */
"//".*                     /* ignore comment */
"/*"[\w\W]*?"*/"           /* ignore comment */
"*"                        return '*';
"/"                        return '/';
"-"                        return '-';
"+"                        return '+';
"^"                        return '^';
"("                        return '(';
")"                        return ')';
"["                        return '[';
"]"                        return ']';
","                        return ',';
[a-zA-Z_]+[a-zA-Z0-9_]*    return 'STRING';
[0-9]+("."[0-9]*)?         return 'NUMBER';
"."[0-9]+                  return 'NUMBER';
<<EOF>>                    return 'EOF';

/lex

%left '+' '-'
%left '*' '/'
%left '^'
%left NEG POS

%%

expressions
    : e EOF
        { return $1; }
    ;

num
    : n
    | '+' n
        { $$ = $2; }
    | '-' n
        { $$ = -$2; }
    | '(' e ')'
        { $$ = $2; }
    | function
    ;

e
    : n
    | e '+' e
        { $$ = $1 + $3; }
    | e '-' e
        { $$ = $1 - $3; }
    | e '*' e
        { $$ = $1 * $3; }
    | e '/' e
        { $$ = $1 / $3; }
    | e '^' e
        { $$ = Math.pow($1, $3); }
    | '+' e %prec POS
        { $$ = $2; }
    | '-' e %prec NEG
        { $$ = -$2; }
    | '(' e ')'
        { $$ = $2; }
    | variable
    | function
    ;

function
    : id '(' e ')'
        {{
            switch ($1) {
                case 'cos':
                case 'sin':
                case 'tan':
                    $$ = yy.apply($3, function(a) { return Math[$1](a * Math.PI / 180); });
                    break;
                case 'acos':
                case 'asin':
                case 'atan':
                    $$ = yy.apply($3, function(a) { return Math[$1](a) / Math.PI * 180; });
                    break;
                case 'log':
                case 'exp':
                case 'sqrt':
                case 'abs':
                    $$ = yy.apply($3, function(a) { return Math[$1](a); });
                    break;
                case 'log10':
                    $$ = yy.apply($3, function(a) { return Math.log(a) * Math.LOG10E; });
                    break;
                case 'parseFloat':
                    $$ = yy.apply($3, function(a) { return parseFloat(a, 10); });
                    break;
                case 'parseInt':
                    $$ = yy.apply($3, function(a) { return parseInt(a, 10); });
                    break;
                case 'length':
                    $$ = yy.apply($3, function(a) { return a.length; });
                    break;
                case 'uniqueCharacters':
                    $$ = yy.apply($3, function(a) { return yy._(a.split('')).uniq().length; });
                    break;
                default:
                    throw new Error('function \'' + $1 + '\' is not defined');
            }
        }}
    | id '(' e ',' e ')'
        {{
            switch ($1) {
                case 'add':
                    $$ = yy.apply($3, function(a) { return a + $5; });
                    break;
                case 'subtract':
                    $$ = yy.apply($3, function(a) { return a - $5; });
                    break;
                case 'atan2':
                    $$ = Math.atan2($3, $5) / Math.PI * 180;
                    break;
                case 'mod':
                    $$ = $3 % $5;
                    break;
                default:
                    throw new Error('function \'' + $1 + '\' is not defined');
            }
        }}
    ;

n
    : NUMBER
        { $$ = parseFloat(yytext, 10); }
    ;

variable
    : id
        { $$ = yy.data[$1]; }
    ;

id
    : STRING
        { $$ = yytext; }
    ;
